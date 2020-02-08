
import React, { Component } from 'react';
import  getWeb3 from "../utils/getWeb3";
import '../App.css';
import '../CSS/Customer.css'
import {Card,CardBody,Button,CardImg,
        ListGroup, ListGroupItem,ListGroupItemHeading, ListGroupItemText,
        Popover, PopoverHeader, PopoverBody,
        Row, Col } from 'reactstrap';
import SafeRemotePurchase from '../contracts/SafeRemotePurchase.json'
import CustomerDetails from './CustomerDetails'

class  TitlebarGridList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        blockchainRecordedItemIds: [],
        popoverOpen: [],
        sellerData: [],
        web3: null,
        contract: null,
        accounts: null,
        addCustomer: false,
        productData: null,  
        productId: null, 
        buyButton: [],   
        confirmButton: [], 
      }
      this.convertHashToData = this.convertHashToData.bind(this);
      this.getItemId = this.getItemId.bind(this);
      this.handleConfirm = this.handleConfirm.bind(this);
      this.toggle = this.toggle.bind(this);
      
    }
    
   componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
          console.log(web3);
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts()

          console.log("Account",accounts[0]);
          // Get the contract instance.
         const networkId = await web3.eth.net.getId();
         const deployedNetwork = SafeRemotePurchase.networks[networkId];
         const instance = new web3.eth.Contract(
            SafeRemotePurchase.abi ,
            deployedNetwork && deployedNetwork.address);
    
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, accounts, contract: instance },this.getItemId);
         
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
    };

      getItemId = async() =>{
        const {contract} = this.state;
        let records = [];
        this.confirmOrderEvent();
        await contract.getPastEvents("SellerAdded", {fromBlock: 0}, (error,result)=>{
          if(error)
               console.log("[Event Customer Error] "+error);
          else
          {
            result.map((res)=>{
              const id = parseInt(res.returnValues.idItem);
              records.push(id);
              
            })
            console.log(records);
            this.setState({
              blockchainRecordedItemIds: records
            },this.convertHashToData);
          }
        } )
        
      }
      convertHashToData = async() =>{
        const { web3 } = this.state;
        let sellerData = [];
        let buyButton = [];
        
        // it will return all promises from blockchain.
        const promises1 = await this.state.blockchainRecordedItemIds.map((id) =>{
             return this.state.contract.methods.getSellerHash(id).call();
        });
        const result = await Promise.all(promises1);  //it gives array of hash values and wait till all promises resolved
      
         // it will return all promises from blockchain.
         const promises2 = await this.state.blockchainRecordedItemIds.map((id) =>{
          return this.state.contract.methods.getTotal(id).call();
          });
          const total = await Promise.all(promises2);

          for(let i=0;i<result.length;i++)
        {
          
          const Hash = result[i];
          console.log("IPfs Returned",Hash)
          var url="https://ipfs.infura.io/ipfs/"+Hash;
          console.log("Gettting User info",url);

          //get the object from hash and store in sellerData
          await fetch(url)
          .then(response => response.json())
          .then( data =>{
            sellerData.push(data);
            console.log(data);
            // check weather buyer have done payment.
            var price = data.ProductPrice;
            const BN = web3.utils.BN; //BN BigNumber
            const val = new BN(price).toString();
            const value = web3.utils.toWei(val, 'ether');
            const flag = total[i] == 4*value;
            buyButton.push(flag);                       
          })
          .catch( err => console.log("Error",err))

          this.setState({
            sellerData: sellerData,
            buyButton: buyButton, 
          })
        }
      }; 

      handleConfirm = async (itemId) => {
        const { contract, accounts } = this.state;
        
        //Confirm the Order by Buyer
        await contract.methods.confirmOrder(itemId).send({from: accounts[0]}, (error, result) =>{
          if(error)
            alert("You are not authorised to click here");
          else
          this.toggleConfirm(itemId);
        });
       
        //get total and price details
        const values = await contract.methods.getTotal(itemId).call();
        console.log(values);
        
      }

      confirmOrderEvent = async () => {
        const { confirmButton, contract } = this.state;
        const tempConfirm = [...confirmButton];
        await contract.getPastEvents("OrderReceived", {fromBlock: 0}, (error,result)=>{
          if(error)
               console.log("[Event Customer Error] "+error);
          else
          {
            result.map((res)=>{
              const id = parseInt(res.returnValues.idItem);
              tempConfirm[id] = true;
              
            })
            this.setState({
              confirmButton: tempConfirm,
            });
          }
        } )
      }

      toggleConfirm (itemId) {
        let newArray = [...this.state.confirmButton];
        newArray[itemId] = !newArray[itemId];
        this.setState({
          confirmButton: newArray
        });
      }

      toggle(index) {
        let newArray = [...this.state.popoverOpen];
        newArray[index] = !newArray[index];
        this.setState({
          popoverOpen: newArray
        });
      }

      handleCustomer(data,index) {  // it is for sending data to CustomerDetails component.
        this.setState({
          addCustomer: !this.state.addCustomer,
          productData: data,
          productId: index
        });
      }
    render(){
            const { addCustomer, sellerData, buyButton, confirmButton } = this.state;
            return (
              <div className="root1">
                  {addCustomer? <CustomerDetails web3={this.state.web3}
                                            accounts={this.state.accounts}
                                            contract={this.state.contract}
                                            productData={this.state.productData}
                                            productId={this.state.productId}  />: ( <div>
                   <h1 className="shadow">Available Products which you might like</h1>          
                    <br />
                    <div>
                      {sellerData.map((tile,index) =>(
                        <Row className="row1" key={index}>
                          <Col sm="4">
                            <Card outline color="warning" className="card1">
                              <CardImg top width="400" height="400" src={tile.ProductImage} alt={tile.ProductName} />
                              <CardBody>
                                <Button id={`popover${ index }`} 
                                        color="danger"  
                                        className="button1" 
                                        type="button"><h3>Seller Info</h3></Button>                        
                                <Popover placement="top"
                                         isOpen={this.state.popoverOpen[index]}
                                         target={`popover${ index }`} 
                                         toggle={()=> this.toggle(index)}
                                         className="popover1">
                                  <PopoverHeader className="popoverHead1" ><h2>Seller Information </h2></PopoverHeader>
                                  <PopoverBody>
                                    <ListGroup>
                                      <ListGroupItem color="success" className="listText1"><strong>Name: </strong>{tile.UserName}</ListGroupItem>
                                      <ListGroupItem color="info" className="listText1"><strong>Contact: </strong>{tile.Contact}</ListGroupItem>
                                      <ListGroupItem color="warning" className="listText1"><strong>Email: </strong>{tile.Email}</ListGroupItem>
                                    </ListGroup>
                                  </PopoverBody>
                                </Popover>

                                  <Button  color="success"
                                          className="button1" 
                                          disabled={buyButton[index]}
                                          onClick={()=> this.handleCustomer(tile,index)}>
                                    <h3>Buy Now</h3>
                                  </Button>
                                  <Button  color="info"
                                          className="button3" 
                                          disabled={confirmButton[index]}
                                          onClick={()=> this.handleConfirm(index)}>
                                    <h3>Confirm Delivery</h3>
                                  </Button>
                                  
                                
                              </CardBody>
                            </Card>
                          </Col>
                          <Col>
                            <ListGroup>
                                <ListGroupItem active>
                                  <ListGroupItemHeading className="listHeader1">Product Details</ListGroupItemHeading>
                                </ListGroupItem>
                                <ListGroupItem >
                                  <ListGroupItemHeading className="listHeader1">Product Category</ListGroupItemHeading>
                                  <ListGroupItemText className="listText1">
                                      {tile.ProductCategory}
                                  </ListGroupItemText>
                                </ListGroupItem>
                                <ListGroupItem>
                                  <ListGroupItemHeading className="listHeader1">Product Name</ListGroupItemHeading>
                                  <ListGroupItemText className="listText1">
                                      {tile.ProductName}
                                  </ListGroupItemText>
                                </ListGroupItem>
                                <ListGroupItem>
                                  <ListGroupItemHeading className="listHeader1">Product Price</ListGroupItemHeading>
                                  <ListGroupItemText className="listText1">
                                      {tile.ProductPrice}  Ether
                                  </ListGroupItemText>
                                </ListGroupItem>
                                <ListGroupItem>
                                  <ListGroupItemHeading className="listHeader1">Product Description</ListGroupItemHeading>
                                  <ListGroupItemText className="listText1">
                                      {tile.ProductDescription}
                                  </ListGroupItemText>
                                </ListGroupItem>
                            </ListGroup>
                          </Col>
                         </Row>
                      ))
                      }
                    </div>
                 </div> )}
                </div>
            );
            }
}

export default (TitlebarGridList);