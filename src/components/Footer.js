import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer className="footer" data-testid="footer">
      <button
        src={ mealIcon }
        type="button"
        data-testid="meals-bottom-btn"
        onClick={ () => { history.push('/meals'); } }
      >
        <img src={ mealIcon } alt="página de comidas" />
      </button>
      <button
        src={ drinkIcon }
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => { history.push('/drinks'); } }
      >
        <img src={ drinkIcon } alt="página de bebidas" />
      </button>
    </footer>
  );
}

export default Footer;
