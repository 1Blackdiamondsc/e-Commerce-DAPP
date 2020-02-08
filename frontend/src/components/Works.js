import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card,Row,Col } from 'reactstrap';
import "../CSS/Works.css";

const data = [
    {
        question: "What is the significance of initiating the smart contract?",
        answer: "The seller will need to stake 2x the value of what he is selling.",
    },
    {
        question: "What is the significance of confirming delivery?",
        answer: "This triggers the Smart Contract to return 1ETH to John and 3ETH to Peter. Confirming delivery concludes the transaction."
    },
    {
        question: "Isn’t Peter selling? Why must he stake ETH worth 2x of the value of his widget to the Smart Contract?",
        answer: "By staking 2x of the value of his widget to the Smart Contract, Peter is committed to delivering his widget to John. Or else he loses double the value of his widget."
    },
    {
        question: "Why can’t Peter just stake 1ETH then, which is what his widget is worth?",
        answer: "If Peter stakes only 1ETH, his stake is less than John’s,which is 2ETH. If he doesn’t deliver his widget to John, he loses only 1ETH while John loses 2ETH."
    },
    {
        question: "Why must John stake 2x the value of the widget he is purchasing?",
        answer: " Imagine if John stakes only 1ETH, Peter delivers, and John refuses to confirm the delivery. Peter will lose 2ETH and John loses nothing!"
    },
    {
        question: "Then why not let both John and Peter stake only 1ETH each?",
        answer: "If John receives the goods and does not confirm it, he loses nothing, while Peter loses not only 1ETH, but his widget as well. The significance  of making both seller and buyer stake ETH worth 2x the value of  the widget isthat this motivates both parties to carry the full process of the transaction,  from initiation to delivery confirmation. This illustrates the beauty of a well designed smart contract which in this case, ensures fairness for both the buyer and seller."
    },
    {
        question: "Can the Smart Contract lie and not return ETHs to John and/or Peter?",
        answer: "The codes for a Smart Contract can be verified and displayed for all to see on Etherscan.io. Run only what you trust."
    },
    {
        question: "What if the widget cost 1.43546ETH, I mean, what if it does not yield a whole number when divided by 2?",
        answer: "Aww, then you lose ETH due to rounding. As an example, it is a pretty cool piece of code to learn about the potential of smart contracts. In a real life environment, it definitely requires more work."
    },
    

]

class Works extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse:[] };
  }

  toggle(index) {
      let newArray = [...this.state.collapse];
      newArray[index] = !newArray[index];
    this.setState(state => ({ collapse: newArray }));
  }

  render() {
    return (
      <div style={{ backgroundColor: "#e6eeff" }}>
      <h1 className="shadow">Working of <strong>EscroDA</strong></h1>
        <Row>
          <Col >
          <h2 className="lowerheader">Step1</h2><br/><br/><br/><br/>
          <img src="./images/Works/escrow1_0.png" alt="escrow1" /><br/><br/><br/><br/><br/>
          </Col>
          <Col >
          <h2 className="lowerheader1" >Step2</h2><br/><br/><br/><br/>
          <img src="./images/Works/escrow2_0.png" alt="escrow2"/><br/><br/><br/><br/><br/>
          </Col>
        </Row>
        <Row>
          <Col>
          <h2 className="lowerheader">Step3</h2><br/><br/><br/><br/>
            <img src="./images/Works/escrow3_0.png" alt="escrow3"/><br/><br/><br/><br/><br/>
          </Col>
          <Col>
           <h2 className="lowerheader1">Step4</h2><br/><br/><br/><br/>
            <img src="./images/Works/escrow4_0.png" alt="escrow4"/><br/><br/><br/><br/><br/>
          </Col>
         </Row>
         <Row>
         
            <Col>
            <h2 className="lowerheader">Step5</h2><br/><br/><br/><br/>
              <img src="./images/Works/escrow5_0.png" alt="escrow5"/><br/><br/><br/><br/><br/>
            </Col>
            <Col>
            <h2 className="lowerheader1">Step6</h2><br/><br/><br/><br/>
            <img src="./images/Works/escrow6_0.png" alt="escrow6"/><br/><br/><br/><br/><br/>
            </Col>
          </Row>
     <div className="headimg">
     <h8 className="lowerheader">Step7</h8><br/><br/><br/><br/>
      <img src="./images/Works/escrow7_0.png" alt="escrow7"/><br/><br/><br/><br/><br/>
     </div>

      <h2 className="shadow">Question and Answer Regarding Working</h2>
      <div >
      {data.map((value,index)=>(
      <Row style={{ marginLeft: "30%" }}> 
      <div className="shadow">   
      <Button color="muted"className="quesbutton"onClick={()=> this.toggle(index)} style={{ marginBottom: '1rem',fontSize :"20px"}}>{value.question}</Button></div>
        <Collapse isOpen={this.state.collapse[index]}>
          <Card className="anscard">
            <CardBody>{value.answer}</CardBody>
          </Card>
        </Collapse>
        </Row>
        ))}
        </div>
      </div>
    );
  }
}

export default Works;