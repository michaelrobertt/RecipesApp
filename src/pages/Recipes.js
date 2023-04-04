import React from 'react';
import { useLocation } from 'react-router-dom';
import Meals from './Meals';
import Drinks from './Drinks';

function Recipes() {
  const location = useLocation();
  return (
    <div>
      { location.pathname === '/meals' ? (<Meals />) : null}
      { location.pathname === '/drinks' ? (<Drinks />) : null}
    </div>
  );
}

export default Recipes;
