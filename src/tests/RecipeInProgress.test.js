import {
  renderApp, setUpTest, screen, signIn, userEvent, waitFor,
} from './helpers/renderWithRouter';

const user = userEvent.setup();

const progressStorage = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

describe('Cooking a recipe', () => {
  setUpTest();

  it('lists every ingredient and keeps the finish button locked until all are ticked', async () => {
    renderApp('/meals/52771/in-progress');

    const boxes = await screen.findAllByRole('checkbox');
    expect(boxes).toHaveLength(4);
    expect(screen.getByTestId('finish-recipe-btn')).toBeDisabled();
    expect(screen.getByText(/tick every ingredient/i)).toBeInTheDocument();

    for (const box of boxes) {
      await user.click(box);
    }

    expect(screen.getByTestId('finish-recipe-btn')).toBeEnabled();
    expect(screen.getByTestId('finish-recipe-btn')).toHaveTextContent(/^finish recipe$/i);
  });

  it('persists ticked ingredients and restores them on the next visit', async () => {
    renderApp('/meals/52771/in-progress');
    await screen.findByRole('checkbox', { name: /garlic/i });

    await user.click(screen.getByRole('checkbox', { name: /garlic/i }));

    await waitFor(() => expect(progressStorage().meals['52771']).toEqual(['garlic']));
  });

  it('restores a saved checklist and allows un-ticking', async () => {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ meals: { 52771: ['garlic', 'olive oil'] }, drinks: {} }),
    );
    renderApp('/meals/52771/in-progress');

    const garlic = await screen.findByRole('checkbox', { name: /garlic/i });
    expect(garlic).toBeChecked();
    expect(screen.getByText('2/4')).toBeInTheDocument();

    await user.click(garlic);

    expect(garlic).not.toBeChecked();
    expect(progressStorage().meals['52771']).toEqual(['olive oil']);
  });

  it('saves the finished recipe and clears the in-progress state', async () => {
    signIn();
    const { history } = renderApp('/meals/52771/in-progress');

    for (const box of await screen.findAllByRole('checkbox')) {
      await user.click(box);
    }
    await user.click(screen.getByTestId('finish-recipe-btn'));

    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));

    expect(JSON.parse(localStorage.getItem('doneRecipes'))).toEqual([
      expect.objectContaining({
        id: '52771',
        type: 'meal',
        name: 'Spicy Arrabiata Penne',
        category: 'Vegetarian',
        nationality: 'Italian',
        tags: ['Pasta', 'Spicy'],
        doneDate: expect.any(String),
      }),
    ]);
    expect(progressStorage().meals).toEqual({});
  });
});
