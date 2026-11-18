import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

export function Toast() {
  const { toast } = useContext(AppContext);
  return (
    <div className="toast-region" aria-live="polite" aria-atomic="true">
      {toast ? <div className="toast" role="status">{toast}</div> : null}
    </div>
  );
}

export function EmptyState({ icon = null, title, message = '', children = null }) {
  return (
    <div className="empty-state">
      {icon ? <div className="empty-state__icon">{icon}</div> : null}
      <h2>{title}</h2>
      {message ? <p>{message}</p> : null}
      {children}
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  children: PropTypes.node,
};

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="recipe-grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="skeleton-card" key={ `skeleton-${index}` }>
          <div className="skeleton skeleton-card__media" />
          <div className="skeleton-card__body">
            <div className="skeleton skeleton-line skeleton-line--wide" />
            <div className="skeleton skeleton-line" />
          </div>
        </div>
      ))}
    </div>
  );
}

SkeletonGrid.propTypes = { count: PropTypes.number };

export function ErrorState({ message = '', onRetry }) {
  return (
    <EmptyState
      title="Something went wrong"
      message={ message || 'We could not reach the recipes API. Check your connection and try again.' }
    >
      <button type="button" className="btn btn--primary" onClick={ onRetry }>
        Try again
      </button>
    </EmptyState>
  );
}

ErrorState.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default Toast;
