import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ titulo, pesquisaOff = false }) {
  const history = useHistory();
  const [mostrarBarraPesquisa, setMostrarBarraPesquisa] = useState(false);
  return (
    <main className="Header">
      <h1 data-testid="page-title">{ titulo }</h1>
      <div className="headerButton">
        { !pesquisaOff && (
          <button
            type="button"
            onClick={ () => {
              setMostrarBarraPesquisa(!mostrarBarraPesquisa);
            } }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Icone Pesquisa"
            />
          </button>
        ) }
        <button type="button" onClick={ () => { history.push('/profile'); } }>
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Icone Perfil" />
        </button>
      </div>
      {mostrarBarraPesquisa && <SearchBar />}
    </main>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
  pesquisaOff: PropTypes.bool,
};

export default Header;
