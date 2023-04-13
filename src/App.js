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
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route component={ Login } exact path="/" />
      <Route component={ Meals } exact path="/meals" />
      <Route component={ RecipeDetails } exact path="/meals/:id" />
      <Route component={ RecipeInProgress } exact path="/meals/:id/in-progress" />
      <Route component={ Drinks } exact path="/drinks" />
      <Route component={ RecipeDetails } exact path="/drinks/:id" />
      <Route component={ RecipeInProgress } exact path="/drinks/:id/in-progress" />
      <Route component={ Profile } exact path="/profile" />
      <Route component={ DoneRecipes } exact path="/done-recipes" />
      <Route component={ FavoriteRecipes } exact path="/favorite-recipes" />

      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />

      {/* <Route
        exact
        path="/meals/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ RecipeInProgress }
      /> */}
    </Switch>
  );
}

export default App;
