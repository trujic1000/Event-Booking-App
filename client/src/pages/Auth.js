import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuthState } from '../context/auth-context';
import { Button } from '../components/Button';

const Auth = () => {
  const { login } = useAuthState();
  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  });
  const [isLogin, setLogin] = useState(true);
  const onSubmit = e => {
    const { email, password } = authData;
    e.preventDefault();

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    // Request Config
    const url = 'http://localhost:8000/graphql';
    // Data if logging in
    let data = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };
    // Data if signing up
    if (!isLogin) {
      data = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }
    // Preparing for sending a request
    data = JSON.stringify(data);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // Register user
    axios
      .post(url, data, config)
      .then(res => {
        const { token, userId, tokenExpiration } = res.data.data.login;
        if (token) {
          login(token, userId, tokenExpiration);
        }
      })
      .catch(err => console.log(err));
  };
  const onChange = e => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };
  return (
    <AuthForm onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email" onChange={onChange} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={onChange}
        />
      </div>
      <Button>Submit</Button>
      <Button onClick={() => setLogin(!isLogin)} type="button">
        Switch to {isLogin ? 'Signup' : 'Login'}
      </Button>
    </AuthForm>
  );
};

const AuthForm = styled.form`
  width: 25rem;
  max-width: 80%;
  margin: 5rem auto;

  .form-control label,
  .form-control input {
    width: 100%;
    display: block;
  }

  .form-control label {
    margin-bottom: 0.5rem;
  }

  .form-control {
    margin-bottom: 1rem;
  }
`;

export default Auth;
