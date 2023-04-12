import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer className="footer" data-testid="footer">
      <button
        className="footer-btn"
        src={ mealIcon }
        type="button"
        data-testid="meals-bottom-btn"
        onClick={ () => { history.push('/meals'); } }
      >
        <img className="footer-img" src={ mealIcon } alt="página de comidas" />
        <p className="footer-p">Foods</p>
      </button>
      <button
        className="footer-btn"
        src={ drinkIcon }
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => { history.push('/drinks'); } }
      >
        <img className="footer-img" src={ drinkIcon } alt="página de bebidas" />
        <p className="footer-p">Drinks</p>
      </button>
    </footer>
  );
}

export default Footer;
