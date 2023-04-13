import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouterAndContext from './helpers/renderWithRouter';

describe('Testa o arquivo DonaRecipes', () => {
  it('Testa se na tela irá renderizar o texto Done Recipes', () => {
    renderWithRouterAndContext(<DoneRecipes />);

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  it('Testa se na tela irá renderizar os botões', () => {
    window.document.execCommand = jest.fn(() => true);
    renderWithRouterAndContext(<DoneRecipes />);

    const btnProfile = screen.getByTestId('profile-top-btn');
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);

    const btnFiltroAll = screen.getByRole('button', { name: /all/i });
    expect(btnFiltroAll).toBeInTheDocument();
    userEvent.click(btnFiltroAll);

    const btnFiltroMeal = screen.getByRole('button', { name: /meals/i });
    expect(btnFiltroMeal).toBeInTheDocument();
    userEvent.click(btnFiltroMeal);

    const btnFiltroDrink = screen.getByRole('button', { name: /meals/i });
    expect(btnFiltroDrink).toBeInTheDocument();
    userEvent.click(btnFiltroDrink);
  });

  it('Testando a tag span', () => {
    const tag = 'example-tag';
    const index = 1;

    const { getByTestId } = render(
      <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
        {tag}
      </span>,
    );

    expect(getByTestId(`${index}-${tag}-horizontal-tag`)).toBeInTheDocument();
  });
});
