import React, { Component,Fragment } from 'react'
import Slides from "./Slides"
import {Card,CardBody,CardTitle,CardText,Button,Row,Col,CardImg} from 'reactstrap'
import '../CSS/Home.css'

const styles={
  
  rightCard:{
    backgroundColor:"#e6eeff",
    borderColor:"#e6eeff",
  }
}

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Slides /> 
        
        <div className="div1">
        <Row>
          <Col > 
            <img src="./images/market1.png" width="80%" height="100%" alt="Market"  className="leftCard" />
          </Col>
          <Col >
          <Card   style={styles.rightCard} className="text-left rightCard">    
            <CardBody>
              <CardTitle tag="h1" className="cardTitle">EscroDA is your Ethereum hub. Start by visiting your Market.</CardTitle>
              <CardText className="cardText">EscoDA is e-commerce and e-payments platform of new generation, powered by blockchain technology.
               Sell or purchase good or services.Pay or get paid in ETH and Tokens using your favorite wallet. Worldwide.
                Start by visiting your Market.</CardText>
              <Button color="primary" size="lg" ><a href="./Market" className="ancher">Go To Market </a></Button>
            </CardBody>
          </Card>
          </Col>
        </Row>

      <Row>
        <Col>
          <Card body style={styles.rightCard} className="text-left leftCard">    
            <CardBody>
              <CardTitle tag="h1" className="cardTitle"> 
              The place where cryptocurrency is provided with real value</CardTitle>
              <CardText className="cardText">Buy or sell goods or services using ETH and supported tokens.
               Direct interaction between merchants and buyers is powered by revolutional blockchain technology.
               Forget about software installation and registration, all you need to start is your Ethereum wallet.</CardText>         
            </CardBody>
          </Card>
        </Col>
        <Col > 
            <img src="./images/crypto.svg" alt="Crypto" width="100%" className="rightCard" />
          </Col>
      </Row>

      <Row>
      <Col>
        <Card body  style={styles.rightCard}  className="text-left leftCard">    
          <CardBody>
            <CardTitle tag="h1" className="cardTitle">Built-in escrow service secure your deals and payments</CardTitle>
            <CardText className="cardText">Use built-in escrow service to allow for trusted deals in anonymous environment.
             Reputation rating helps instantly distinguish trustworthy merchants at a glance.</CardText>         
          </CardBody>
        </Card>
      </Col>
      <Col > 
        <img src="./images/excrow.svg" alt="Escrow" width="100%" className="rightCard" />
      </Col>
    </Row>

    <Row>
      <Col > 
        <img src="./images/payment.svg" alt="Payment"  className="leftCard" />
      </Col>
    <Col>
      <Card body  style={styles.rightCard}  className="text-left rightCard">    
        <CardBody>
          <CardTitle tag="h1" className="cardTitle">All payments are backed by smart-contracts</CardTitle>
          <CardText className="cardText">All payments are backed by smart-contracts. Thus, verifiable,
           transparent and unforgeable. Automated business logic allows for incredibly low fees.</CardText>         
        </CardBody>
      </Card>
    </Col>
  </Row>
  </div>

  <div className="div1">
      <h1 className="cardTitle">Features that everyone will enjoy</h1>

      <Row>
        <Col>
          <Card style={styles.rightCard} className="features">  
          <CardImg top style={{width:"30%", height:"25%",left:"120px",position:"relative"}} src="./images/icon11.svg" alt="icon11"/>  
            <CardBody>
              <CardTitle className="featuresTitle">Works how you want it</CardTitle>
              <CardText className="cardText">Multi-wallet, multi-device support</CardText>         
            </CardBody>
          </Card>
        </Col>

        <Col>
          <Card style={styles.rightCard} className="features">  
          <CardImg top style={{width:"30%", height:"25%",left:"120px",position:"relative"}} src="./images/icon12.svg" alt="icon12"/>  
            <CardBody>
              <CardTitle className="featuresTitle">Affordable</CardTitle>
              <CardText className="cardText">Low fees, worldwide</CardText>         
            </CardBody>
          </Card>
        </Col>

        <Col>
          <Card style={styles.rightCard} className="features">  
          <CardImg top style={{width:"30%", height:"25%",left:"120px",position:"relative"}} src="./images/icon13.svg" alt="icon13"/>  
            <CardBody>
              <CardTitle className="featuresTitle">Flexible</CardTitle>
              <CardText className="cardText">ETH and different tokens payment options</CardText>         
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row> 
      <Col>
        <Card style={styles.rightCard} className="features">  
        <CardImg top style={{width:"30%", height:"25%",left:"120px",position:"relative"}} src="./images/icon21.svg" alt="icon21"/ >  
          <CardBody >
            <CardTitle className="featuresTitle">Reliable</CardTitle>
            <CardText className="cardText">Thanks to smart-contracts and escrow protection</CardText>         
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card style={styles.rightCard} className="features">  
        <CardImg top style={{width:"30%", height:"25%",left:"120px",position:"relative"}} src="./images/icon22.svg" alt="icon22"/>  
          <CardBody>
            <CardTitle className="featuresTitle">Customizable</CardTitle>
            <CardText className="cardText">You decide how your payment is processed and data is collected</CardText>         
          </CardBody>
        </Card>  
      </Col>
      <Col>
        <Card style={styles.rightCard} className="features">  
        <CardImg top style={{width:"30%", height:"25%",left:"120px",position:"relative"}} src="./images/icon23.svg" alt="icon23"/>  
          <CardBody>
            <CardTitle className="featuresTitle">Easy to start</CardTitle>
            <CardText className="cardText">Ethereum wallet is all you need</CardText>         
          </CardBody>
        </Card>
      </Col>
      </Row>
  </div>

  </Fragment>
    )
  }
}

export default Home
