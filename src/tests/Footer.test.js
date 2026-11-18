import { renderApp, setUpTest, screen } from './helpers/renderWithRouter';

describe('Footer', () => {
  setUpTest();

  it('links to the four main destinations', async () => {
    renderApp('/meals');
    await screen.findByTestId('0-recipe-card');

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    expect(screen.getByTestId('meals-bottom-btn')).toHaveAttribute('href', '/meals');
    expect(screen.getByTestId('drinks-bottom-btn')).toHaveAttribute('href', '/drinks');
    expect(screen.getByTestId('favorites-bottom-btn')).toHaveAttribute('href', '/favorite-recipes');
    expect(screen.getByTestId('done-bottom-btn')).toHaveAttribute('href', '/done-recipes');
  });

  it('marks the current section as active', async () => {
    renderApp('/drinks');
    await screen.findByTestId('0-recipe-card');

    expect(screen.getByTestId('drinks-bottom-btn')).toHaveClass('app-footer__link--active');
    expect(screen.getByTestId('meals-bottom-btn')).not.toHaveClass('app-footer__link--active');
  });
});
