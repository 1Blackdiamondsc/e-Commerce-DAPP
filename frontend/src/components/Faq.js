import React from 'react';
import { Card, CardText, CardBody, CardTitle, Row, Col } from 'reactstrap';
  import '../CSS/Faq.css'

const Example = (props) => {
  return (
    <div>
    <Row>
      <Col>
      <Card className="abc" color="info">
        <CardBody>
          <CardTitle className="def"><b>Which technology is used in SRF?</b></CardTitle>
          <CardText className="ghi">Blockchain technology is used in implementation of SRF.<br/>A blockchain is a growing list of records,
           called blocks, which are linked using cryptography.<br/> 
           Each block contains a cryptographic hash of the previous block a timestamp,<br/>
           and transaction data </CardText>
        </CardBody>
      </Card>
      </Col>
      <Col>
      <Card className="abc" color="info">
        <CardBody>
          <CardTitle className="def"><b>Is it open source or taken by any private firm?</b></CardTitle>
          <CardText className="ghi">SRF is open source.Anyone can access it free of cost.<br/>
          The term "open source" refers to something people can modify<br/>
          and share because its design is publicly accessible.
            </CardText> 
        </CardBody>
      </Card >
      </Col>
      </Row>
      <br/><br/>
      <Row>
      <Col>
      <Card className="abc" color="info">
        <CardBody>
          <CardTitle className="def"><b>Which are the tools used in SRF?</b></CardTitle>
          <CardText className="ghi">Tools used in SRF are Solidity(language for creating smart contract),<br/>
          IPFS(Inter Planatory File System),Ganache(local Blockchain),MetaMask(for wallets)<br/>
          ,JavaScript,React,Material-ui,ReactStrap(frontend development) etc </CardText>
        </CardBody>
      </Card>
      </Col>
      <Col>
      <Card className="abc" color="info">
        <CardBody>
          <CardTitle className="def"><b>Which Platform is used in SRF?</b></CardTitle>
          <CardText className="ghi">Ethereum Platform is used in SRF.Ethereum is an open-source,<br/> public, blockchain-based distributed computing platform 
          <br/>and operating system featuring smart contract (scripting) functionality<br/>
           It supports a modified version of Nakamoto consensus via transaction-based state transitions.
            </CardText>
        </CardBody>
      </Card>
      </Col>
      </Row>
      <br/><br/>
      <Row>
      <Col>
      <Card className="abc" color="info">
        <CardBody>
          <CardTitle className="def"><b>Which Currency is used in SRF?</b></CardTitle>
          <CardText className="ghi">Ethers are used for making transactions between buyer and sellers.<br/>
          Ether is a fundamental token for operation of Ethereum,<br/>
           which thereby provides a public distributed ledger for transactions.<br/>
            It is used to pay for gas,a unit of computation used in transactions and other state<br/>
            transitions. Mistakenly, this currency is also referred to as Ethereum.
            </CardText>
        </CardBody>
      </Card>
      </Col>
      <Col>
      <Card className="abc" color="info">
        <CardBody>
          <CardTitle className="def"><b>What is Smart Contract?</b></CardTitle>
          <CardText className="ghi">
          A smart contract is a computer protocol intended to digitally facilitate,<br/> 
          verify, or enforce the negotiation or performance of a contract.<br/>
           Smart contracts allow the performance of credible transactions without third parties. </CardText>
          
        </CardBody>
      </Card>
      </Col>
      </Row>
    </div>
  );
};

export default Example;