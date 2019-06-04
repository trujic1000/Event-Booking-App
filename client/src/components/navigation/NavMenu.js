import React, { useState } from 'react';
import { useAuthState } from '../../context/auth-context';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  menuButton: {
    margin: theme.spacing(1)
  }
}));

const NavLink = props => {
  return (
    <MenuItem component={Link} {...props}>
      {props.children}
    </MenuItem>
  );
};

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const {
    state: { token },
    logout
  } = useAuthState();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="Menu"
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        className={classes.menuButton}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!token && (
          <div>
            <NavLink to="/login" onClick={handleClose}>
              Login
            </NavLink>
            <NavLink to="/register" onClick={handleClose}>
              Register
            </NavLink>
          </div>
        )}
        <NavLink to="/events" onClick={handleClose}>
          Events
        </NavLink>
        {token && (
          <div>
            <NavLink to="/bookings" onClick={handleClose}>
              Bookings
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => {
                handleClose();
                logout();
              }}
            >
              Logout
            </NavLink>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default NavMenu;
