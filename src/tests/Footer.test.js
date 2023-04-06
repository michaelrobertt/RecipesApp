import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Teste o componente Footer', () => {
  it('Verifica se é renderizado corretamente', () => {
    renderWithRouter(<Footer />);

    screen.logTestingPlaygroundURL();
    const btnComidas = screen.getByTestId('meals-bottom-btn');
    const btnBebidas = screen.getByTestId('drinks-bottom-btn');

    expect(btnComidas).toBeInTheDocument();
    expect(btnBebidas).toBeInTheDocument();
  });

  it('Verifica se vou para rota "/meals" se clicar no botão de comidas', () => {
    const { history } = renderWithRouter(<Footer />);

    const btnComidas = screen.getByTestId('meals-bottom-btn');
    expect(btnComidas).toBeInTheDocument();

    userEvent.click(btnComidas);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });

  it('Verifica se vou para rota "/drinks" se clicar no botão de bebidas', () => {
    const { history } = renderWithRouter(<Footer />);

    const btnBebidas = screen.getByTestId('drinks-bottom-btn');
    expect(btnBebidas).toBeInTheDocument();

    userEvent.click(btnBebidas);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
});
