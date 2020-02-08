import React, { Component } from 'react'
import {Row, Col, Card, CardImg, CardBody, Button} from 'reactstrap'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Home from './Home'
import ipfs from '../ipfs'

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 400,
    },
    button: {
      marginTop: theme.spacing.unit,
      marginBottom: 5*theme.spacing.unit,
      height: "50px",
    },
    resize: {
      fontSize:20,
    
    },
    formBorder: {
      border: "2px groove red",
      backgroundColor: "#e6eeff",
      borderRadius: "10px",    
      marginLeft:200,
      marginRight:200,
    },
    header: {
      fontSize:25,
      margin:25,
      color: "blue"
    },
    selectHelp: {
      fontSize:15,
      width:400,
      marginLeft: '30%',
      color: 'red',
    },
  });
  

class CustomerDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             addCustomer: false,
             BuyerName: '',
             BuyerContact: '',
             BuyerEmail: '',
             BuyerAddress: ''
        }
    }

    toggle () {
        this.setState({
            addCustomer: !this.state.addCustomer,
        })
    }

    initIPFS() {
        const { BuyerAddress, BuyerContact, BuyerEmail, BuyerName } = this.state;
        const values = { BuyerAddress, BuyerContact, BuyerEmail, BuyerName };
        var promise = new Promise((resolve,reject)=>{
          ipfs.add([Buffer.from(JSON.stringify(values))], (error,result)=>{
            if(error){
              console.log("Error in adding")
            }
            const ipfsHash=result[0].hash;
            console.log("IPfs Hash",ipfsHash);
            resolve(ipfsHash)
          })
    
        })
        return promise;
      }

    handleClick = async () => {
        const { contract, web3, accounts, productData, productId  } = this.props;
        

        //do Payment of 2*price for Buyer
        var price = 2*productData.ProductPrice;
        const BN = web3.utils.BN; //BN BigNumber
        const val = new BN(price).toString();
        await contract.methods.buyerPayment(productId).send({from :accounts[0], value: web3.utils.toWei(val, 'ether'), gas: 1500000}, (error, result) =>{
            if(error)
              alert("Transaction Failed");
            else
               alert(`Transaction successfull of ${price} Ether.`);

          });

          //add details to IPFS and store the hash into blockchain.
          const promise = this.initIPFS()
          promise.then((hash) =>{
            contract.methods.addBuyerHash(hash, productId).send({from: accounts[0]},(error, result) =>{
            if(error)
              alert("Transaction Failed");
            else
            {
                alert("Details has sent to Seller, wait untill product received.");
                this.toggle(); // to render market page afte confimation of transaction
            }
          });
          })
    }

    handleChange = input => e => {
        const value = e.target.value;
        this.setState({ [input]: value });
      };
    
    render() {
        const { productData, classes } = this.props
        const { BuyerName, BuyerContact, BuyerEmail, BuyerAddress } = this.state;
        return (
            <div>
                {this.state.addCustomer? <Home />: ( <div>
                <h1 className="shadow">{productData.ProductName}</h1>
                <Row className="row1" >
                    <Col className="imageAnimation">
                        
                        <Card outline color="warning" className="card1">
                            <CardImg top width="200" height="350" src={productData.ProductImage} alt={productData.ProductName} />
                            <CardBody>          
                              
                            </CardBody>
                        </Card>
                    </Col>
                    <Col >
                        <form  autoComplete="on">   
                        <h1 className={classes.header}> Buyer Details</h1>        
                        <TextField 
                            required          
                            label="Name"
                            className={classes.textField}
                            InputProps={{
                            classes: {
                                root: classes.resize,
                            },
                            }}
                            InputLabelProps={{
                            FormLabelClasses: {
                                root: classes.resize,
                            }
                            }}
                            onChange={this.handleChange('BuyerName')}
                            margin="normal"
                            placeholder="Enter Name"
                            variant="outlined"
                            defaultValue={BuyerName}
                        />
                        <FormHelperText className={classes.selectHelp}> </FormHelperText>
                        <br />

                        <TextField 
                        required          
                        label="Mobile Number"
                        className={classes.textField}
                        InputProps={{
                            classes: {
                            root: classes.resize,
                            },
                        }}
                        InputLabelProps={{
                            FormLabelClasses: {
                            root: classes.resize,
                            }
                        }}
                        onChange={this.handleChange('BuyerContact')}
                        margin="normal"
                        placeholder="Enter Mobile Number"
                        variant="outlined"
                        type="number"
                        defaultValue={BuyerContact}
                        />
                        <FormHelperText className={classes.selectHelp}></FormHelperText>
                        <br />

                        <TextField  
                        required                              
                        label="Email"
                        className={classes.textField}
                        InputProps={{
                            classes: {
                            root: classes.resize,
                            },
                        }}
                        InputLabelProps={{
                            FormLabelClasses: {
                            root: classes.resize,
                            }
                        }}
                        onChange={this.handleChange('BuyerEmail')}
                        margin="normal"
                        placeholder="Enter Email"
                        variant="outlined"
                        type="email"   
                        defaultValue={BuyerEmail}         
                        />
                        <FormHelperText className={classes.selectHelp}></FormHelperText>
                        <br />

                        <TextField
                        required
                        label="Delivery address"
                        className={classes.textField}
                        InputProps={{
                            classes: {
                            root: classes.resize,
                            },
                        }}
                        InputLabelProps={{
                            FormLabelClasses: {
                            root: classes.resize,
                            }
                        }}
                        onChange={this.handleChange('BuyerAddress')}
                        multiline
                        rows="4"
                        margin="normal"
                        placeholder="Enter delivery Address"
                        variant="outlined"
                        defaultValue={BuyerAddress}
                        />
                        <br /><br />
                        <Button  color="success"
                                 size="large" 
                                 className={classes.button}
                                 onClick = {() => {if(window.confirm(`are you sure you want to buy ${productData.ProductCategory} ?`)) this.handleClick()} } ><h3>Confirm Details and Do Payment</h3></Button>
                        
                        </form>
                    
                    </Col>
                </Row>
                </div> )}
            </div>
        )
    }
}

export default withStyles(styles)(CustomerDetails)