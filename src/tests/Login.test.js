import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const emailInput = 'email-input';
const senhaInput = 'password-input';

describe('Testa a página de Login', () => {
  it('Testa se renderiza os elementos corretamente', () => {
    renderWithRouter(<App />);

    const titulo = screen.getByRole('heading', { level: 1 });
    const email = screen.getByTestId(emailInput);
    const senha = screen.getByTestId(senhaInput);
    const botao = screen.getByRole('button');

    expect(titulo).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(botao).toBeInTheDocument();
  });

  it('Testa se o botão está desabilitado até o email e senha estarem corretos', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(emailInput);
    const senha = screen.getByTestId(senhaInput);
    const botao = screen.getByRole('button');

    expect(botao).toBeDisabled();

    userEvent.type(email, 'email@email.com');
    userEvent.type(senha, '1234567');

    expect(botao).not.toBeDisabled();
  });

  it('Testa se o botão envia o usuario para a rota /meals', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(emailInput);
    const senha = screen.getByTestId(senhaInput);
    const botao = screen.getByRole('button');

    userEvent.type(email, 'email@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(botao);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
