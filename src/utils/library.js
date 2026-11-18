export const RECIPE_TYPES = ['meal', 'drink'];

/** `meals` -> `meal` (legacy storage used the plural form). */
export const normalizeType = (type) => (type === 'meal' || type === 'meals' ? 'meal' : 'drink');

export const typeToPath = (type) => (normalizeType(type) === 'meal' ? 'meals' : 'drinks');

/** Shape stored in `favoriteRecipes` / `doneRecipes`. */
export const toStoredRecipe = (recipe, { done = false } = {}) => ({
  id: String(recipe.id),
  type: normalizeType(recipe.type),
  nationality: recipe.area || recipe.nationality || '',
  category: recipe.category || '',
  alcoholicOrNot: recipe.alcoholic || recipe.alcoholicOrNot || '',
  name: recipe.name,
  image: recipe.image,
  ...(done ? { tags: recipe.tags || [], doneDate: new Date().toISOString() } : {}),
});

/** Tolerates entries written by older versions of the app. */
export const normalizeStoredRecipe = (recipe) => ({
  id: String(recipe.id),
  type: normalizeType(recipe.type),
  nationality: recipe.nationality || '',
  category: recipe.category || '',
  alcoholicOrNot: recipe.alcoholicOrNot || '',
  name: recipe.name || '',
  image: recipe.image || '',
  tags: Array.isArray(recipe.tags) ? recipe.tags : [],
  doneDate: recipe.doneDate || '',
});

export const normalizeStoredList = (list) => (Array.isArray(list)
  ? list.filter((item) => item && item.id).map(normalizeStoredRecipe)
  : []);

export const toggleInList = (list, recipe) => {
  const exists = list.some((item) => String(item.id) === String(recipe.id));
  if (exists) return list.filter((item) => String(item.id) !== String(recipe.id));
  return [toStoredRecipe(recipe), ...list];
};
