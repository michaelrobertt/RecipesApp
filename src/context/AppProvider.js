import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { readStorage, writeStorage, removeStorage, STORAGE_KEYS } from '../utils/storage';
import {
  normalizeStoredList,
  toStoredRecipe,
  toggleInList,
  typeToPath,
} from '../utils/library';

const TOAST_DURATION = 2600;

const emptyProgress = () => ({ meals: {}, drinks: {} });

const readProgress = () => {
  const stored = readStorage(STORAGE_KEYS.progress, emptyProgress());
  return {
    meals: stored && typeof stored.meals === 'object' && stored.meals ? stored.meals : {},
    drinks: stored && typeof stored.drinks === 'object' && stored.drinks ? stored.drinks : {},
  };
};

function AppProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(STORAGE_KEYS.user, null));
  const [favorites, setFavorites] = useState(
    () => normalizeStoredList(readStorage(STORAGE_KEYS.favorites, [])),
  );
  const [doneRecipes, setDoneRecipes] = useState(
    () => normalizeStoredList(readStorage(STORAGE_KEYS.done, [])),
  );
  const [progress, setProgress] = useState(readProgress);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), TOAST_DURATION);
  };

  const login = (email) => {
    const session = { email };
    setUser(session);
    writeStorage(STORAGE_KEYS.user, session);
  };

  const logout = () => {
    setUser(null);
    removeStorage(STORAGE_KEYS.user);
  };

  const isFavorite = (id) => favorites.some((item) => item.id === String(id));

  const toggleFavorite = (recipe) => {
    const alreadySaved = isFavorite(recipe.id);
    const next = toggleInList(favorites, recipe);
    setFavorites(next);
    writeStorage(STORAGE_KEYS.favorites, next);
    notify(alreadySaved ? 'Removed from favourites' : 'Saved to favourites');
    return !alreadySaved;
  };

  const isDone = (id) => doneRecipes.some((item) => item.id === String(id));

  const addDoneRecipe = (recipe) => {
    const entry = toStoredRecipe(recipe, { done: true });
    const next = [entry, ...doneRecipes.filter((item) => item.id !== entry.id)];
    setDoneRecipes(next);
    writeStorage(STORAGE_KEYS.done, next);
    notify('Recipe completed. Well done!');
  };

  const getProgress = (type, id) => {
    const bucket = typeToPath(type);
    const stored = progress[bucket] || {};
    return Array.isArray(stored[String(id)]) ? stored[String(id)] : [];
  };

  const updateProgress = (type, id, ingredients) => {
    const bucket = typeToPath(type);
    const next = {
      ...progress,
      [bucket]: { ...progress[bucket], [String(id)]: ingredients },
    };
    setProgress(next);
    writeStorage(STORAGE_KEYS.progress, next);
  };

  const clearProgress = (type, id) => {
    const bucket = typeToPath(type);
    const recipeProgress = { ...progress[bucket] };
    delete recipeProgress[String(id)];
    const next = { ...progress, [bucket]: recipeProgress };
    setProgress(next);
    writeStorage(STORAGE_KEYS.progress, next);
  };

  const value = {
    user,
    login,
    logout,
    favorites,
    isFavorite,
    toggleFavorite,
    doneRecipes,
    isDone,
    addDoneRecipe,
    getProgress,
    updateProgress,
    clearProgress,
    notify,
    toast,
  };

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
