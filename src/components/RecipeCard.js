import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { typeToPath } from '../utils/library';
import { HeartIcon } from './icons';

function RecipeCard({ recipe, index = 0 }) {
  const { isFavorite } = useContext(AppContext);
  const favourite = isFavorite(recipe.id);
  const subtitle = recipe.type === 'meal'
    ? [recipe.area, recipe.category].filter(Boolean).join(' · ')
    : [recipe.alcoholic, recipe.category].filter(Boolean).join(' · ');

  return (
    <Link
      to={ `/${typeToPath(recipe.type)}/${recipe.id}` }
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
    >
      <div className="recipe-card__media">
        <img
          src={ recipe.image }
          alt={ recipe.name }
          loading="lazy"
          data-testid={ `${index}-card-img` }
        />
        {favourite ? (
          <span className="recipe-card__badge" title="Saved to favourites">
            <HeartIcon size={ 14 } filled />
          </span>
        ) : null}
      </div>
      <div className="recipe-card__body">
        <p className="recipe-card__name" data-testid={ `${index}-card-name` }>{recipe.name}</p>
        {subtitle ? <p className="recipe-card__meta">{subtitle}</p> : null}
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
    alcoholic: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;
