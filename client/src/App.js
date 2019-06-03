import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useAuthState } from './context/auth-context';
import './App.css';

import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import Navbar from './components/navigation/Navbar';

function App() {
  const {
    state: { token }
  } = useAuthState();
  return (
    <>
      <Navbar />
      <main className="main">
        <Switch>
          {token && <Redirect exact from="/" to="/events" />}
          {token && <Redirect exact from="/login" to="/events" />}
          {token && <Redirect exact from="/register" to="/events" />}
          {!token && <Route path="/login" component={Auth} />}
          {!token && <Route path="/register" component={Auth} />}
          {token && <Route path="/bookings" component={Bookings} />}
          <Route path="/events" component={Events} />
          {!token && <Redirect exact to="/login" />}
        </Switch>
      </main>
    </>
  );
}

export default App;
