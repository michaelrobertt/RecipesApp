import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import AppProvider from '../context/AppProvider';

const alerta = 'Sorry, we haven\'t found any recipes for these filters.';
describe('teste teste teste', () => {
  it('Testa se é lançado um alerta se não for encontrado nenhuma bebida', async () => {
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
    userEvent.type(inoutDeBusca, 'xablau');

    const nomeBusca = screen.getByRole('radio', { name: /nome/i });
    userEvent.click(nomeBusca);

    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });
    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
      expect(savedAlertMessage).toBe(alerta);
    });
    alertMock.mockClear();
  });
  it('Testa se é lançado um alerta se não for encontrado nenhuma comida', async () => {
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
    const nomeBusca = screen.getByRole('radio', { name: /nome/i });
    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(inoutDeBusca, 'xablau');
    userEvent.click(nomeBusca);
    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
      expect(savedAlertMessage).toBe(alerta);
    });
    alertMock.mockClear();
  });
  it('Testa se ao não digitar nada em meals é lançado um alerta', async () => {
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

    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
      expect(savedAlertMessage).toBe(alerta);
    });
    alertMock.mockClear();
  });
  it('Testa se ao não digitar nada em drink é lançado um alerta', async () => {
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

    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
      expect(savedAlertMessage).toBe(alerta);
    });
    alertMock.mockClear();
  });
});
