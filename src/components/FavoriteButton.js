import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import { HeartIcon } from './icons';

function FavoriteButton({ recipe, withLabel = false }) {
  const { isFavorite, toggleFavorite } = useContext(AppContext);
  const saved = isFavorite(recipe.id);

  return (
    <button
      type="button"
      className={ `icon-btn ${saved ? 'icon-btn--danger' : ''}` }
      data-testid="favorite-btn"
      onClick={ () => toggleFavorite(recipe) }
      aria-pressed={ saved }
      aria-label={ saved ? 'Remove from favourites' : 'Save to favourites' }
      title={ saved ? 'Remove from favourites' : 'Save to favourites' }
    >
      <HeartIcon size={ 22 } filled={ saved } />
      {withLabel ? <span>{saved ? 'Saved' : 'Save'}</span> : null}
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  withLabel: PropTypes.bool,
};

export default FavoriteButton;
