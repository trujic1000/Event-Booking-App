import React, { forwardRef } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { useAuthState } from '../../context/auth-context';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavMenu from './NavMenu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const AdapterLink = forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const NavLink = props => {
  return (
    <Button color="inherit" component={AdapterLink} {...props}>
      {props.children}
    </Button>
  );
};

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const {
    state: { token },
    logout
  } = useAuthState();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Logo
          </Typography>
          {matches ? (
            <NavMenu />
          ) : (
            <>
              {!token && (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/register">Sign Up</NavLink>
                </>
              )}
              <NavLink to="/events">Events</NavLink>
              {token && (
                <>
                  <NavLink to="/bookings">Bookings</NavLink>
                  <Button color="inherit" onClick={logout}>
                    Logout
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
