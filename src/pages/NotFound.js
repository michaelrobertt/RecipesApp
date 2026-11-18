import React from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from '../components/icons';

function NotFound() {
  return (
    <div className="page page--centered">
      <main className="page__content not-found">
        <LogoMark size={ 52 } />
        <p className="not-found__code">404</p>
        <h1>This page went out for lunch</h1>
        <p className="not-found__text">
          The page you are looking for does not exist. Let&apos;s get you back to the kitchen.
        </p>
        <Link className="btn btn--primary" to="/meals">Back to the recipes</Link>
      </main>
    </div>
  );
}

export default NotFound;
