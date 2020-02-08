import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom'
import CustomersClient from './components/Customers';
import SuppliersClient from './components/Suppliers';
import NavBar from './components/NavBar'
import Home from "./components/Home"
import OrderProcess from './components/OredrProcess'
import SellerForm from './components/FormComponents/SellerForm';
import Faq from './components/Faq';
import Works from './components/Works';
import StickyFooter from 'react-sticky-footer';



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      productDetails:null,
    }
  }

  handleProductDetails (productDetails) {
    console.log("product clicked");
    this.setState(
      {productDetails:productDetails}
    );
  }
  render() {
    return (
      <div className="App">
      <BrowserRouter>     
        <NavBar />
        
        <Route  path="/Home" component={Home} />
        <Route  path="/Market" component={CustomersClient} />
        <Route  path="/Seller" component={SuppliersClient} />
        <Route  path="/orderProcess" component={OrderProcess} />
        <Route  path="/sellProduct" component={SellerForm} />
        <Route  path="/Faq" component={Faq} />
        <Route  path="/Works" component={Works} />
         
        <StickyFooter
            bottomThreshold={100}
            normalStyles={{
            backgroundColor: "#232f3e",
            paddingBottom: "6rem",
            paddingTop: "4rem",
            color: "white",
            }}
            stickyStyles={{
            backgroundColor: "#232f3e",
            padding: "2rem",
            color: "white",
            width: "100%"
            }}>
                <p id="para">copyright &copy; 2019 EscroDA.com LTD. <br />All rights reserved</p>
                <div id="footerLink" >
                <a className="ancher" href="./Works"  style={{color:"white"}}>How it Works</a>
                <a className="ancher" href="./Market" style={{color:"white"}}>For Buyer</a>
                <a className="ancher" href="./Seller" style={{color:"white"}}>For Seller</a>
                <a className="ancher" href="./Faq"    style={{color:"white"}}>FAQ</a>
                </div>
          </StickyFooter>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
