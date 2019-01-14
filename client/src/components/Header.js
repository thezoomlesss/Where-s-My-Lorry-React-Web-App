import React, { Component } from 'react';
import './../App.css';
// import Button from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';

    
  
export default class Header extends Component {
    
    render() {
    return (
        <header>
            <Button variant="contained" color="primary">
            Hello World
            </Button>
            <span className='TestText'>Test Text</span>
        </header>
        
    );
    }

}