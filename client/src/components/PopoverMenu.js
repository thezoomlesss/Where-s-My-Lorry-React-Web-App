import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {  Link  } from "react-router-dom";

class PopoverMenu extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="NameMenu">
        <Button
          className="NameButton"
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          onMouseOver={this.handleClick}
        >
          Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose} component={Link} to={"/profile"}>Profile</MenuItem>
          <MenuItem onClick={this.handleRequestClose} component={Link} to={"/my-account"}>My account</MenuItem>
          <MenuItem onClick={this.handleRequestClose} component={Link} to={"/settings"}>Settings</MenuItem>
          <MenuItem onClick={this.handleRequestClose} component={Link} to={"/logout"}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default PopoverMenu;