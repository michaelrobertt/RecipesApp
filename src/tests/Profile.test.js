import { renderApp, setUpTest, screen, signIn, userEvent, waitFor } from './helpers/renderWithRouter';

const user = userEvent.setup();

const seed = () => {
  signIn('chef@example.com');
  localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '52771', type: 'meal', name: 'A' }]));
  localStorage.setItem('doneRecipes', JSON.stringify([
    { id: '52771', type: 'meal', name: 'A', doneDate: '2024-04-13T10:00:00.000Z' },
    { id: '15997', type: 'drink', name: 'B', doneDate: '2024-04-14T10:00:00.000Z' },
  ]));
};

describe('Profile', () => {
  setUpTest();

  it('shows the signed in email and the library counters', () => {
    seed();
    renderApp('/profile');

    expect(screen.getByTestId('page-title')).toHaveTextContent('Profile');
    expect(screen.getByTestId('profile-email')).toHaveTextContent('chef@example.com');
    expect(screen.getByTestId('profile-favorite-btn')).toHaveTextContent('1');
    expect(screen.getByTestId('profile-done-btn')).toHaveTextContent('2');
  });

  it('navigates to the saved recipes page', async () => {
    seed();
    const { history } = renderApp('/profile');

    await user.click(screen.getByTestId('profile-favorite-btn'));

    await waitFor(() => expect(history.location.pathname).toBe('/favorite-recipes'));
  });

  it('navigates to the completed dishes page', async () => {
    seed();
    const { history } = renderApp('/profile');

    await user.click(screen.getByTestId('profile-done-btn'));

    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));
  });

  it('logs out without deleting the saved recipes', async () => {
    seed();
    const { history } = renderApp('/profile');

    await user.click(screen.getByTestId('profile-logout-btn'));

    await waitFor(() => expect(history.location.pathname).toBe('/'));
    expect(localStorage.getItem('user')).toBeNull();
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('doneRecipes'))).toHaveLength(2);
  });
});
