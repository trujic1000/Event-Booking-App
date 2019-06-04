import React, { createContext, useState, useContext } from 'react';
import setAuthToken from '../utils/setAuthToken';

const initialState = {
  name: null,
  token: null,
  userId: null
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const login = (name, token, userId) => {
    setState({ name, token, userId });
    if (!localStorage.jwt) {
      localStorage.setItem('jwt', token);
      setAuthToken(token);
    }
  };
  const logout = () => {
    setState(initialState);
    localStorage.removeItem('jwt');
  };

  return (
    <AuthContext.Provider value={{ state, setState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => {
  return useContext(AuthContext);
};
