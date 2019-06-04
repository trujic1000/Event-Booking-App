import React, { createContext, useState, useContext } from 'react';

const initialState = {
  token: null,
  userId: null
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const login = (token, userId) => {
    setState({ token, userId });
    if (!localStorage.jwt) {
      localStorage.setItem('jwt', token);
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
