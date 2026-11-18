import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Header from '../components/Header';

const user = userEvent.setup();

describe('Header', () => {
  it('shows the page title and the profile link', () => {
    renderWithRouter(<Header title="Meals" />, { withProvider: false });

    expect(screen.getByTestId('page-title')).toHaveTextContent('Meals');
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('href', '/profile');
    expect(screen.queryByRole('button', { name: /search recipes/i })).not.toBeInTheDocument();
  });

  it('renders a back link instead of the brand when a destination is given', () => {
    renderWithRouter(<Header title="Recipe" backTo="/drinks" />, { withProvider: false });

    expect(screen.getByRole('link', { name: /go back/i })).toHaveAttribute('href', '/drinks');
  });

  it('opens the search panel only when a search handler exists', async () => {
    const onSearch = jest.fn();
    renderWithRouter(<Header title="Meals" onSearch={ onSearch } />, { withProvider: false });

    await user.click(screen.getByRole('button', { name: /search recipes/i }));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    await user.type(screen.getByTestId('search-input'), 'chicken');
    await user.click(screen.getByRole('radio', { name: 'Name' }));
    await user.click(screen.getByTestId('exec-search-btn'));

    expect(onSearch).toHaveBeenCalledWith({ mode: 'name', query: 'chicken' });
  });
});
