import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import AppProvider from '../../context/AppProvider';
import fetchMock from '../mocks/fetchMock';
import { clearCache } from '../../services/recipesApi';

/** Renders `component` inside a memory router (optionally inside AppProvider). */
const renderWithRouter = (component, { route = '/', withProvider = true } = {}) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const wrapper = withProvider ? AppProvider : React.Fragment;
  const Wrapper = wrapper;

  return {
    history,
    ...render(
      <Router history={ history }>
        <Wrapper>{component}</Wrapper>
      </Router>,
    ),
  };
};

/** Renders the whole application at `route`. */
export const renderApp = (route = '/') => renderWithRouter(<App />, { route });

/** Fresh, isolated test environment: clean storage, cache and API mock. */
export const setUpTest = () => {
  beforeEach(() => {
    localStorage.clear();
    clearCache();
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });
};

/** Seeds the demo session so private routes render. */
export const signIn = (email = 'chef@example.com') => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const waitForRecipes = () => waitFor(
  () => expect(screen.getAllByTestId(/-recipe-card$/).length).toBeGreaterThan(0),
);

export { screen, waitFor, userEvent };
export default renderWithRouter;
