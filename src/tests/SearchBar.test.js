import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import SearchBar from '../components/SearchBar';
import meals from '../../cypress/mocks/meals';
import AppProvider from '../context/AppProvider';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import soupMeals from '../../cypress/mocks/soupMeals';
import oneMeal from '../../cypress/mocks/oneMeal';
import milkDrinks from '../../cypress/mocks/milkDrinks';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import drinks from '../../cypress/mocks/drinks';
import oneDrink from '../../cypress/mocks/oneDrink';

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
  it('Testa a funcionalidade da pesquisa por ingrediente de comida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        chickenMeals,
      ),
    });
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

    const inoutDeBusca = screen.getByTestId('search-input');
    const ingredienteBusca = screen.getByTestId('ingredient-search-radio');
    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(inoutDeBusca, 'chicken');
    fireEvent.click(ingredienteBusca);
    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('1-card-img')).toBeInTheDocument();
    });

    const nomeComida = screen.getByTestId('1-card-name');
    expect(nomeComida).toBeInTheDocument();
  });
  it('Testa a funcionalidade da pesquisa por nome de comida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        soupMeals,
      ),
    });
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

    userEvent.type(inoutDeBusca, 'soup');
    userEvent.click(nomeBusca);
    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('0-card-img')).toBeInTheDocument();
    });
  });
  it('Testa a funcionalidade da pesquisa pela primeira letra da comida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        meals,
      ),
    });
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
    const letraBusca = screen.getByText(/primeira letra/i);
    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(inoutDeBusca, 'a');
    userEvent.click(letraBusca);
    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('1-card-img')).toBeInTheDocument();
    });
  });
  it.only('Testa se ao digitar 2 letras e selecionar a opção de primeira letra recebemos um erro', async () => {
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
    const letraBusca = screen.getByText(/primeira letra/i);
    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });

    fireEvent.change(inoutDeBusca, { target: { value: '' } });
    // userEvent.type(inoutDeBusca, 'aa');
    userEvent.click(letraBusca);
    userEvent.click(botaoBusca);
    // screen.logTestingPlaygroundURL();

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
      expect(savedAlertMessage).toBe('Your search must have only 1 (one) character');
    });
  });
  it('Testa a funcionalidade quando a resposta é apenas uma comida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        oneMeal,
      ),
    });
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
    userEvent.type(inoutDeBusca, /arrabiata/i);

    const nomeBusca = screen.getByTestId('name-search-radio');
    userEvent.click(nomeBusca);

    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });
    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });
  it('Testa a funcionalidade da pesquisa por ingrediente de bebida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        milkDrinks,
      ),
    });
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

    const inoutDeBusca = screen.getByTestId('search-input');
    const ingredienteBusca = screen.getByTestId('ingredient-search-radio');
    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(inoutDeBusca, 'milk');
    fireEvent.click(ingredienteBusca);
    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('2-card-img')).toBeInTheDocument();
    });
  });
  it('Testa a funcionalidade da pesquisa por nome da bebida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        ginDrinks,
      ),
    });
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
    const nomeBusca = screen.getByRole('radio', { name: /nome/i });
    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(inoutDeBusca, 'gin');
    userEvent.click(nomeBusca);
    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('0-card-img')).toBeInTheDocument();
    });
  });
  it('Testa a funcionalidade da pesquisa pela primeira letra da bebida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        drinks,
      ),
    });
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
    const letraBusca = screen.getByText(/primeira letra/i);
    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(inoutDeBusca, 'a');
    userEvent.click(letraBusca);
    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('3-card-img')).toBeInTheDocument();
    });
  });
  it('Testa a funcionalidade quando a resposta é apenas uma comida', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        oneDrink,
      ),
    });
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
    userEvent.type(inoutDeBusca, /aquamarine/i);

    const nomeBusca = screen.getByTestId('name-search-radio');
    userEvent.click(nomeBusca);

    const botaoBusca = screen.getByRole('button', { name: /pesquisar/i });
    userEvent.click(botaoBusca);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });
});
