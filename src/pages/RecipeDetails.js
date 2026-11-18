import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import RecommendationCard from '../components/RecommendationCard';
import Instructions from '../components/Instructions';
import { EmptyState, ErrorState } from '../components/Feedback';
import { BadgeCheckIcon, ClockIcon } from '../components/icons';
import AppContext from '../context/AppContext';
import { STATUS, useRecipe, useRecommendations } from '../hooks/useRecipes';
import { formatDoneDate, formatIngredient, youtubeEmbedUrl } from '../utils/format';
import { typeToPath } from '../utils/library';

function RecipeDetails({ match }) {
  const { id } = match.params;
  const type = match.path.includes('drinks') ? 'drink' : 'meal';
  const { isDone, doneRecipes, getProgress } = useContext(AppContext);
  const history = useHistory();
  const { status, recipe, error, reload } = useRecipe(type, id);
  const recommendations = useRecommendations(type);

  const listPath = `/${typeToPath(type)}`;
  const progress = getProgress(type, id);
  const done = doneRecipes.find((item) => item.id === String(id));

  if (status === STATUS.LOADING) {
    return (
      <div className="page">
        <Header title="Recipe" backTo={ listPath } />
        <main className="page__content">
          <div className="details-skeleton">
            <div className="skeleton details-skeleton__hero" />
            <div className="skeleton skeleton-line skeleton-line--wide" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" />
          </div>
        </main>
      </div>
    );
  }

  if (status === STATUS.ERROR) {
    const notFound = error === 'Recipe not found';
    return (
      <div className="page">
        <Header title="Recipe" backTo={ listPath } />
        <main className="page__content">
          {notFound ? (
            <EmptyState
              title="Recipe not found"
              message="The recipe you are looking for does not exist or was removed."
            >
              <button
                type="button"
                className="btn btn--primary"
                onClick={ () => history.push(listPath) }
              >
                Browse recipes
              </button>
            </EmptyState>
          ) : (
            <ErrorState message={ error } onRetry={ reload } />
          )}
        </main>
      </div>
    );
  }

  const ctaLabel = progress.length > 0 ? 'Continue recipe' : 'Start recipe';

  return (
    <div className="page">
      <Header
        title={ recipe.name }
        backTo={ listPath }
        actions={ (
          <>
            <ShareButton type={ recipe.type } id={ recipe.id } />
            <FavoriteButton recipe={ recipe } />
          </>
        ) }
      />

      <main className="page__content page__content--detail">
        <figure className="hero">
          <img src={ recipe.image } alt={ recipe.name } data-testid="recipe-photo" />
          <figcaption className="hero__caption">
            <h2 className="hero__title" data-testid="recipe-title">{recipe.name}</h2>
            <p className="hero__meta" data-testid="recipe-category">
              {type === 'meal'
                ? [recipe.area, recipe.category].filter(Boolean).join(' · ')
                : [recipe.alcoholic, recipe.category].filter(Boolean).join(' · ')}
            </p>
          </figcaption>
        </figure>

        {done ? (
          <p className="completed-banner" data-testid="recipe-completed">
            <BadgeCheckIcon size={ 20 } />
            You cooked this on
            {' '}
            {formatDoneDate(done.doneDate)}
          </p>
        ) : null}

        <div className="detail-columns">
          <section className="card ingredients" aria-labelledby="ingredients-title">
            <h2 id="ingredients-title" className="section-title">
              Ingredients
              <span className="count-badge">{recipe.ingredients.length}</span>
            </h2>
            <ul className="ingredient-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={ ingredient.name } data-testid={ `${index}-ingredient-name-and-measure` }>
                  <span className="ingredient-list__dot" />
                  <span>{formatIngredient(ingredient)}</span>
                </li>
              ))}
            </ul>
            {progress.length > 0 ? (
              <p className="ingredients__progress">
                <ClockIcon size={ 16 } />
                {progress.length}
                {' of '}
                {recipe.ingredients.length}
                {' '}
                ingredients ticked off
              </p>
            ) : null}
          </section>

          <div className="detail-main">
            <section aria-labelledby="instructions-title">
              <h2 id="instructions-title" className="section-title">Instructions</h2>
              <Instructions text={ recipe.instructions } />
            </section>

            {recipe.tags.length > 0 ? (
              <ul className="tag-list" aria-label="Tags">
                {recipe.tags.map((tag) => <li key={ tag } className="tag">{tag}</li>)}
              </ul>
            ) : null}

            {recipe.youtubeId ? (
              <section className="video-block" aria-labelledby="video-title">
                <h2 id="video-title" className="section-title">Watch how it is made</h2>
                <div className="video-block__frame">
                  <iframe
                    data-testid="video"
                    title={ `${recipe.name} video` }
                    src={ youtubeEmbedUrl(recipe.youtubeId) }
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </section>
            ) : null}
          </div>
        </div>

        <RecommendationCard recipes={ recommendations } />
      </main>

      <div className="cta-bar">
        {isDone(id) ? (
          <p className="cta-bar__done">
            <BadgeCheckIcon size={ 20 } />
            Recipe completed
          </p>
        ) : (
          <button
            type="button"
            className="btn btn--primary btn--block"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`${match.url}/in-progress`) }
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default RecipeDetails;
