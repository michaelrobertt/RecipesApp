import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import AppContext from './context/AppContext';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './components/RecipeInProgress';
import NotFound from './pages/NotFound';
import { Toast } from './components/Feedback';
import './App.css';

/** Personal pages need a session; recipes stay public so shared links work. */
function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(AppContext);
  return (
    <Route
      { ...rest }
      render={ (props) => (user ? <Component { ...props } /> : <Redirect to="/" />) }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route component={ Login } exact path="/" />

        <Route component={ Meals } exact path="/meals" />
        <Route component={ RecipeDetails } exact path="/meals/:id" />
        <Route component={ RecipeInProgress } exact path="/meals/:id/in-progress" />

        <Route component={ Drinks } exact path="/drinks" />
        <Route component={ RecipeDetails } exact path="/drinks/:id" />
        <Route component={ RecipeInProgress } exact path="/drinks/:id/in-progress" />

        <PrivateRoute component={ Profile } exact path="/profile" />
        <PrivateRoute component={ DoneRecipes } exact path="/done-recipes" />
        <PrivateRoute component={ FavoriteRecipes } exact path="/favorite-recipes" />

        <Route component={ NotFound } />
      </Switch>
      <Toast />
    </>
  );
}

export default App;
