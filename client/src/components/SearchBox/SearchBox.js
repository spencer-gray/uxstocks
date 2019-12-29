import React, { Component } from 'react';
import './SearchBox.css';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
//import SearchIcon from "@material-ui/icons/Search";

const CssTextField = withStyles({
  root: {
    // '& label.Mui-focused': {
    //   color: 'green',
    // },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5c5470',
      },
      '&:hover fieldset': {
        borderColor: '#5c5470',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#5c5470',
      },
    },
  },
})(TextField);

class SearchBox extends Component {

  render(){
      return (
          <div className="searchBox">
            <CssTextField
                //id="custom-css-outlined-input"
                label="Stock Ticker..."
                variant="outlined"
                value={this.props.value}
                onChange={this.props.onChange}
                onKeyDown={this.props.onKeyDown}
                fullWidth
                InputLabelProps={{style: { textAlign: 'center', fontSize: 20, color: '#dbd8e3'}}}
                inputProps={{ min: 0,
                                maxLength: 5, 
                                style: { textAlign: 'center', fontSize: 20, color: '#dbd8e3', textTransform: 'uppercase'},
                            }}
                // (setup for search button)
                // InputProps={{
                //     endAdornment: (
                //     <InputAdornment>
                //         <IconButton>
                //         <SearchIcon color='primary'/>
                //         </IconButton>
                //     </InputAdornment>
                //     )
                // }}
            />
          </div>
      );
  }
}

export default SearchBox
