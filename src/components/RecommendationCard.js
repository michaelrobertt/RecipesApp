import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { typeToPath } from '../utils/library';

function RecommendationCard({ recipes = [] }) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <section className="recommendations" aria-labelledby="recommendations-title">
      <h2 id="recommendations-title" className="section-title">You may also like</h2>
      <div className="scroller">
        {recipes.map((recipe, index) => (
          <Link
            key={ recipe.id }
            to={ `/${typeToPath(recipe.type)}/${recipe.id}` }
            className="recommendation"
            data-testid={ `${index}-recommendation-card` }
          >
            <img src={ recipe.image } alt={ recipe.name } loading="lazy" />
            <p data-testid={ `${index}-recommendation-title` }>{recipe.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

RecommendationCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    type: PropTypes.string,
  })),
};

export default RecommendationCard;
