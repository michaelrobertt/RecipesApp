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
    const emailSalvo = emailObject?.email ?? '';
    setEmail(emailSalvo);
  }, []);

  return (
    <div className="profile">
      <Header pesquisaOff titulo="Profile" />
      <div className="profile-itens">
        <h4>Bem vindo,</h4>
        <h2 data-testid="profile-email">{`${email}`}</h2>
        <button
          className="profile-btn"
          onClick={ () => history.push('/done-recipes') }
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          className="profile-btn"
          onClick={ () => history.push('/favorite-recipes') }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          className="profile-btn-logout"
          onClick={ funcaoLogout }
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
