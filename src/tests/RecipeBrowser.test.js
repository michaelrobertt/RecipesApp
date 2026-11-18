import { renderApp, setUpTest, screen, userEvent, waitFor } from './helpers/renderWithRouter';
import fetchMock from './mocks/fetchMock';

const user = userEvent.setup();

const openSearch = async () => {
  await user.click(screen.getByRole('button', { name: /search recipes/i }));
  return screen.getByTestId('search-input');
};

describe('Recipe browsing', () => {
  setUpTest();

  it('shows at most 12 meals with the category filters', async () => {
    renderApp('/meals');

    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
    expect(screen.getAllByTestId(/-recipe-card$/)).toHaveLength(12);
    expect(screen.getByTestId('page-title')).toHaveTextContent('Meals');
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Beef' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pasta' })).toBeInTheDocument();
  });

  it('shows drinks with drink categories', async () => {
    renderApp('/drinks');

    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toHaveTextContent('Drinks');
    expect(screen.getByRole('button', { name: 'Cocktail' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Shake' })).toBeInTheDocument();
  });

  it('filters by category and goes back to everything with the All chip', async () => {
    renderApp('/meals');
    await screen.findByTestId('0-recipe-card');

    await user.click(screen.getByRole('button', { name: 'Beef' }));

    expect(await screen.findByText('Spicy Arrabiata Penne')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Beef' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Beef meals');

    await user.click(screen.getByRole('button', { name: 'All' }));

    expect(await screen.findByText('Test meal 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('searches by name and shows the matching recipes', async () => {
    renderApp('/meals');
    await screen.findByTestId('0-recipe-card');

    const input = await openSearch();
    await user.type(input, 'Arrabiata');
    await user.click(screen.getByRole('radio', { name: 'Name' }));
    await user.click(screen.getByTestId('exec-search-btn'));

    expect(await screen.findByRole('status')).toHaveTextContent('Results for “Arrabiata”');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/search.php?s=Arrabiata'),
    );
  });

  it('explains an empty result instead of throwing an alert', async () => {
    renderApp('/meals');
    await screen.findByTestId('0-recipe-card');

    const input = await openSearch();
    await user.type(input, 'xablau');
    await user.click(screen.getByRole('radio', { name: 'Name' }));
    await user.click(screen.getByTestId('exec-search-btn'));

    expect(await screen.findByRole('heading', { name: /no recipes found/i })).toBeInTheDocument();
    expect(screen.getByText(/nothing matched “xablau”/i)).toBeInTheDocument();
  });

  it('requires exactly one character for a first-letter search', async () => {
    renderApp('/meals');
    await screen.findByTestId('0-recipe-card');

    const input = await openSearch();
    await user.type(input, 'ab');
    await user.click(screen.getByRole('radio', { name: /first letter/i }));
    await user.click(screen.getByTestId('exec-search-btn'));

    expect(screen.getByRole('alert')).toHaveTextContent(/exactly one character/i);
  });

  it('reports a request failure and retries it', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new TypeError('offline')));
    renderApp('/meals');

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();

    global.fetch.mockImplementation(fetchMock);
    await user.click(screen.getByRole('button', { name: /try again/i }));

    await waitFor(() => expect(screen.getAllByTestId(/-recipe-card$/)).toHaveLength(12));
  });
});
