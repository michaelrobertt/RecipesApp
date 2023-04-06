import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import AppProvider from '../context/AppProvider';

describe('Teste as mensagens de alerta', () => {
  it('Testa se ao digitar 2 letras e selecionar a opção de primeira letra recebemos um erro ao pesquisar bebida', async () => {
    let savedAlertMessage;
    const alertMock = jest.fn().mockImplementation((message) => {
      savedAlertMessage = message;
    });
    global.alert = alertMock;
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const iconePesquisa = screen.getByRole('img', { name: /icone pesquisa/i });
    userEvent.click(iconePesquisa);

    const inoutDeBusca = screen.getByRole('textbox');
    userEvent.type(inoutDeBusca, 'aa');
    const letraBusca = screen.getByText(/primeira letra/i);
    userEvent.click(letraBusca);
    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });
    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
      expect(savedAlertMessage).toBe('Your search must have only 1 (one) character');
    });
    alertMock.mockClear();
  });
  it('Testa se ao digitar 2 letras e selecionar a opção de primeira letra recebemos um erro ao pesquisar comida', async () => {
    let savedAlertMessage;
    const alertMock = jest.fn().mockImplementation((message) => {
      savedAlertMessage = message;
    });
    global.alert = alertMock;
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const iconePesquisa = screen.getByRole('img', { name: /icone pesquisa/i });
    userEvent.click(iconePesquisa);

    const inoutDeBusca = screen.getByRole('textbox');
    userEvent.type(inoutDeBusca, 'aa');
    const letraBusca = screen.getByText(/primeira letra/i);
    userEvent.click(letraBusca);
    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });
    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
      expect(savedAlertMessage).toBe('Your search must have only 1 (one) character');
    });
    alertMock.mockClear();
  });
});
