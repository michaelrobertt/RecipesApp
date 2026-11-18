import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RecipeFilters from './RecipeFilters';
import RecipeCard from './RecipeCard';
import { EmptyState, ErrorState, SkeletonGrid } from './Feedback';
import { SparklesIcon } from './icons';
import { STATUS, useRecipeList } from '../hooks/useRecipes';
import { getRandomRecipe } from '../services/recipesApi';
import { typeToPath } from '../utils/library';
import AppContext from '../context/AppContext';

function RecipeBrowser({ type }) {
  const { notify } = useContext(AppContext);
  const history = useHistory();
  const [picking, setPicking] = useState(false);
  const {
    recipes, categories, activeCategory, status, error, query, search, selectCategory, reload,
  } = useRecipeList(type);

  const isMeal = type === 'meal';
  const title = isMeal ? 'Meals' : 'Drinks';

  const surpriseMe = useCallback(async () => {
    setPicking(true);
    try {
      const recipe = await getRandomRecipe(type);
      history.push(`/${typeToPath(type)}/${recipe.id}`);
    } catch (requestError) {
      notify('Could not pick a random recipe. Please try again.');
    } finally {
      setPicking(false);
    }
  }, [history, notify, type]);

  const resultsLabel = (() => {
    if (status === STATUS.LOADING) return 'Loading recipes…';
    if (query) return `Results for “${query.query}”`;
    if (activeCategory) return `${activeCategory} ${isMeal ? 'meals' : 'drinks'}`;
    return isMeal ? 'Popular meals right now' : 'Popular drinks right now';
  })();

  return (
    <div className="page">
      <Header title={ title } onSearch={ search } />

      <main className="page__content">
        <RecipeFilters
          categories={ categories }
          active={ activeCategory }
          onSelect={ selectCategory }
        />

        <div className="page__toolbar">
          <p className="results-line" role="status">{resultsLabel}</p>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={ surpriseMe }
            disabled={ picking }
          >
            <SparklesIcon size={ 16 } />
            {picking ? 'Picking…' : 'Surprise me'}
          </button>
        </div>

        {status === STATUS.LOADING ? <SkeletonGrid /> : null}

        {status === STATUS.ERROR ? <ErrorState message={ error } onRetry={ reload } /> : null}

        {status === STATUS.EMPTY ? (
          <EmptyState
            title="No recipes found"
            message={ query
              ? `Nothing matched “${query.query}”. Try another term or browse a category.`
              : 'This category is empty right now.' }
          >
            <button type="button" className="btn btn--primary" onClick={ reload }>
              Back to all {isMeal ? 'meals' : 'drinks'}
            </button>
          </EmptyState>
        ) : null}

        {status === STATUS.READY ? (
          <div className="recipe-grid">
            {recipes.map((recipe, index) => (
              <RecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
            ))}
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}

RecipeBrowser.propTypes = {
  type: PropTypes.oneOf(['meal', 'drink']).isRequired,
};

export default RecipeBrowser;
