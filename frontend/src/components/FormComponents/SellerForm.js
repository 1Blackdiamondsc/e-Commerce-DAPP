import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormProductDetails from './FormProductDetails';
import Confirm from './Confirm';
import Stepper from './Stepper'


class SellerForm extends Component {
  state = {
    UserName: '',
    Email: '',
    Contact: '',
    ProductCategory: '',
    ProductName: '',
    ProductPrice:'',
    ProductDescription:'',
    ProductImage:'',
    formErrors: {
      UserName: '',
      Email: '',
      Contact: '',
      ProductName: '',
      ProductPrice:'',
    },
    UserNameValid: false,
    EmailValid: false,
    ContactValid: false,
    ProductNameValid: false,
    ProductPriceValid: false,
    sellerFormValid: false,
    productFormValid: false,
  };


  // Handle fields change
  handleChange = input => e => {
    const value = e.target.value;
    this.setState({ [input]: value }, this.validateField(input,value));
  };
  
  //handle uploading of image
  changeImage = ({ target }) => {
    const fileReader = new FileReader();    
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      this.setState({ ProductImage: e.target.result});
    } 
  }
  
   // Validate form entries and set the errors
  validateField(fieldName, value){
    let fieldValidationErrors = this.state.formErrors;
    let { UserNameValid, EmailValid, ContactValid, ProductNameValid, ProductPriceValid } = this.state

    switch(fieldName) {
      case 'Email':
        if(value === '')
         { fieldValidationErrors.Email = '*This field is must please enter email';
           EmailValid = false;
        }
        else{
          EmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.Email = EmailValid ? '' : '*Email is invalid';
        }
        break;

      case 'UserName':
        if(value === '')
          {fieldValidationErrors.UserName = '*This field is must please enter name'
          UserNameValid = false;
        }
        else{
          UserNameValid = value.length <= 32;
          fieldValidationErrors.UserName = UserNameValid ? '': '*Seller Name is too long max size is 32';
        }
        break;

      case 'Contact':
        if(value === '')
          {fieldValidationErrors.Contact = '*This field is must please enter contact number'
          ContactValid = false;
        }
        else{
          ContactValid = value.length === 10;
          fieldValidationErrors.Contact = ContactValid ? '': '*Contact Number is not valid';
        }
        break;

        case 'ProductName':
        if(value === '')
          {fieldValidationErrors.ProductName = '*This field is must please enter Name'
          ProductNameValid = false;
        }
        else{
          ProductNameValid = value.length <= 100;
          fieldValidationErrors.ProductName = ProductNameValid ? '': '*Product Name is too long max size is 100';
        }
        break; 
        
        case 'ProductPrice':
        if(value === ''){
          fieldValidationErrors.ProductPrice = '*This field is must please enter Price'
          ProductPriceValid = false;
        }
        else
          {
            fieldValidationErrors.ProductPrice = '';
            ProductPriceValid = true;
          }
          break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    EmailValid: EmailValid,
                    UserNameValid: UserNameValid,
                    ContactValid: ContactValid,
                    ProductNameValid: ProductNameValid,
                    ProductPriceValid: ProductPriceValid
                  }, this.validateForm);
  }

  // validate Entire form and stop the user here only
  validateForm(){
    const { UserNameValid, EmailValid, ContactValid, ProductNameValid, ProductPriceValid } = this.state
    this.setState({
      sellerFormValid: UserNameValid && EmailValid && ContactValid,
      productFormValid: ProductNameValid && ProductPriceValid
    })
    
  }

  getStepContent= step => {
    const { UserName,Email,Contact,ProductCategory,ProductName,ProductPrice,ProductDescription, ProductImage} = this.state;
    const values = { UserName,Email,Contact,ProductCategory,ProductName,ProductPrice,ProductDescription, ProductImage };

    switch (step) {
      case 0:
        return (<FormUserDetails
        handleChange={this.handleChange}
        values={values}
        formErrors={this.state.formErrors}
      />);
      case 1:
        return (
            <FormProductDetails
              handleChange={this.handleChange}
              changeImage={this.changeImage}
              values={values}
              formErrors={this.state.formErrors}
            />
          );
      case 2:
        return (
            <Confirm
              values={values}
            />
          ); 
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { UserName,Email,Contact,ProductCategory,ProductName,ProductPrice,ProductDescription,ProductImage } = this.state;
    const values = { UserName,Email,Contact,ProductCategory,ProductName,ProductPrice,ProductDescription,ProductImage };

    return (
        <Stepper getStepContent={this.getStepContent} 
                 values={values}  
                 sellerFormValid={this.state.sellerFormValid}
                 productFormValid={this.state.productFormValid}/>
    )
}
}

export default SellerForm;
