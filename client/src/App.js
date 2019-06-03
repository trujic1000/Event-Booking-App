import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useAuthState } from './context/auth-context';
import './App.css';

import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import MainNavigation from './components//MainNavigation';

function App() {
  const {
    state: { token }
  } = useAuthState();
  return (
    <>
      <MainNavigation />
      <main className="main">
        <Switch>
          {token && <Redirect exact from="/" to="/events" />}
          {token && <Redirect exact from="/login" to="/events" />}
          {!token && <Route path="/login" component={Auth} />}
          {token && <Route path="/bookings" component={Bookings} />}
          <Route path="/events" component={Events} />
          {!token && <Redirect exact to="/login" />}
        </Switch>
      </main>
    </>
  );
}

export default App;
