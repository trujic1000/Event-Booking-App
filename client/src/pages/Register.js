import React, { useState } from 'react';
import axios from '../utils/axios';
import { useAuthState } from '../context/auth-context';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    margin: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(2),
    width: 200
  },
  title: {
    color: theme.palette.text.primary,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem'
    }
  }
}));

const Login = () => {
  const { login } = useAuthState();
  const classes = useStyles();
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { name, email, password, confirmPassword } = authData;
  const onSubmit = e => {
    e.preventDefault();
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      password !== confirmPassword
    ) {
      return;
    }

    let data = {
      query: `
        mutation CreateUser($name: String!, $email: String!, $password: String!){
          createUser(userInput: {name: $name, email: $email, password: $password}) {
            name
            userId
            token
          }
        }
      `
    };

    data.variables = {
      name,
      email,
      password
    };
    // Preparing for sending a request
    data = JSON.stringify(data);
    // Register user
    axios
      .post('', data)
      .then(res => {
        const { name, token, userId } = res.data.data.createUser;
        if (token) {
          login(name, token, userId);
        }
      })
      .catch(err => console.log(err));
  };
  const onChange = e => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };
  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <Typography variant="h4" className={classes.title}>
        Create your profile
      </Typography>
      <TextField
        label="Name"
        name="name"
        required
        className={classes.textField}
        value={name}
        onChange={onChange}
      />
      <TextField
        type="email"
        label="Email"
        name="email"
        autoComplete="email"
        required
        className={classes.textField}
        value={email}
        onChange={onChange}
      />
      <TextField
        type="password"
        label="Password"
        name="password"
        required
        className={classes.textField}
        value={password}
        onChange={onChange}
      />
      <TextField
        type="password"
        label="Confirm Password"
        name="confirmPassword"
        required
        className={classes.textField}
        value={confirmPassword}
        onChange={onChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Submit
      </Button>
    </form>
  );
};

export default Login;
