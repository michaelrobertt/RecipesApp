import React from 'react';
import PropTypes from 'prop-types';

function RecipeFilters({ categories = [], active = '', onSelect }) {
  return (
    <nav className="chip-row" aria-label="Filter recipes by category">
      <button
        type="button"
        className={ `chip ${active === '' ? 'chip--active' : ''}` }
        aria-pressed={ active === '' }
        data-testid="All-category-filter"
        onClick={ () => onSelect('') }
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={ category }
          type="button"
          className={ `chip ${active === category ? 'chip--active' : ''}` }
          aria-pressed={ active === category }
          data-testid={ `${category}-category-filter` }
          onClick={ () => onSelect(category) }
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

RecipeFilters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  active: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default RecipeFilters;
