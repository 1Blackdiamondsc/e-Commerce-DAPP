import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import ipfs from '../../ipfs'
import SafeRemotePurchase from '../../contracts/SafeRemotePurchase.json'
import Web3 from "web3"
import Suppliers from '../Suppliers'


const styles = theme => ({
  root: {
    width: '70%',
    backgroundColor: "#e6eeff",
    marginLeft:200,
    marginRight:200,
  },
  button: {
    margin: theme.spacing.unit*4,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  label: {
      fontSize: 20,
  }
});

function getSteps() {
  return ['Seller Details', 'Product Details', 'Confirm Details'];
}


class HorizontalLinearStepper extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       activeStep: 0,
       web3: null,
       accounts: null,
       contract: null,
       addMarket: false,
    }
   this.addToMarket=this.addToMarket.bind(this);
  }
  
  
  handleNext = () => {
    const { activeStep } = this.state;
    let newStep = activeStep +1;
    if (activeStep === getSteps().length-1)
       newStep = activeStep;

    this.setState({
      activeStep: newStep,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  componentDidMount = async () => {
    try {

       const web3 = new Web3(window.ethereum);
          // Request account access if needed
          await window.ethereum.enable();
      // Get network provider and web3 instance.
      //const web3 = getWeb3();
      console.log(web3);
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

     // console.log("Account",accounts[0]);
      // Get the contract instance.
     const networkId =  await web3.eth.net.getId();
     const deployedNetwork = SafeRemotePurchase.networks[networkId];
     const instance = new web3.eth.Contract(
        SafeRemotePurchase.abi ,
        deployedNetwork && deployedNetwork.address);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
         this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  initIPFS() {
    var promise = new Promise((resolve,reject)=>{
      ipfs.add([Buffer.from(JSON.stringify(this.props.values))], (error,result)=>{
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

  addToMarket=async()=>{
    const steps=getSteps();
    if(this.state.activeStep === steps.length-1 && window.confirm('Are you sure you wish to do Payment?'))  // when all steps finish then first do payment and send data to ipfs
    {
      const { contract, accounts, web3 } = this.state;

        console.log(accounts[0]);
      //   Backend Code 
          //do Payment of 2*price of product
          var value = this.props.values.ProductPrice;
          var price = 2*value;
          const BN = web3.utils.BN; //BN BigNumber
          const val = new BN(price).toString();
          await contract.methods.sellerPayment().send({from :accounts[0], value: web3.utils.toWei(val, 'ether'),gas:1500000},(error, result) =>{
            if(error)
              alert("Transaction Failed:",error);
            else
            {
               alert(`Transaction successfull of ${price} Ether.`);
               const promise = this.initIPFS()
               promise.then((hash) =>{
                contract.methods.addSellerHash(hash).send({from: accounts[0]},(error, result) =>{
                if(error)
                  alert("Transaction Failed:",error);
                else
                {
                    alert("Product successfull Added to Market");
                  this.setState({addMarket: !this.state.addMarket});
                }
              });
              })
            }
          });
        
              
    }
    else
    {
      this.handleNext();
    }
  }

  render() {
    const { classes, sellerFormValid, productFormValid } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
         {this.state.addMarket ? <Suppliers /> : (
       <div>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {}
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps} classes={{label: classes.label}}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          
            <div>
                {this.props.getStepContent(activeStep)}
          
            <div>
            
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                  size="large"
                  color="secondary"
                  variant="contained"
                >
                  Back
                </Button>
                
                <Button
                  disabled={activeStep === 0 ? !sellerFormValid : !productFormValid}
                  variant="contained"
                  color="primary"
                  onClick={this.addToMarket}
                  className={classes.button}
                  size="large"
                >
                  {activeStep === steps.length - 1 ? 'Add to Market' : 'Next'}
                </Button>
                
              </div>
              
            </div>
           
        </div>
        </div> 
        )}</div>
    );
  }
 
}


export default  withStyles(styles)(HorizontalLinearStepper);