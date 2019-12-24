import React, { Component } from 'react';
import './App.css';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
//import SearchIcon from "@material-ui/icons/Search";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

const CssTextField = withStyles({
  root: {
    // '& label.Mui-focused': {
    //   color: 'green',
    // },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#FFFFFF',
      },
      '&:hover fieldset': {
        borderColor: '#FFFFFF',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFFFFF',
      },
    },
  },
})(TextField);

class App extends Component {
  state = {
    stockTicker: ''
  }

  timer = null

  // searches when user is done typing (wait-time determined by WAIT_INTERVAL)
  handleChange = e => {
    clearTimeout(this.timer)

    this.setState({ stockTicker: e.target.value })

    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL)
  }

  // searches when user clicks enter
  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer)
      this.triggerChange()
    }
  }

  // executes search (just logging to console for now)
  triggerChange = () => {
    const { stockTicker } = this.state
    console.log(stockTicker.toUpperCase());
  }

  render(){
      return (
          <div className="searchBox">
              <CssTextField
              //id="custom-css-outlined-input"
              label="Stock Ticker..."
              variant="outlined"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              fullWidth
              InputLabelProps={{style: { textAlign: 'center', fontSize: 20, color: '#FFFFFF'}}}
              inputProps={{ min: 0,
                            maxLength: 5, 
                            style: { textAlign: 'center', fontSize: 20, color: '#FFFFFF', textTransform: 'uppercase'},
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

export default App
