import { renderApp, setUpTest, screen, userEvent, waitFor } from './helpers/renderWithRouter';

const user = userEvent.setup();

describe('Login', () => {
  setUpTest();

  it('renders the form with the submit button disabled', () => {
    renderApp('/');

    expect(screen.getByRole('heading', { level: 1, name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeDisabled();
  });

  it('enables the submit button only for a valid email and a 6+ character password', async () => {
    renderApp('/');
    const submit = screen.getByTestId('login-submit-btn');

    await user.type(screen.getByTestId('email-input'), 'not-an-email');
    await user.type(screen.getByTestId('password-input'), 'secret123');
    expect(submit).toBeDisabled();

    await user.clear(screen.getByTestId('email-input'));
    await user.type(screen.getByTestId('email-input'), 'chef@example.com');
    expect(submit).toBeEnabled();
  });

  it('signs the user in, stores the session and opens the meals page', async () => {
    const { history } = renderApp('/');

    await user.type(screen.getByTestId('email-input'), 'chef@example.com');
    await user.type(screen.getByTestId('password-input'), 'secret123');
    await user.click(screen.getByTestId('login-submit-btn'));

    await waitFor(() => expect(history.location.pathname).toBe('/meals'));
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({ email: 'chef@example.com' });
    expect(await screen.findByTestId('page-title')).toHaveTextContent('Meals');
  });

  it('redirects an already authenticated user straight to the meals page', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'chef@example.com' }));
    const { history } = renderApp('/');

    expect(history.location.pathname).toBe('/meals');
    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
  });
});
