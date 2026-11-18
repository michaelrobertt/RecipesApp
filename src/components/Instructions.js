import React from 'react';
import PropTypes from 'prop-types';

export const toParagraphs = (text) => (text || '')
  .split(/\r?\n+/)
  .map((line) => line.trim())
  .filter(Boolean);

function Instructions({ text = '', testId = 'instructions' }) {
  const paragraphs = toParagraphs(text);

  return (
    <div className="instructions" data-testid={ testId }>
      {paragraphs.length > 0
        ? paragraphs.map((paragraph, index) => (
          <p key={ `${index}-${paragraph.slice(0, 16)}` }>{paragraph}</p>
        ))
        : <p>No instructions were provided for this recipe.</p>}
    </div>
  );
}

Instructions.propTypes = {
  text: PropTypes.string,
  testId: PropTypes.string,
};

export default Instructions;
