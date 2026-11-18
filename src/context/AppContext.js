import { createContext } from 'react';

/**
 * @typedef {Object} AppContextValue
 * @property {{ email: string } | null} user
 * @property {(email: string) => void} login
 * @property {() => void} logout
 * @property {object[]} favorites
 * @property {(id: string) => boolean} isFavorite
 * @property {(recipe: object) => boolean} toggleFavorite
 * @property {object[]} doneRecipes
 * @property {(id: string) => boolean} isDone
 * @property {(recipe: object) => void} addDoneRecipe
 * @property {(type: string, id: string) => string[]} getProgress
 * @property {(type: string, id: string, ingredients: string[]) => void} updateProgress
 * @property {(type: string, id: string) => void} clearProgress
 * @property {(message: string) => void} notify
 * @property {string} toast
 */

const AppContext = createContext(/** @type {AppContextValue} */ ({}));

export default AppContext;
