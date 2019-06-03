import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthState } from '../context/auth-context';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 10
  },
  nav: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  },
  navLink: {
    textAlign: 'center'
  }
}));

function ListItemLink(props) {
  return <ListItem component={NavLink} {...props} />;
}

const MainNavigation = () => {
  const classes = useStyles();
  const {
    state: { token },
    logout
  } = useAuthState();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <List component="nav" className={classes.nav}>
            {!token && (
              <>
                <ListItemLink to="/login">
                  <ListItemText className={classes.navLink} primary="Login" />
                </ListItemLink>
                <ListItemLink to="/register">
                  <ListItemText className={classes.navLink} primary="Sign Up" />
                </ListItemLink>
              </>
            )}
            <ListItemLink to="/events">
              <ListItemText className={classes.navLink} primary="Events" />
            </ListItemLink>
            {token && (
              <>
                <ListItemLink to="/bookings">
                  <ListItemText
                    className={classes.navLink}
                    primary="Bookings"
                  />
                </ListItemLink>
                <Button color="inherit">Logout</Button>
              </>
            )}
          </List>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainNavigation;
