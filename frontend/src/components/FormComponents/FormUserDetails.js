import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  button: {
    margin: theme.spacing.unit,
  },
  resize: {
    fontSize:20,
  
  },
  formBorder: {
    border: "2px groove red",
    backgroundColor: "#e6eeff",
    borderRadius: "10px",    
    marginLeft:200,
    marginRight:200,
  },
  header: {
    fontSize:25,
    margin:25,
    color: "blue"
  },
  selectHelp: {
    fontSize:15,
    width:400,
    marginLeft: '30%',
    color: 'red',
  },
});


export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange, classes, formErrors } = this.props;
    return (
      
        <React.Fragment>
          
          <form  autoComplete="on">   
          <h1 className={classes.header}> Seller Details</h1>        
            <TextField 
              required          
              label="Name"
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
              onChange={handleChange('UserName')}
              margin="normal"
              placeholder="Enter Name of Seller"
              variant="outlined"
              defaultValue={values.UserName}
            />
            <FormHelperText className={classes.selectHelp}> {formErrors.UserName}</FormHelperText>
            <br />
            <TextField 
            required          
            label="Mobile Number"
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
            onChange={handleChange('Contact')}
            margin="normal"
            placeholder="Enter Mobile Number"
            variant="outlined"
            type="number"
            defaultValue={values.Contact}
            />
            <FormHelperText className={classes.selectHelp}>{formErrors.Contact}</FormHelperText>
            <br />
            <TextField 
                     
            label="Email"
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
            onChange={handleChange('Email')}
            margin="normal"
            placeholder="Enter Email"
            variant="outlined"
            type="email"   
            defaultValue={values.Email}         
            />
            <FormHelperText className={classes.selectHelp}>{formErrors.Email}</FormHelperText>
            <br />
            
            
        </form>
          
        </React.Fragment>
      
    );
  }
}

export default withStyles(styles)(FormUserDetails);

