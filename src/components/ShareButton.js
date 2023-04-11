import React, { useState } from 'react';
import Copy from 'clipboard-copy';

function ShareButton() {
  const { href } = window.location;
  const [copiado, setCopiado] = useState(false);

  const copiarLink = () => {
    Copy(href);
    setCopiado(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ copiarLink }
      >
        Share
      </button>
      {copiado && <p>Link copied!</p> }
    </div>
  );
}

export default ShareButton;
