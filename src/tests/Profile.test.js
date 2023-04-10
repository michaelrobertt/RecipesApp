import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import AppProvider from '../context/AppProvider';

// const emailInput = 'email-input';
// const senhaInput = 'password-input';

describe('Testa a página de Profile', () => {
  it('Testa se renderiza os elementos corretamente', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/profile');
    });

    const titulo = screen.getByRole('heading', { name: /profile/i });
    expect(titulo).toBeInTheDocument();

    const iconePerfil = screen.getByRole('img', { name: /icone perfil/i });
    expect(iconePerfil).toBeInTheDocument();

    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
    expect(doneRecipesBtn).toBeInTheDocument();

    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });
    expect(favoriteRecipesBtn).toBeInTheDocument();

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    expect(logoutBtn).toBeInTheDocument();

    const paginaDeComidasLink = screen.getByRole('img', { name: /página de comidas/i });
    expect(paginaDeComidasLink).toBeInTheDocument();

    const paginaDeBebidasLink = screen.getByRole('img', { name: /página de bebidas/i });
    expect(paginaDeBebidasLink).toBeInTheDocument();
  });
  it('Testa se o email logado é exibido corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const botao = screen.getByRole('button');

    userEvent.type(email, 'email@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(botao);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const iconePerfil = screen.getByRole('img', { name: /icone perfil/i });
    userEvent.click(iconePerfil);

    const emailProfile = screen.getByRole('heading', { name: /email@email\.com/i });
    expect(emailProfile).toBeInTheDocument();
  });

  it('Testa o botão Done Recipes', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/profile');
    });

    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(doneRecipesBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  it('Testa o botão Favorite Recipes', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/profile');
    });

    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(favoriteRecipesBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('Testa o botão Logout', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/profile');
    });

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
