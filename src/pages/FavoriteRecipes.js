import React, { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SavedRecipeCard, { FilterTabs } from '../components/SavedRecipeCard';
import { EmptyState } from '../components/Feedback';
import { HeartIcon } from '../components/icons';
import AppContext from '../context/AppContext';

function FavoriteRecipes() {
  const { favorites, toggleFavorite } = useContext(AppContext);
  const history = useHistory();
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => favorites.filter((entry) => filter === 'all' || entry.type === filter),
    [favorites, filter],
  );

  return (
    <div className="page">
      <Header title="Saved recipes" backTo="/meals" />
      <main className="page__content">
        <FilterTabs value={ filter } onChange={ setFilter } />

        <p className="results-line" role="status">
          {visible.length}
          {visible.length === 1 ? ' recipe saved' : ' recipes saved'}
        </p>

        {visible.length === 0 ? (
          <EmptyState
            icon={ <HeartIcon size={ 34 } /> }
            title={ favorites.length === 0 ? 'No favourites yet' : 'Nothing in this filter' }
            message="Tap the heart on any recipe to keep it here."
          >
            <button
              type="button"
              className="btn btn--primary"
              onClick={ () => history.push('/meals') }
            >
              Browse recipes
            </button>
          </EmptyState>
        ) : (
          <div className="saved-list">
            {visible.map((entry, index) => (
              <SavedRecipeCard
                key={ entry.id }
                entry={ entry }
                index={ index }
                onRemove={ (recipe) => toggleFavorite(recipe) }
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
