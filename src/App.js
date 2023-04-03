import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route component={ Login } exact path="/" />
    </Switch>
  );
}

export default App;
