import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route component={ Login } exact path="/" />
      <Route component={ Meals } exact path="/meals" />
      <Route component={ Drinks } exact path="/drinks" />
      <Route component={ Profile } exact path="/profile" />
      <Route component={ DoneRecipes } exact path="/done-recipes" />
      <Route component={ FavoriteRecipes } exact path="/favorite-recipes" />
    </Switch>
  );
}

export default App;
