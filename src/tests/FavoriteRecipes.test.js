import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];
describe('Testa a pagina Recipes', () => {
  beforeAll(() => {
    window.localStorage.clear(); // limpa o localStorage antes de começar a execução dos testes
  });
  it('Testa se renderiza os elementos corretamente.', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithRouter(<FavoriteRecipes />);

    const titulo = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(titulo).toBeInTheDocument();

    const perfil = screen.getByRole('img', { name: /icone perfil/i });
    expect(perfil).toBeInTheDocument();

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    const foodBtn = screen.getByRole('button', { name: /food/i });
    expect(foodBtn).toBeInTheDocument();

    const drinksBtn = screen.getByRole('button', { name: /drinks/i });
    expect(drinksBtn).toBeInTheDocument();

    const comidaBtn = screen.getByRole('img', { name: /página de comidas/i });
    expect(comidaBtn).toBeInTheDocument();

    const BebidaBtn = screen.getByRole('img', { name: /página de bebidas/i });
    expect(BebidaBtn).toBeInTheDocument();

    const img = screen.getByTestId('0-horizontal-image');
    expect(img).toBeInTheDocument();

    const nomeReceita = screen.getByTestId('0-horizontal-image');
    expect(nomeReceita).toBeInTheDocument();
  });
  it('Testa os botões all.', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithRouter(<FavoriteRecipes />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(allBtn);

    const arrabiata = screen.getByText(/spicy arrabiata penne/i);
    expect(arrabiata).toBeInTheDocument();

    const aquamarine = screen.getByText(/aquamarine/i);
    expect(aquamarine).toBeInTheDocument();
  });
  it('Testa os botões food e drink.', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithRouter(<FavoriteRecipes />);

    const foodBtn = screen.getByRole('button', { name: /food/i });
    userEvent.click(foodBtn);

    expect(screen.queryByText(/aquamarine/i)).not.toBeInTheDocument();

    const drinksBtn = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(drinksBtn);

    expect(screen.queryByText(/arrabiata/i)).not.toBeInTheDocument();
  });
  it('Testa os botão compartilhar meals.', async () => {
    renderWithRouter(<FavoriteRecipes />);
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');

    const compartilharBtn = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(compartilharBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });

  it('Testa os botão compartilhar drinks.', async () => {
    renderWithRouter(<FavoriteRecipes />);
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');

    const compartilharBtn = screen.getByTestId('1-horizontal-share-btn');
    userEvent.click(compartilharBtn);

    const linkCopied = await screen.findAllByText(/link copied!/i);
    expect(linkCopied[0]).toBeInTheDocument();

    setInterval(() => {
      expect(linkCopied).not.toBeInTheDocument();
    }, 3500);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
  });
  it('Testa os botão desfavoritar.', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithRouter(<FavoriteRecipes />);

    const desfavoritarBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(desfavoritarBtn).toBeInTheDocument();
    userEvent.click(desfavoritarBtn);

    expect(screen.queryByText(/arrabiata/i)).not.toBeInTheDocument();

    const desfavoritarBtn2 = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(desfavoritarBtn2);

    expect(screen.queryByText(/aquamarine/i)).not.toBeInTheDocument();
  });
});
