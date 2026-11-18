import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BadgeCheckIcon, HeartIcon } from '../components/icons';
import AppContext from '../context/AppContext';

function Profile() {
  const { user, favorites, doneRecipes, logout } = useContext(AppContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <div className="page">
      <Header title="Profile" backTo="/meals" />
      <main className="page__content">
        <section className="card profile-card">
          <div className="profile-card__avatar" aria-hidden="true">
            {user?.email ? user.email.slice(0, 1).toUpperCase() : '?'}
          </div>
          <div className="profile-card__info">
            <p className="profile-card__label">Signed in as</p>
            <h2 className="profile-card__email" data-testid="profile-email">{user?.email}</h2>
          </div>
        </section>

        <div className="stat-grid">
          <button
            type="button"
            className="stat-card"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            <HeartIcon size={ 22 } />
            <span className="stat-card__value">{favorites.length}</span>
            <span className="stat-card__label">Saved recipes</span>
          </button>
          <button
            type="button"
            className="stat-card"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            <BadgeCheckIcon size={ 22 } />
            <span className="stat-card__value">{doneRecipes.length}</span>
            <span className="stat-card__label">Completed dishes</span>
          </button>
        </div>

        <button
          type="button"
          className="btn btn--outline btn--block"
          onClick={ handleLogout }
          data-testid="profile-logout-btn"
        >
          Log out
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
