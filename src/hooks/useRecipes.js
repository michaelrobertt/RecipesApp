import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MAX_LIST_ITEMS,
  MAX_RECOMMENDATIONS,
  filterRecipesByCategory,
  getCategories,
  getRecipeById,
  getRecommendations,
  searchRecipes,
} from '../services/recipesApi';

const STATUS = {
  LOADING: 'loading',
  READY: 'ready',
  EMPTY: 'empty',
  ERROR: 'error',
};

const initialState = {
  status: STATUS.LOADING,
  recipes: [],
  categories: [],
  activeCategory: '',
  query: null,
  error: '',
};

/**
 * Owns everything the browse pages need: the default list, the category chips
 * and the search results. Requests are tagged so a slow response can never
 * overwrite a newer one.
 */
export function useRecipeList(type) {
  const [state, setState] = useState(initialState);
  const ticket = useRef(0);

  const run = useCallback(async (load, patch = {}) => {
    const current = ticket.current + 1;
    ticket.current = current;
    setState((prev) => ({ ...prev, status: STATUS.LOADING, error: '', ...patch }));

    try {
      const recipes = await load();
      if (current !== ticket.current) return;
      setState((prev) => ({
        ...prev,
        ...patch,
        status: recipes.length ? STATUS.READY : STATUS.EMPTY,
        recipes: recipes.slice(0, MAX_LIST_ITEMS),
        error: '',
      }));
    } catch (error) {
      if (current !== ticket.current) return;
      setState((prev) => ({
        ...prev,
        ...patch,
        status: STATUS.ERROR,
        recipes: [],
        error: error.message,
      }));
    }
  }, []);

  const loadAll = useCallback(async () => {
    const current = ticket.current + 1;
    ticket.current = current;
    setState((prev) => ({
      ...prev, status: STATUS.LOADING, error: '', activeCategory: '', query: null,
    }));

    try {
      const [recipes, categories] = await Promise.all([
        searchRecipes(type, { mode: 'name', query: '' }),
        getCategories(type),
      ]);
      if (current !== ticket.current) return;
      setState({
        status: recipes.length ? STATUS.READY : STATUS.EMPTY,
        recipes: recipes.slice(0, MAX_LIST_ITEMS),
        categories,
        activeCategory: '',
        query: null,
        error: '',
      });
    } catch (error) {
      if (current !== ticket.current) return;
      setState((prev) => ({ ...prev, status: STATUS.ERROR, recipes: [], error: error.message }));
    }
  }, [type]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const search = useCallback(({ mode, query }) => run(
    () => searchRecipes(type, { mode, query }),
    { query: { mode, query }, activeCategory: '' },
  ), [run, type]);

  const selectCategory = useCallback((category) => {
    if (!category || category === state.activeCategory) {
      loadAll();
      return;
    }
    run(() => filterRecipesByCategory(type, category), { activeCategory: category, query: null });
  }, [loadAll, run, state.activeCategory, type]);

  return {
    ...state,
    search,
    selectCategory,
    reload: loadAll,
    isEmpty: state.status === STATUS.EMPTY,
  };
}

export function useRecipe(type, id) {
  const [state, setState] = useState({ status: STATUS.LOADING, recipe: null, error: '' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ status: STATUS.LOADING, recipe: null, error: '' });

    getRecipeById(type, id)
      .then((recipe) => {
        if (!cancelled) setState({ status: STATUS.READY, recipe, error: '' });
      })
      .catch((error) => {
        if (!cancelled) setState({ status: STATUS.ERROR, recipe: null, error: error.message });
      });

    return () => { cancelled = true; };
  }, [type, id, attempt]);

  return { ...state, reload: () => setAttempt((value) => value + 1) };
}

/** Recommendations are decorative, so a failure simply hides them. */
export function useRecommendations(type) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getRecommendations(type)
      .then((recipes) => {
        if (!cancelled) setRecommendations(recipes.slice(0, MAX_RECOMMENDATIONS));
      })
      .catch(() => {
        if (!cancelled) setRecommendations([]);
      });
    return () => { cancelled = true; };
  }, [type]);

  return recommendations;
}

export { STATUS };
