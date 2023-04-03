import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ titulo, pesquisaOff }) {
  return (
    <main>
      <h1 data-testid="page-title">{ titulo }</h1>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="Icone Perfil" />
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
