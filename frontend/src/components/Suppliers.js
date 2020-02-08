import React, { Component } from 'react';
import '../CSS/Suppliers.css';
import { Fragment } from 'react';
import { Row, Col, Card, CardImg, CardBody, Button, NavLink } from 'reactstrap'

class SuppliersClient extends Component {
    render(){
        return (
            <Fragment >
                <Row className="row2">
                   <Col className="col2">
                        <Card >
                        <CardImg inverse  width="50%" height="280" src="./images/sell-product.png" alt="Sell Product" />
                        <CardBody>                          
                        <NavLink href="./sellProduct" ><Button color="primary" block active className="button2"> <strong style={{fontSize:"25px"}}>Sell Product </strong> </Button> </NavLink>
                        </CardBody>
                        </Card>
                   </Col>
                   <Col className="col2">
                        <Card >
                        <CardImg inverse width="50%" height="280" src="./images/processOrder.jpg" alt="Process Order" />
                        <CardBody>
                             <NavLink href='./orderProcess'><Button color="primary" block active className="button2"> <strong style={{fontSize:"25px"}}> Process Order </strong></Button></NavLink>
                        </CardBody>
                        </Card>
                   </Col>
                </Row>
            </Fragment>
        );
    }
}

export default SuppliersClient;