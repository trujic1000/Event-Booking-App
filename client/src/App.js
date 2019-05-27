import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';

function App() {
  return (
    <>
      <Switch>
        <Redirect exact from="/" to="/auth" />
        <Route path="/auth" component={Auth} />
        <Route path="/events" component={Events} />
        <Route path="/bookings" component={Bookings} />
      </Switch>
    </>
  );
}

export default App;
