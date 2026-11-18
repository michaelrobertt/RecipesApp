import React from 'react';
import { NavLink } from 'react-router-dom';
import { BadgeCheckIcon, DrinkIcon, HeartIcon, MealIcon } from './icons';

const ITEMS = [
  { to: '/meals', label: 'Meals', Icon: MealIcon, testId: 'meals-bottom-btn' },
  { to: '/drinks', label: 'Drinks', Icon: DrinkIcon, testId: 'drinks-bottom-btn' },
  { to: '/favorite-recipes', label: 'Saved', Icon: HeartIcon, testId: 'favorites-bottom-btn' },
  { to: '/done-recipes', label: 'Done', Icon: BadgeCheckIcon, testId: 'done-bottom-btn' },
];

function Footer() {
  return (
    <nav className="app-footer" data-testid="footer" aria-label="Main navigation">
      {ITEMS.map(({ to, label, Icon, testId }) => (
        <NavLink
          key={ to }
          to={ to }
          className="app-footer__link"
          activeClassName="app-footer__link--active"
          data-testid={ testId }
        >
          <Icon size={ 22 } />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default Footer;
