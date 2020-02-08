import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },

});

export class Confirm extends Component {
  
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { UserName,Email,Contact,ProductCategory,ProductName,ProductPrice,ProductDescription },
      classes
    } = this.props;
    return (
      <div >
           
           <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell >Confirm Details</CustomTableCell>                    
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow >  
                    <CustomTableCell >User Name</CustomTableCell>
                    <CustomTableCell >{UserName}</CustomTableCell>
                  </TableRow>
                  <TableRow>  
                    <CustomTableCell >Email Address</CustomTableCell>
                    <CustomTableCell >{Email}</CustomTableCell>
                  </TableRow>
                  <TableRow>  
                    <CustomTableCell >Contact Number</CustomTableCell>
                    <CustomTableCell >{Contact}</CustomTableCell>
                  </TableRow>
                  <TableRow>  
                    <CustomTableCell >Product Cateogry</CustomTableCell>
                    <CustomTableCell >{ProductCategory}</CustomTableCell>
                  </TableRow>
                  <TableRow>  
                    <CustomTableCell >Product Name</CustomTableCell>
                    <CustomTableCell >{ProductName}</CustomTableCell>
                  </TableRow>
                  <TableRow>  
                    <CustomTableCell >Product Price</CustomTableCell>
                    <CustomTableCell >{ProductPrice}</CustomTableCell>
                  </TableRow>
                  <TableRow>  
                    <CustomTableCell >Product Description</CustomTableCell>
                    <CustomTableCell >{ProductDescription}</CustomTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Confirm);
