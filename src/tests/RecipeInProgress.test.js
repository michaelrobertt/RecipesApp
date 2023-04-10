import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import AppProvider from '../context/AppProvider';

describe('Testa o componente InProgress', () => {
  it('Testa se renderiza os elementos corretamente', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/meals/52977/in-progress');
    });

    await waitFor(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    });

    const tituloReceita = screen.getByRole('heading', { name: /corba/i });
    expect(tituloReceita).toBeInTheDocument();

    const compartilharBtn = screen.getByRole('img', { name: /botão compartilhar/i });
    expect(compartilharBtn).toBeInTheDocument();

    const favoritarBtn = screen.getByRole('img', { name: /botão favoritar/i });
    expect(favoritarBtn).toBeInTheDocument();

    const categoriaReceita = screen.getByTestId('recipe-category');
    expect(categoriaReceita).toBeInTheDocument();

    const ingredients = screen.getByRole('heading', { name: /ingredients/i });
    expect(ingredients).toBeInTheDocument();

    const instructions = screen.getByRole('heading', { name: /instructions/i });
    expect(instructions).toBeInTheDocument();

    const finalizarReceitaBtn = screen.getByRole('button', { name: /finalizar receita/i });
    expect(finalizarReceitaBtn).toBeInTheDocument();
  });
});
