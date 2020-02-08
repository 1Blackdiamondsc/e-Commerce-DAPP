import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';



const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  formControl: {
    margin: theme.spacing.unit*4,
    minWidth: 400,
    fontSize: 20
  },
  button: {
    margin: theme.spacing.unit*2,
    fonstSize: 20,
  },
  resize: {
    fontSize:20,
  },
  header: {
    fontSize:25,
    margin:25,
    color: "blue"
  },
  select: {
    width: 400,
    fontSize: 20,
  },
  selectHelp: {
    fontSize:15,
    width:400,
    marginLeft: '30%',
    color: 'red'
  },
  input: {
    display: "none",
    margin: theme.spacing.unit,
  }
});

const categories = [
  {
    value: 'Clothes',
  },
  {
    value: 'Electronic',
  },
  {
    value: 'Toy',
  },
  {
    value: 'General',
  },
];

export class FormProductDetails extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       storageValue:0,
       web3: null,
       accounts: null,
       contract: null,
    }
  }
  

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }; 

  render() {
    const { values, handleChange, classes, changeImage, formErrors } = this.props;
    let image = '';
    if(values.ProductImage!=='')
      image = <img src={values.ProductImage} alt={values.ProductName} height="180" width="180"/>

    return (
      <form  autoComplete="on">    

          <h1 className={classes.header} >Product Details </h1>

          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel  ref={ref => {
            this.InputLabelRef = ref;
          }}
          htmlFor="outlined-age-native-simple" className={classes.resize}>
           Category
          </InputLabel>
          <Select
            value={values.ProductCategory}
            onChange={handleChange('ProductCategory')}
            input={
              <OutlinedInput
                name="ProductCategory"
                labelWidth="200"
                id="outlined-age-native-simple"
              className={ classes.select} />
            }
          >
          {categories.map(option => (
            <option value={option.value} className={classes.select}>
              {option.value}
            </option>
          ))}
          </Select>
          <FormHelperText className={classes.selectHelp}>Please select product category</FormHelperText>
        </FormControl>        
            <br />
          <TextField
           required
            label="Product Name"
            className={classes.textField}
              InputProps={{
                classes: {
                  root: classes.resize,
                },
              }}
              InputLabelProps={{
                FormLabelClasses: {
                  root: classes.resize,
                }
              }}
            onChange={handleChange('ProductName')}
            margin="normal"
            placeholder="Enter Prodct Name"
            variant="outlined"
            defaultValue={values.ProductName}
          />
          <FormHelperText className={classes.selectHelp}>{formErrors.ProductName}</FormHelperText>
              <br />
          <TextField
           required
            label="Product Price"
            className={classes.textField}
              InputProps={{
                classes: {
                  root: classes.resize,
                },
              }}
              InputLabelProps={{
                FormLabelClasses: {
                  root: classes.resize,
                }
              }}
            onChange={handleChange('ProductPrice')}
            margin="normal"
            placeholder="Enter Prodct Price"
            variant="outlined"
            type="number"
            defaultValue={values.ProductPrice}
          />
          <FormHelperText className={classes.selectHelp}>{formErrors.ProductPrice}</FormHelperText>
              <br />
          <TextField
            label="Product Description"
            className={classes.textField}
              InputProps={{
                classes: {
                  root: classes.resize,
                },
              }}
              InputLabelProps={{
                FormLabelClasses: {
                  root: classes.resize,
                }
              }}
            onChange={handleChange('ProductDescription')}
            multiline
            rows="4"
            margin="normal"
            placeholder="Enter About Product"
            variant="outlined"
            defaultValue={values.ProductDescription}
          />
          <br />
          <label style={{marginTop: "10px", fontSize: "15px"}}>Upload Product Image</label> 
          <div style={{marginLeft:"400px", fontSize: "20px"}}>        
           <input
            accept="image/*"
            className={classes.input}
            onChange={changeImage}
            id="raised-button-file"
            type="file"
          />
          <div style={{marginLeft: '-60%'}}>
              {image}
          </div>
            
        </div>
          
          
        
      </form>
    );
  }
}

export default withStyles(styles)(FormProductDetails);
