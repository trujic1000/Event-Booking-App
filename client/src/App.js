import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useAuthState } from './context/auth-context';
import setAuthToken from './utils/setAuthToken';
import './App.css';

import Login from './pages/Login';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import Register from './pages/Register';
import Navbar from './components/navigation/Navbar';

function App() {
  const {
    state: { token },
    login,
    logout
  } = useAuthState();

  // Check if already logged in
  useEffect(() => {
    if (localStorage.jwt) {
      const { jwt } = localStorage;
      // Set auth token
      setAuthToken(jwt);
      // Decode token
      const { userId, exp } = jwt_decode(jwt);
      login(jwt, userId);

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (exp < currentTime) {
        // Logout the user
        logout();
      }
    }
  }, []);
  return (
    <>
      <Navbar />
      <main className="main">
        <Switch>
          {token && <Redirect exact from="/" to="/events" />}
          {token && <Redirect exact from="/login" to="/events" />}
          {token && <Redirect exact from="/register" to="/events" />}
          {token && <Route path="/bookings" component={Bookings} />}
          {!token && <Route path="/login" component={Login} />}
          {!token && <Route path="/register" component={Register} />}
          <Route path="/events" component={Events} />
          {!token && <Redirect exact to="/login" />}
        </Switch>
      </main>
    </>
  );
}

export default App;
