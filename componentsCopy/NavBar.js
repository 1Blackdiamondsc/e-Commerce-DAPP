import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';


const style={

}
 class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      
        <Navbar dark expand="lg" style={{backgroundColor:"MidnightBlue"}} >
          <NavbarBrand href="./" style={{fontSize:"30px", fontFamily:"Comic Sans MS"}}> <strong>EscroDA</strong>  </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar  style={{fontSize:"20px"}}>
              <NavItem style={{marginLeft:"40px"}}>
                <NavLink  href="./Home">Home</NavLink>
              </NavItem>
              <NavItem style={{marginLeft:"40px"}}>
                <NavLink href="./Market">Market</NavLink>
              </NavItem>
              <NavItem style={{marginLeft:"40px"}}>
                <NavLink href="./Seller">Seller</NavLink>
              </NavItem>
              <NavItem style={{marginLeft:"40px"}}>
                <NavLink href="./">How it Works</NavLink>
              </NavItem>
              <NavItem style={{marginLeft:"40px"}}>
                <NavLink href="./">FAQ</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
     
    );
  }
}

export default NavBar;