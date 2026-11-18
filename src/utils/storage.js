/** Namespaced, crash-proof access to localStorage. */
export const STORAGE_KEYS = {
  user: 'user',
  favorites: 'favoriteRecipes',
  done: 'doneRecipes',
  progress: 'inProgressRecipes',
};

export const readStorage = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const value = JSON.parse(raw);
    return value === null || value === undefined ? fallback : value;
  } catch (error) {
    console.warn(`Could not read "${key}" from localStorage`, error);
    return fallback;
  }
};

export const writeStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not write "${key}" to localStorage`, error);
  }
};

export const removeStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Could not remove "${key}" from localStorage`, error);
  }
};
