import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ titulo, pesquisaOff }) {
  const history = useHistory();
  return (
    <main>
      <h1 data-testid="page-title">{ titulo }</h1>
      <button type="button" onClick={ history.push('/profile') }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Icone Perfil" />
      </button>
      { !pesquisaOff && (<img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Icone Pesquisa"
      />) }
    </main>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
  pesquisaOff: PropTypes.bool.isRequired,
};

export default Header;
