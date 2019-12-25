import React, { Component } from 'react';
import './CompanyHeader.css'
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    card: {
        width: 275,
    },
    header: {
        fontSize: 14,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
  
//const classes = useStyles();

class CompanyInfo extends Component {

    state = {
        companyData: [],
    }

    //componentDidUpdate
    componentDidMount() {
        fetch('api/v1/stock/goos/company')
            .then(res => res.json())
            .then(companyData => this.setState({companyData}))
    }

    // Helper with getting CEO first & last name
    getFirstAndLastWords(text) {
        if (text != null) {
            text.toString()
            var text_arr = text.split(" ");
            return text_arr[0] + " " + text_arr[text_arr.length-1];
        }
    }

    formatNumber(num) {
        if (num != null) {
            return num.toLocaleString();
        }
    }

    getNWords(str, n) {
        if (str != null) {
            if (str.length <= n) {
                return str;
            } else {
                return str.split(/\s+/).slice(0,n).join(" ") + "...";
            }
        }
    }

    render(){
        //const {classes} = this.props;

        return (
            <div className='CompanyInfo'>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div className='company-header'>
                            <h1 id='ticker'>{this.state.companyData.symbol}</h1>
                            <p id='title'>{this.state.companyData.companyName}</p>
                        </div>
                        {/* <Paper>Company: {this.state.companyData.companyName}</Paper> */}
                        <div className="company-details">
                            {/* the css should be more localized so that i'm not just using 1 file and can have same naming
                                conventions across files*/}
                            <div className="row">
                                <p className="company-details-head">Company</p>
                                <p className="company-details-data">{this.state.companyData.companyName}</p>
                            </div>
                            <div className="row">
                                <p className="company-details-head">Sector</p>
                                <p className="company-details-data">{this.state.companyData.sector}</p>
                            </div>
                            <div className="row">
                                <p className="company-details-head">Industry</p>
                                <p className="company-details-data">{this.state.companyData.industry}</p>
                            </div>
                            <div className="row">
                                <p className="company-details-head">Exchange</p>
                                <p className="company-details-data">{this.state.companyData.exchange}</p>
                            </div>
                            <div className="row">
                                <p className="company-details-head">CEO</p>
                                <p className="company-details-data">{this.getFirstAndLastWords(this.state.companyData.CEO)}</p>
                            </div>
                            <div className="row">
                                <p className="company-details-head">Employees</p>
                                <p className="company-details-data">{this.formatNumber(this.state.companyData.employees)}</p>
                            </div>
                            <div className="row">
                                <p className="company-details-head">Website</p>
                                <a target ="_blank" rel="noopener noreferrer" href={this.state.companyData.website}><p className="company-details-data">{this.state.companyData.website}</p></a>
                            </div>
                            <div className="row">
                                <p className="company-details-head">Location</p>
                                <p className="company-details-data">{this.state.companyData.city + ", " + this.state.companyData.country}</p>
                            </div>
                        </div>
                        <div className='description'>
                            <small>{this.getNWords(this.state.companyData.description, 20)}</small>
                        </div>
                        <div>

                        </div>
                        <div className='company-tags'>
                                {   
                                    // checks if company data tags exist to avoid initial loading undefined error
                                    this.state.companyData.tags && this.state.companyData.tags.map(function (tags, i) {
                                        return (
                                            <div className='tag' key={i}><p>{tags}</p></div>
                                        );
                                    })
                                }
                        </div>
                    </Grid>
                </Grid>

                {/* Kept just so I can see how the styling was implemented with classes variable*/}
                {/* <Card className={classes.card} variant="outlined">
                    <CardContent>
                        <ListItem>
                            <Typography className={classes.header} color="textSecondary" gutterBottom>
                                Company
                            </Typography>
                            <Typography className={classes.header} color="textSecondary" gutterBottom>
                                {this.state.companyData.companyName}
                            </Typography>
                        </ListItem>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                            benevolent
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card> */}
            </div>
        );
    }
}

export default withStyles(useStyles)(CompanyInfo)
