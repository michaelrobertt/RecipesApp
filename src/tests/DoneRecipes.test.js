import { renderApp, setUpTest, screen, signIn, userEvent } from './helpers/renderWithRouter';

const user = userEvent.setup();

const done = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://cdn.test/arrabiata.jpg',
    tags: ['Pasta'],
    doneDate: '2024-04-13T10:00:00.000Z',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://cdn.test/gg.jpg',
    tags: [],
    doneDate: '2024-03-01T10:00:00.000Z',
  },
];

const seed = () => {
  signIn();
  localStorage.setItem('doneRecipes', JSON.stringify(done));
};

describe('Completed dishes', () => {
  setUpTest();

  it('lists the finished dishes with their date and tags, newest first', () => {
    seed();
    renderApp('/done-recipes');

    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('Spicy Arrabiata Penne');
    expect(screen.getByTestId('0-horizontal-done-date')).toHaveTextContent(/13 Apr 2024/);
    expect(screen.getByTestId('0-Pasta-horizontal-tag')).toHaveTextContent('Pasta');
    expect(screen.getByTestId('1-horizontal-name')).toHaveTextContent('GG');
    expect(screen.getByTestId('1-horizontal-top-text')).toHaveTextContent('Optional alcohol');
  });

  it('filters by meal and drink', async () => {
    seed();
    renderApp('/done-recipes');

    await user.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getAllByTestId(/-horizontal-name$/)).toHaveLength(1);
    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('Spicy Arrabiata Penne');

    await user.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent('GG');
  });

  it('shows an empty state before anything is cooked', () => {
    signIn();
    renderApp('/done-recipes');

    expect(screen.getByRole('heading', { name: /no finished dishes yet/i })).toBeInTheDocument();
  });
});
