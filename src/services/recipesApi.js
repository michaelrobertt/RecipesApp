/**
 * Single access point for TheMealDB / TheCocktailDB.
 *
 * Both APIs expose the same shape with different prefixes (`strMeal` vs
 * `strDrink`, `meals` vs `drinks`, ...) which used to be handled inline in every
 * page. Everything is normalised here into one `Recipe` object so components
 * never have to know which API answered:
 *
 * {
 *   id, type: 'meal' | 'drink', name, image, category, area, alcoholic,
 *   instructions, tags: string[], youtubeId, ingredients: [{ name, measure }]
 * }
 */

const ENDPOINTS = {
  meal: 'https://www.themealdb.com/api/json/v1/1',
  drink: 'https://www.thecocktaildb.com/api/json/v1/1',
};

const MAX_INGREDIENTS = 20;

/** Recipes returned by the "browse" views are capped by the API consumer. */
export const MAX_LIST_ITEMS = 12;
export const MAX_RECOMMENDATIONS = 6;

const cache = new Map();

const request = async (url) => {
  if (cache.has(url)) return cache.get(url);

  const pending = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      cache.delete(url);
      throw error;
    });

  cache.set(url, pending);
  return pending;
};

/** Exposed for tests only. */
export const clearCache = () => cache.clear();

const splitTags = (tags) => (tags ? String(tags).split(',').map((tag) => tag.trim())
  .filter(Boolean) : []);

const toYoutubeId = (url) => {
  if (!url) return '';
  const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/);
  return match ? match[1] : '';
};

const toIngredients = (raw) => Array.from({ length: MAX_INGREDIENTS }, (_, index) => {
  const name = (raw[`strIngredient${index + 1}`] || '').trim();
  const measure = (raw[`strMeasure${index + 1}`] || '').trim();
  return { name, measure };
}).filter(({ name }) => name !== '');

export const normalizeMeal = (meal) => ({
  id: String(meal.idMeal),
  type: 'meal',
  name: meal.strMeal,
  image: meal.strMealThumb,
  category: meal.strCategory || '',
  area: meal.strArea || '',
  alcoholic: '',
  instructions: meal.strInstructions || '',
  tags: splitTags(meal.strTags),
  youtubeId: toYoutubeId(meal.strYoutube),
  ingredients: toIngredients(meal),
});

export const normalizeDrink = (drink) => ({
  id: String(drink.idDrink),
  type: 'drink',
  name: drink.strDrink,
  image: drink.strDrinkThumb,
  category: drink.strCategory || '',
  area: '',
  alcoholic: drink.strAlcoholic || '',
  instructions: drink.strInstructions || '',
  tags: splitTags(drink.strTags),
  youtubeId: toYoutubeId(drink.strYoutube || drink.strVideo),
  ingredients: toIngredients(drink),
});

const normalizeList = (type, payload) => {
  const rows = payload[type === 'meal' ? 'meals' : 'drinks'] || [];
  const normalize = type === 'meal' ? normalizeMeal : normalizeDrink;
  return rows.map(normalize);
};

/**
 * @param {'meal'|'drink'} type
 * @param {{ mode: 'ingredient'|'name'|'first-letter', query: string }} params
 */
export const searchRecipes = async (type, { mode, query }) => {
  const term = encodeURIComponent(query.trim());
  let path;

  if (mode === 'first-letter') path = `/search.php?f=${term.slice(0, 1)}`;
  else if (mode === 'ingredient') path = `/filter.php?i=${term}`;
  else path = `/search.php?s=${term}`;

  const payload = await request(`${ENDPOINTS[type]}${path}`);
  return normalizeList(type, payload);
};

export const filterRecipesByCategory = async (type, category) => {
  const payload = await request(`${ENDPOINTS[type]}/filter.php?c=${encodeURIComponent(category)}`);
  return normalizeList(type, payload);
};

export const getRecipeById = async (type, id) => {
  const payload = await request(`${ENDPOINTS[type]}/lookup.php?i=${encodeURIComponent(id)}`);
  const [recipe] = normalizeList(type, payload);
  if (!recipe) throw new Error('Recipe not found');
  return recipe;
};

export const getRandomRecipe = async (type) => {
  const payload = await request(`${ENDPOINTS[type]}/random.php`);
  const [recipe] = normalizeList(type, payload);
  if (!recipe) throw new Error('Recipe not found');
  return recipe;
};

export const getCategories = async (type) => {
  const payload = await request(`${ENDPOINTS[type]}/list.php?c=list`);
  const rows = payload[type === 'meal' ? 'meals' : 'drinks'] || [];
  return [...new Set(rows.map((row) => row.strCategory).filter(Boolean))];
};

export const getRecommendations = async (type) => {
  const opposite = type === 'meal' ? 'drink' : 'meal';
  const recipes = await searchRecipes(opposite, { mode: 'name', query: '' });
  return recipes.slice(0, MAX_RECOMMENDATIONS);
};
