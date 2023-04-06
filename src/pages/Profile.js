import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  const funcaoLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    const userSalvo = localStorage.getItem('user');
    const emailObject = JSON.parse(userSalvo);
    const emailSalvo = emailObject.email;
    setEmail(emailSalvo);
  }, []);

  return (
    <div>
      <Header pesquisaOff titulo="Profile" />
      <h2 data-testid="profile-email">{`${email}`}</h2>
      <button
        onClick={ () => history.push('/done-recipes') }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        onClick={ () => history.push('/favorite-recipes') }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        onClick={ funcaoLogout }
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
