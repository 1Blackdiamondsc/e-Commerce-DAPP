import React, { Component } from 'react'
import  getWeb3 from "../utils/getWeb3";
import SafeRemotePurchase from '../contracts/SafeRemotePurchase.json'
import '../CSS/OrderProcess.css'
import { Row, Col, ListGroup, ListGroupItem,ListGroupItemHeading, ListGroupItemText, } from 'reactstrap'

export class OredrProcess extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             web3: null,
             contract: null,
             accounts: null,
             blockchainConfirmedItemId: [],
             sellerData: [],
             buyerData: [],
        }
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
        await contract.getPastEvents("BuyerAdded", {fromBlock: 0}, (error,buyerResult)=>{
          if(error)
               console.log("[Event Customer Error] "+error);
          else
          {
            buyerResult.map((res)=>{
              const id = parseInt(res.returnValues.idItem);
              records.push(id);
              
            })
            console.log(records);
            this.setState({
              blockchainConfirmedItemId: records
            },this.convertHashToData);
          }
        } )
        
      }
      convertHashToData = async() =>{
        const { accounts } = this.state;
        let buyerData = [];
        let sellerData = [];
        // it will return all promises of buyer Hash from blockchain.
        const promises1 = await this.state.blockchainConfirmedItemId.map((id) =>{
             return this.state.contract.methods.getBuyerHash(id).call();
        });
        const buyerResult = await Promise.all(promises1);  //it gives array of hash values and wait till all promises resolved
        
        // it will return all promises of seller Hash from blockchain.
        const promises2 = await this.state.blockchainConfirmedItemId.map((id) =>{
            return this.state.contract.methods.getSellerHash(id).call(); 
        });
        const sellerResult = await Promise.all(promises2);

        // it will return seller address.
        const promises3 = await this.state.blockchainConfirmedItemId.map((id) =>{
            return this.state.contract.methods.getSellerAddress(id).call(); 
        });
        const sellerAddress = await Promise.all(promises3);
      
          for(let i=0;i<buyerResult.length;i++)
        {
            if( accounts[0] === sellerAddress[i] )
            {
          const buyerHash = buyerResult[i];
          var url1="https://ipfs.infura.io/ipfs/"+buyerHash;
          console.log("Gettting Buyer info",url1);

          //get the object from buyer hash and store in buyerData
          await fetch(url1)
          .then(response => response.json())
          .then( data =>{
            buyerData.push(data);
            console.log(data);
          })
          .catch( err => console.log("Error",err))

          const sellerHash = sellerResult[i];
          var url2 = "https://ipfs.infura.io/ipfs/"+sellerHash;
          console.log("Gettting Seller info",url2);

          //get the object from buyer hash and store in buyerData
          await fetch(url2)
          .then(response => response.json())
          .then( data =>{
            sellerData.push(data);
            console.log(data);
          })
          .catch( err => console.log("Error",err))

          this.setState({
            buyerData: buyerData,
            sellerData: sellerData,
          })
            }
        }
      }; 


    render() {
        const { buyerData, sellerData } = this.state;
        return (
            <div >
                <h1 className="shadow">Products ready for Delivery </h1>
                <div>
                    {
                        buyerData.map( (buyer, index) => (
                            <Row key={index}> 
                                <Col className="border">   
                                    <h1 className="productHead">{sellerData[index].ProductName}</h1>
                                    <img src={sellerData[index].ProductImage} height="300" width="400" alt={sellerData[index].ProductName} />
                                    <h1 className="productHead">Price: {sellerData[index].ProductPrice} Ether</h1>
                                </Col>
                                <Col>
                                    <ListGroup>
                                        <ListGroupItem active>
                                            <ListGroupItemHeading className="listHeader1">Buyer Details</ListGroupItemHeading>
                                        </ListGroupItem>
                                        <ListGroupItem >
                                            <ListGroupItemHeading className="listHeader1">Name</ListGroupItemHeading>
                                            <ListGroupItemText className="listText1">
                                                {buyer.BuyerName}
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <ListGroupItemHeading className="listHeader1">Contact</ListGroupItemHeading>
                                            <ListGroupItemText className="listText1">
                                                {buyer.BuyerContact}
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <ListGroupItemHeading className="listHeader1">Email</ListGroupItemHeading>
                                            <ListGroupItemText className="listText1">
                                                {buyer.BuyerEmail}
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                            <ListGroupItem>
                                            <ListGroupItemHeading className="listHeader1">Delivery Address</ListGroupItemHeading>
                                            <ListGroupItemText className="listText1">
                                                {buyer.BuyerAddress}
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                         ) )
                    }
                </div>
            </div>
        )
    }
}

export default OredrProcess
