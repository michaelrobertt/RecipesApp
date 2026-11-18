import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import copyToClipboard from '../utils/clipboard';
import { formatDoneDate, shareUrl } from '../utils/format';
import { typeToPath } from '../utils/library';
import { HeartIcon, ShareIcon } from './icons';

export function FilterTabs({ value, onChange }) {
  return (
    <div className="filter-tabs" role="group" aria-label="Filter saved recipes">
      <button
        type="button"
        className={ `chip ${value === 'all' ? 'chip--active' : ''}` }
        data-testid="filter-by-all-btn"
        aria-pressed={ value === 'all' }
        onClick={ () => onChange('all') }
      >
        All
      </button>
      <button
        type="button"
        className={ `chip ${value === 'meal' ? 'chip--active' : ''}` }
        data-testid="filter-by-meal-btn"
        aria-pressed={ value === 'meal' }
        onClick={ () => onChange('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        className={ `chip ${value === 'drink' ? 'chip--active' : ''}` }
        data-testid="filter-by-drink-btn"
        aria-pressed={ value === 'drink' }
        onClick={ () => onChange('drink') }
      >
        Drinks
      </button>
    </div>
  );
}

FilterTabs.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function SavedRecipeCard({ entry, index, showDoneDate = false, onRemove = null }) {
  const { notify } = useContext(AppContext);
  const path = `/${typeToPath(entry.type)}/${entry.id}`;

  const share = async () => {
    const copied = await copyToClipboard(shareUrl(entry.type, entry.id));
    notify(copied ? 'Link copied to clipboard' : 'Could not copy the link');
  };

  return (
    <article className="saved-card">
      <Link to={ path } className="saved-card__media" tabIndex={ -1 } aria-hidden="true">
        <img
          src={ entry.image }
          alt={ entry.name }
          loading="lazy"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>

      <div className="saved-card__body">
        <p className="saved-card__meta" data-testid={ `${index}-horizontal-top-text` }>
          {entry.type === 'meal'
            ? [entry.nationality, entry.category].filter(Boolean).join(' · ')
            : entry.alcoholicOrNot}
        </p>
        <Link to={ path } className="saved-card__name" data-testid={ `${index}-horizontal-name` }>
          {entry.name}
        </Link>
        {showDoneDate && entry.doneDate ? (
          <p className="saved-card__date" data-testid={ `${index}-horizontal-done-date` }>
            Cooked on
            {' '}
            {formatDoneDate(entry.doneDate)}
          </p>
        ) : null}
        {entry.tags.length > 0 ? (
          <ul className="tag-list" aria-label="Tags">
            {entry.tags.map((tag) => (
              <li key={ tag } className="tag" data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="saved-card__actions">
        <button
          type="button"
          className="icon-btn"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ share }
          aria-label={ `Share ${entry.name}` }
        >
          <ShareIcon size={ 18 } />
        </button>
        {onRemove ? (
          <button
            type="button"
            className="icon-btn icon-btn--danger"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => onRemove(entry) }
            aria-label={ `Remove ${entry.name} from favourites` }
          >
            <HeartIcon size={ 20 } filled />
          </button>
        ) : null}
      </div>
    </article>
  );
}

SavedRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    doneDate: PropTypes.string,
  }).isRequired,
  showDoneDate: PropTypes.bool,
  onRemove: PropTypes.func,
};

export default SavedRecipeCard;
