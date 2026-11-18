import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import Instructions from '../components/Instructions';
import { EmptyState, ErrorState } from '../components/Feedback';
import { CheckIcon, ClockIcon } from '../components/icons';
import AppContext from '../context/AppContext';
import { STATUS, useRecipe } from '../hooks/useRecipes';
import { formatIngredient } from '../utils/format';
import { typeToPath } from '../utils/library';

function RecipeInProgress({ match }) {
  const { id } = match.params;
  const type = match.path.includes('drinks') ? 'drink' : 'meal';
  const {
    getProgress, updateProgress, clearProgress, addDoneRecipe,
  } = useContext(AppContext);
  const history = useHistory();
  const { status, recipe, error, reload } = useRecipe(type, id);

  const checkedIngredients = getProgress(type, id);

  const percent = useMemo(() => {
    if (!recipe || recipe.ingredients.length === 0) return 0;
    return Math.round((checkedIngredients.length / recipe.ingredients.length) * 100);
  }, [checkedIngredients.length, recipe]);

  const listPath = `/${typeToPath(type)}`;
  const allChecked = Boolean(recipe)
    && recipe.ingredients.length > 0
    && checkedIngredients.length === recipe.ingredients.length;

  const toggleIngredient = (name) => {
    const next = checkedIngredients.includes(name)
      ? checkedIngredients.filter((item) => item !== name)
      : [...checkedIngredients, name];
    updateProgress(type, id, next);
  };

  const finishRecipe = () => {
    if (!allChecked) return;
    addDoneRecipe(recipe);
    clearProgress(type, id);
    history.push('/done-recipes');
  };

  if (status === STATUS.LOADING) {
    return (
      <div className="page">
        <Header title="Cooking" backTo={ listPath } />
        <main className="page__content">
          <div className="skeleton skeleton-line skeleton-line--wide" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
        </main>
      </div>
    );
  }

  if (status === STATUS.ERROR) {
    return (
      <div className="page">
        <Header title="Cooking" backTo={ listPath } />
        <main className="page__content">
          {error === 'Recipe not found' ? (
            <EmptyState title="Recipe not found" message="It may have been removed." />
          ) : (
            <ErrorState message={ error } onRetry={ reload } />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header
        title={ recipe.name }
        backTo={ `${listPath}/${recipe.id}` }
        actions={ (
          <>
            <ShareButton type={ recipe.type } id={ recipe.id } />
            <FavoriteButton recipe={ recipe } />
          </>
        ) }
      />

      <main className="page__content page__content--detail">
        <div className="cooking-head">
          <img className="cooking-head__thumb" src={ recipe.image } alt={ recipe.name } />
          <div>
            <h2 className="cooking-head__title" data-testid="recipe-title">{recipe.name}</h2>
            <p className="cooking-head__meta" data-testid="recipe-category">
              {type === 'meal' ? recipe.category : [recipe.alcoholic, recipe.category]
                .filter(Boolean).join(' · ')}
            </p>
          </div>
        </div>

        <section className="card" aria-labelledby="progress-title">
          <div className="progress-head">
            <h2 id="progress-title" className="section-title">Your progress</h2>
            <span className="progress-head__count">
              {checkedIngredients.length}
              /
              {recipe.ingredients.length}
            </span>
          </div>
          <div
            className="progress"
            role="progressbar"
            aria-valuenow={ percent }
            aria-valuemin={ 0 }
            aria-valuemax={ 100 }
            aria-label="Ingredients ticked off"
          >
            <div className="progress__bar" style={ { width: `${percent}%` } } />
          </div>

          <ul className="checklist">
            {recipe.ingredients.map((ingredient, index) => {
              const checked = checkedIngredients.includes(ingredient.name);
              const inputId = `ingredient-${index}`;
              return (
                <li key={ ingredient.name }>
                  <label
                    className={ `checklist__item ${checked ? 'checklist__item--done' : ''}` }
                    htmlFor={ inputId }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      id={ inputId }
                      type="checkbox"
                      checked={ checked }
                      onChange={ () => toggleIngredient(ingredient.name) }
                    />
                    <span className="checklist__box" aria-hidden="true">
                      <CheckIcon size={ 14 } />
                    </span>
                    <span className="checklist__label">{formatIngredient(ingredient)}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="steps-title">
          <h2 id="steps-title" className="section-title">Instructions</h2>
          <Instructions text={ recipe.instructions } />
        </section>
      </main>

      <div className="cta-bar">
        {!allChecked ? (
          <p className="cta-bar__hint">
            <ClockIcon size={ 16 } />
            Tick every ingredient to finish the recipe
          </p>
        ) : null}
        <button
          type="button"
          className="btn btn--primary btn--block"
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
          disabled={ !allChecked }
        >
          Finish recipe
        </button>
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default RecipeInProgress;
