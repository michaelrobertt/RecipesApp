import { renderApp, setUpTest, screen, signIn, userEvent } from './helpers/renderWithRouter';

const user = userEvent.setup();

const favourites = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://cdn.test/arrabiata.jpg',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://cdn.test/gg.jpg',
  },
];

const seed = () => {
  signIn();
  localStorage.setItem('favoriteRecipes', JSON.stringify(favourites));
};

describe('Saved recipes', () => {
  setUpTest();

  it('redirects anonymous visitors to the login page', () => {
    const { history } = renderApp('/favorite-recipes');

    expect(history.location.pathname).toBe('/');
    expect(screen.getByRole('heading', { level: 1, name: /welcome back/i })).toBeInTheDocument();
  });

  it('lists the saved meals and drinks', () => {
    seed();
    renderApp('/favorite-recipes');

    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('Spicy Arrabiata Penne');
    expect(screen.getByTestId('0-horizontal-top-text')).toHaveTextContent('Italian · Vegetarian');
    expect(screen.getByTestId('1-horizontal-name')).toHaveTextContent('GG');
    expect(screen.getByTestId('1-horizontal-top-text')).toHaveTextContent('Optional alcohol');
    expect(screen.getAllByTestId(/-horizontal-name$/)).toHaveLength(2);
  });

  it('filters by type', async () => {
    seed();
    renderApp('/favorite-recipes');

    await user.click(screen.getByTestId('filter-by-drink-btn'));

    expect(screen.getAllByTestId(/-horizontal-name$/)).toHaveLength(1);
    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('GG');

    await user.click(screen.getByTestId('filter-by-meal-btn'));

    expect(screen.getAllByTestId(/-horizontal-name$/)).toHaveLength(1);
    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('Spicy Arrabiata Penne');
  });

  it('removes a recipe from the favourites', async () => {
    seed();
    renderApp('/favorite-recipes');

    await user.click(screen.getByTestId('0-horizontal-favorite-btn'));

    expect(screen.getAllByTestId(/-horizontal-name$/)).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([
      expect.objectContaining({ id: '15997' }),
    ]);
  });

  it('shows an empty state when nothing is saved', () => {
    signIn();
    renderApp('/favorite-recipes');

    expect(screen.getByRole('heading', { name: /no favourites yet/i })).toBeInTheDocument();
  });
});
