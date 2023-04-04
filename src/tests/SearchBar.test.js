import React from 'react';
import { screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
// import App from '../App';
import SearchBar from '../components/SearchBar';

describe('Teste o componente SearchBar', () => {
  it('Verifica se é renderizado corretamente', () => {
    renderWithRouter(<SearchBar />);

    const inoutDeBusca = screen.getByRole('textbox');
    const ingredienteBusca = screen.getByRole('radio', { name: /ingrediente/i });
    const nomeBusca = screen.getByRole('radio', { name: /nome/i });
    const letraBusca = screen.getByText(/primeira letra/i);
    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });

    expect(inoutDeBusca).toBeInTheDocument();
    expect(ingredienteBusca).toBeInTheDocument();
    expect(nomeBusca).toBeInTheDocument();
    expect(letraBusca).toBeInTheDocument();
    expect(botaoBusca).toBeInTheDocument();
  });
});
