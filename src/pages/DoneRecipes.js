import React, { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SavedRecipeCard, { FilterTabs } from '../components/SavedRecipeCard';
import { EmptyState } from '../components/Feedback';
import { BadgeCheckIcon } from '../components/icons';
import AppContext from '../context/AppContext';

function DoneRecipes() {
  const { doneRecipes } = useContext(AppContext);
  const history = useHistory();
  const [filter, setFilter] = useState('all');

  const visible = useMemo(() => [...doneRecipes]
    .sort((a, b) => new Date(b.doneDate) - new Date(a.doneDate))
    .filter((entry) => filter === 'all' || entry.type === filter), [doneRecipes, filter]);

  return (
    <div className="page">
      <Header title="Completed dishes" backTo="/meals" />
      <main className="page__content">
        <FilterTabs value={ filter } onChange={ setFilter } />

        <p className="results-line" role="status">
          {visible.length}
          {visible.length === 1 ? ' dish cooked' : ' dishes cooked'}
        </p>

        {visible.length === 0 ? (
          <EmptyState
            icon={ <BadgeCheckIcon size={ 34 } /> }
            title="No finished dishes yet"
            message="Open a recipe, tick off every ingredient and press “Finish recipe” to see it here."
          >
            <button
              type="button"
              className="btn btn--primary"
              onClick={ () => history.push('/meals') }
            >
              Find something to cook
            </button>
          </EmptyState>
        ) : (
          <div className="saved-list">
            {visible.map((entry, index) => (
              <SavedRecipeCard
                key={ entry.id }
                entry={ entry }
                index={ index }
                showDoneDate
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
