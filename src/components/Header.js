import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { ArrowLeftIcon, CloseIcon, LogoMark, SearchIcon, UserIcon } from './icons';

function Header({ title, onSearch = null, backTo = '', actions = null }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const hasSearch = typeof onSearch === 'function';

  const handleSearch = (params) => {
    onSearch(params);
  };

  return (
    <header className="app-header">
      <div className="app-header__bar">
        {backTo ? (
          <Link to={ backTo } className="icon-btn" aria-label="Go back">
            <ArrowLeftIcon size={ 22 } />
          </Link>
        ) : (
          <Link to="/meals" className="brand" aria-label="RecEITA! home">
            <LogoMark size={ 30 } />
            <span className="brand__word">RecEITA!</span>
          </Link>
        )}

        <h1 className="app-header__title" data-testid="page-title">{title}</h1>

        <div className="app-header__actions">
          {actions}
          {hasSearch ? (
            <button
              type="button"
              className="icon-btn"
              aria-label={ searchOpen ? 'Close search' : 'Search recipes' }
              aria-expanded={ searchOpen }
              onClick={ () => setSearchOpen((open) => !open) }
            >
              {searchOpen ? <CloseIcon size={ 22 } /> : <SearchIcon size={ 22 } />}
            </button>
          ) : null}
          <Link to="/profile" className="icon-btn" aria-label="Profile">
            <UserIcon size={ 22 } />
          </Link>
        </div>
      </div>

      {hasSearch && searchOpen ? (
        <div className="app-header__search">
          <SearchBar onSubmit={ handleSearch } />
        </div>
      ) : null}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onSearch: PropTypes.func,
  backTo: PropTypes.string,
  actions: PropTypes.node,
};

export default Header;
