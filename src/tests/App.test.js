import { renderApp, setUpTest, screen, signIn, userEvent, waitFor } from './helpers/renderWithRouter';

const user = userEvent.setup();

describe('App shell', () => {
  setUpTest();

  it('renders a 404 page for unknown routes', () => {
    renderApp('/there-is-nothing-here');

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /this page went out for lunch/i }))
      .toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to the recipes/i }))
      .toHaveAttribute('href', '/meals');
  });

  it('protects the personal pages behind the demo login', () => {
    const { history } = renderApp('/done-recipes');

    expect(history.location.pathname).toBe('/');
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

  it('lets a signed in user reach the personal pages', () => {
    signIn();
    const { history } = renderApp('/done-recipes');

    expect(history.location.pathname).toBe('/done-recipes');
    expect(screen.getByTestId('page-title')).toHaveTextContent('Completed dishes');
  });

  it('navigates between meals and drinks from the footer', async () => {
    renderApp('/meals');
    await screen.findByTestId('0-recipe-card');

    await user.click(screen.getByTestId('drinks-bottom-btn'));

    await waitFor(() => expect(screen.getByTestId('page-title')).toHaveTextContent('Drinks'));
    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
  });

  it('toggles the search panel from the header', async () => {
    renderApp('/meals');
    await screen.findByTestId('0-recipe-card');

    const toggle = screen.getByRole('button', { name: /search recipes/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();

    await user.click(toggle);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close search/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('opens the profile from the header', async () => {
    signIn();
    const { history } = renderApp('/meals');
    await screen.findByTestId('0-recipe-card');

    await user.click(screen.getByRole('link', { name: 'Profile' }));

    await waitFor(() => expect(history.location.pathname).toBe('/profile'));
  });
});
