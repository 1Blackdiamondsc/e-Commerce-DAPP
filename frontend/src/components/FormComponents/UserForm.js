import React, { Component, Fragment } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
//import Success from './Success';
import Success from '../Customers';

class UserForm extends Component {
  state = {
    step: 1,
    UserName: '',
    Email: '',
    Contact: '',
    ProductCategory: 'General',
    ProductName: '',
    ProductPrice:'',
    ProductDescription:'',
    ProductImage:''
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { UserName,Email,Contact,Category,Name,Price,Description } = this.state;
    const values = { UserName,Email,Contact,Category,Name,Price,Description };

    switch (step) {
      case 1:
        return (
          <Fragment>
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
          </Fragment>
        );
      case 2:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;
    }
  }
}

export default UserForm;
