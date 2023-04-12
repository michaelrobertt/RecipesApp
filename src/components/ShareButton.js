import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const { href } = window.location;
  const [copiado, setCopiado] = useState(false);
  const location = useLocation();

  const copiarLink = () => {
    if (location.pathname.includes('in-progress')) {
      const link = href.split('/in-progress')[0];
      Copy(link);
      setCopiado(true);
    }
    Copy(href);
    setCopiado(true);
  };

  return (
    <div>
      <button
        className="recipe-btns"
        type="button"
        data-testid="share-btn"
        onClick={ copiarLink }
      >
        <img src={ shareIcon } alt="Share button" />
      </button>
      {copiado && <p>Link copied!</p> }
    </div>
  );
}

export default ShareButton;
