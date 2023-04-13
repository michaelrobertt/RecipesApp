import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/AppProvider';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

const startBtnTestId = 'start-recipe-btn';
const pathnameDrink = '/drinks/15997';
describe('Testa a pagina RecipesDetails', () => {
  let history2;
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);

    await act(async () => {
      const { history } = renderWithRouter(
        <AppProvider>
          <App />
        </AppProvider>,
      );
      history2 = history;
    });
  });
  it('Testa se ao clicar em uma imagem em meals é redirecionado pra pagina de detalhes correspondente.', async () => {
    act(() => {
      history2.push('/meals');
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    const fotoComida = screen.getByTestId('0-card-img');
    userEvent.click(fotoComida);

    const { pathname } = history2.location;
    expect(pathname).toBe('/meals/52977');

    await waitFor(() => {
      const comida = screen.getByText(/arrabiata/i);
      expect(comida).toBeInTheDocument();
    });
  });
  it('Testa se ao clicar em uma imagem em drinks é redirecionado pra pagina de detalhes correspondente.', async () => {
    act(() => {
      history2.push('/drinks');
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    const fotoBebida = screen.getByTestId('0-card-img');
    userEvent.click(fotoBebida);

    const { pathname } = history2.location;
    expect(pathname).toBe(pathnameDrink);

    await waitFor(() => {
      const bebida = screen.getAllByText(/gg/i);
      expect(bebida[0]).toBeInTheDocument();
    });
  });
  it('Testa se ao clicar no botão Start Recipe é direcionado para rota /in-progress', async () => {
    act(() => {
      history2.push('/drinks/15997');
    });

    await waitFor(() => {
      expect(screen.getByText(/start recipe/i)).toBeInTheDocument();
    });

    const startRecipeBtn = screen.getByTestId(startBtnTestId);
    userEvent.click(startRecipeBtn);

    const { pathname } = history2.location;
    expect(pathname).toBe('/drinks/15997/in-progress');
  });
  it('Testa o botão Continue Recipe é renderizado quando a receita esta em progresso', async () => {
    const inProgressRecipes = {
      drinks: {
        15997: [
          'Galliano',
        ],
        17222: [
          'Gin',
          'Grand Marnier',
        ],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    act(() => {
      history2.push(pathnameDrink);
    });

    await waitFor(() => {
      const continueRecipeBtn = screen.getAllByTestId(startBtnTestId);
      expect(continueRecipeBtn[1]).toBeInTheDocument();
    });
    const continueRecipeBtn = screen.getByRole('button', { name: /continue recipe/i });
    userEvent.click(continueRecipeBtn);

    const { pathname } = history2.location;
    expect(pathname).toBe('/drinks/15997/in-progress');
  });
  it('Testa se quando a receita é finalizada os botões Start Recipe e Continue Recipe não são renderizados', async () => {
    const doneRecipes = [
      {
        id: '52977',
        type: 'meals',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        doneDate: '13/04/2023',
        tags: [
          'Soup',
        ],
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    act(() => {
      history2.push('/meals/52977');
    });
  });
});
