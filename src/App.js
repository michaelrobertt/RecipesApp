import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';

function App() {
  return (
      <Switch>
        <Route component={ Login } exact path="/" />
      </Switch>
  );
}

export default App;
