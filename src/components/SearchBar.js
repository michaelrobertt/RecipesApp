import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from './icons';

export const SEARCH_MODES = [
  { id: 'ingredient', label: 'Ingredient' },
  { id: 'name', label: 'Name' },
  { id: 'first-letter', label: 'First letter' },
];

export const SEARCH_TEST_IDS = {
  ingredient: 'ingredient-search-radio',
  name: 'name-search-radio',
  'first-letter': 'first-letter-search-radio',
};

function SearchBar({ onSubmit, placeholder = 'Search recipes…', autoFocus = true }) {
  const [mode, setMode] = useState('ingredient');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const term = query.trim();

    if (!term) {
      setError('Type something to search.');
      return;
    }
    if (mode === 'first-letter' && term.length !== 1) {
      setError('A first-letter search needs exactly one character.');
      return;
    }

    setError('');
    onSubmit({ mode, query: term });
  };

  return (
    <form className="search-bar" onSubmit={ handleSubmit } role="search">
      <div className="search-bar__field">
        <SearchIcon size={ 18 } className="search-bar__icon" />
        <input
          type="search"
          data-testid="search-input"
          name="query"
          value={ query }
          onChange={ (event) => setQuery(event.target.value) }
          placeholder={ placeholder }
          aria-label="Search recipes"
          autoFocus={ autoFocus }
          autoComplete="off"
        />
        <button type="submit" className="btn btn--primary btn--sm" data-testid="exec-search-btn">
          Search
        </button>
      </div>

      <fieldset className="search-bar__modes">
        <legend className="visually-hidden">Search by</legend>
        {SEARCH_MODES.map((option) => (
          <label
            key={ option.id }
            className={ `pill ${mode === option.id ? 'pill--active' : ''}` }
            htmlFor={ `search-mode-${option.id}` }
          >
            <input
              type="radio"
              id={ `search-mode-${option.id}` }
              name="search-mode"
              value={ option.id }
              data-testid={ SEARCH_TEST_IDS[option.id] }
              checked={ mode === option.id }
              onChange={ () => {
                setMode(option.id);
                setError('');
              } }
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      {error ? <p className="form-error" role="alert">{error}</p> : null}
    </form>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default SearchBar;
