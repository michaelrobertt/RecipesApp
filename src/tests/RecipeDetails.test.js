import { renderApp, setUpTest, screen, userEvent, waitFor } from './helpers/renderWithRouter';

const user = userEvent.setup();

const openMealDetail = async () => {
  renderApp('/meals/52771');
  await screen.findByTestId('recipe-title');
};

describe('Recipe details', () => {
  setUpTest();

  it('renders the recipe, its ingredients, instructions and video', async () => {
    await openMealDetail();

    expect(screen.getByTestId('recipe-title')).toHaveTextContent('Spicy Arrabiata Penne');
    expect(screen.getByTestId('recipe-category')).toHaveTextContent('Italian · Vegetarian');
    expect(screen.getByTestId('recipe-photo')).toHaveAttribute('src', expect.stringContaining('arrabiata'));
    expect(screen.getByTestId('0-ingredient-name-and-measure')).toHaveTextContent('1 pound penne rigate');
    expect(screen.getByTestId('3-ingredient-name-and-measure')).toHaveTextContent('2 cans chopped tomatoes');
    expect(screen.getByTestId('instructions')).toHaveTextContent(/boil the pasta/i);
    expect(screen.getByTestId('video')).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/1IszT_guI08',
    );
  });

  it('loads six recommendations from the other API', async () => {
    await openMealDetail();

    await waitFor(() => expect(screen.getAllByTestId(/-recommendation-card$/)).toHaveLength(6));
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('thecocktaildb.com'),
    );
  });

  it('toggles the recipe in and out of the favourites', async () => {
    await openMealDetail();
    const favourite = screen.getByTestId('favorite-btn');

    expect(favourite).toHaveAttribute('aria-pressed', 'false');
    await user.click(favourite);

    expect(favourite).toHaveAttribute('aria-pressed', 'true');
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([
      expect.objectContaining({
        id: '52771',
        type: 'meal',
        name: 'Spicy Arrabiata Penne',
        nationality: 'Italian',
        category: 'Vegetarian',
      }),
    ]);

    await user.click(favourite);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([]);
  });

  it('copies a shareable link to the clipboard', async () => {
    const writeText = jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
    await openMealDetail();

    await user.click(screen.getByTestId('share-btn'));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining('/meals/52771'),
    ));
    expect(await screen.findByRole('status')).toHaveTextContent(/link copied/i);
  });

  it('starts the cooking flow', async () => {
    const { history } = renderApp('/meals/52771');
    await screen.findByTestId('recipe-title');

    await user.click(screen.getByTestId('start-recipe-btn'));

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771/in-progress'));
  });

  it('offers to continue a recipe that is already in progress', async () => {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ meals: { 52771: ['garlic'] }, drinks: {} }),
    );
    await openMealDetail();

    expect(screen.getByTestId('start-recipe-btn')).toHaveTextContent('Continue recipe');
    expect(screen.getByText(/1 of 4/)).toBeInTheDocument();
  });

  it('hides the start button once the recipe is completed', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      id: '52771',
      type: 'meal',
      name: 'Spicy Arrabiata Penne',
      image: 'https://cdn.test/arrabiata.jpg',
      category: 'Vegetarian',
      nationality: 'Italian',
      doneDate: '2024-04-13T10:00:00.000Z',
      tags: ['Pasta'],
    }]));
    await openMealDetail();

    expect(screen.getByTestId('recipe-completed')).toBeInTheDocument();
    expect(screen.queryByTestId('start-recipe-btn')).not.toBeInTheDocument();
  });

  it('shows a friendly message when the recipe does not exist', async () => {
    renderApp('/meals/999999');

    expect(await screen.findByRole('heading', { name: /recipe not found/i }))
      .toBeInTheDocument();
  });

  it('renders drinks with their alcohol label', async () => {
    renderApp('/drinks/15997');

    expect(await screen.findByTestId('recipe-title')).toHaveTextContent('GG');
    expect(screen.getByTestId('recipe-category')).toHaveTextContent('Optional alcohol · Ordinary Drink');
    expect(screen.getByTestId('1-ingredient-name-and-measure')).toHaveTextContent('Ginger ale');
  });
});
