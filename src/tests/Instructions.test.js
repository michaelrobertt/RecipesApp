import React from 'react';
import { render, screen } from '@testing-library/react';
import Instructions, { toParagraphs } from '../components/Instructions';

describe('Instructions', () => {
  it('splits the plain-text instructions into paragraphs', () => {
    expect(toParagraphs('One.\r\n\r\nTwo.\nThree.')).toEqual(['One.', 'Two.', 'Three.']);
    expect(toParagraphs('')).toEqual([]);
    expect(toParagraphs(undefined)).toEqual([]);
  });

  it('renders one paragraph per step', () => {
    render(<Instructions text={ 'Boil the pasta.\nMake the sauce.\nServe.' } />);

    expect(screen.getByText('Boil the pasta.')).toBeInTheDocument();
    expect(screen.getByText('Make the sauce.')).toBeInTheDocument();
    expect(screen.getByText('Serve.')).toBeInTheDocument();
  });

  it('has a fallback when the recipe has no instructions', () => {
    render(<Instructions text="" />);

    expect(screen.getByTestId('instructions')).toHaveTextContent(/no instructions/i);
  });
});
