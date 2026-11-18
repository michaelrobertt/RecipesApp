import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import copyToClipboard from '../utils/clipboard';
import { shareUrl } from '../utils/format';
import { ShareIcon } from './icons';

function ShareButton({ type, id, withLabel = false }) {
  const { notify } = useContext(AppContext);

  const handleShare = async () => {
    const copied = await copyToClipboard(shareUrl(type, id));
    notify(copied ? 'Link copied to clipboard' : 'Could not copy the link');
  };

  return (
    <button
      type="button"
      className="icon-btn"
      data-testid="share-btn"
      onClick={ handleShare }
      aria-label="Share recipe link"
      title="Share recipe link"
    >
      <ShareIcon size={ 20 } />
      {withLabel ? <span>Share</span> : null}
    </button>
  );
}

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  withLabel: PropTypes.bool,
};

export default ShareButton;
