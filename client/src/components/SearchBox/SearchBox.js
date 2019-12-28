import React, { Component } from 'react';
import './SearchBox.css';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
//import SearchIcon from "@material-ui/icons/Search";

// const WAIT_INTERVAL = 1000;
// const ENTER_KEY = 13;

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
//   state = {
//     value: this.props.value
//   }

  //handler = this.handler.bind(this);

  timer = null

//   handler(e) {

//     clearTimeout(this.timer)

//     this.setState({ value: e.target.value });

//     //this.props.setState({ value: e.target.value });

//     this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);

//     /// delete below
//     // console.log(event.target.value);

//     // this.setState({value: event.target.value});
//   }

  // searches when user is done typing (wait-time determined by WAIT_INTERVAL)
//   handleChange = e => {
//     clearTimeout(this.timer)

//     this.setState({ value: e.target.value });

//     //this.props.setState({ value: e.target.value });

//     this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
//   }

//   // searches when user clicks enter
//   handleKeyDown = e => {
//     if (e.keyCode === ENTER_KEY) {
//       clearTimeout(this.timer)
//       this.triggerChange()
//     }
//   }

//   // executes search (just logging to console for now)
//   triggerChange = () => {
//     const { value } = this.state
//     console.log(value.toUpperCase());
//     // props function was here
//     //this.props.onChange();
//   }

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
