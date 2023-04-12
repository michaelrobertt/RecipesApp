import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/AppProvider';
import Recipes from '../pages/Recipes';
import fetch from '../../cypress/mocks/fetch';

describe('Testa a pagina Recipes', () => {
  let history2;
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);

    await act(async () => {
      const { history } = renderWithRouter(
        <AppProvider>
          <Recipes />
        </AppProvider>,
      );
      history2 = history;
    });
  });
  it('Testa se renderiza os elementos corretamente da rota /meals.', async () => {
    act(() => {
      history2.push('/meals');
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
    const titulo = screen.getByRole('heading', { name: /meals/i });
    expect(titulo).toBeInTheDocument();

    const perfil = screen.getByRole('img', { name: /icone perfil/i });
    expect(perfil).toBeInTheDocument();

    const pesquisa = screen.getByRole('img', { name: /icone pesquisa/i });
    expect(pesquisa).toBeInTheDocument();

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    const beffBtn = screen.getByRole('button', { name: /beef/i });
    expect(beffBtn).toBeInTheDocument();

    const breakfastBtn = screen.getByRole('button', { name: /breakfast/i });
    expect(breakfastBtn).toBeInTheDocument();

    const chickenBtn = screen.getByRole('button', { name: /chicken/i });
    expect(chickenBtn).toBeInTheDocument();

    const dessertBtn = screen.getByRole('button', { name: /dessert/i });
    expect(dessertBtn).toBeInTheDocument();

    const goatBtn = screen.getByRole('button', { name: /goat/i });
    expect(goatBtn).toBeInTheDocument();
  });
  it('Testa se renderiza os elementos corretamente da rota /drinks.', async () => {
    act(() => {
      history2.push('/drinks');
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
    const titulo = screen.getByRole('heading', { name: /drinks/i });
    expect(titulo).toBeInTheDocument();

    const perfil = screen.getByRole('img', { name: /icone perfil/i });
    expect(perfil).toBeInTheDocument();

    const pesquisa = screen.getByRole('img', { name: /icone pesquisa/i });
    expect(pesquisa).toBeInTheDocument();

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    const ordinaryDrinkBtn = screen.getByRole('button', { name: /ordinary drink/i });
    expect(ordinaryDrinkBtn).toBeInTheDocument();

    const cocktailBtn = screen.getByRole('button', { name: /cocktail/i });
    expect(cocktailBtn).toBeInTheDocument();

    const shakeBtn = screen.getByRole('button', { name: /shake/i });
    expect(shakeBtn).toBeInTheDocument();

    const outherUnknownBtn = screen.getByRole('button', { name: /other\/unknown/i });
    expect(outherUnknownBtn).toBeInTheDocument();

    const cocoaBtn = screen.getByRole('button', { name: /cocoa/i });
    expect(cocoaBtn).toBeInTheDocument();
  });
});
