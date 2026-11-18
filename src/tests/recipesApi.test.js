import {
  MAX_RECOMMENDATIONS,
  clearCache,
  filterRecipesByCategory,
  getCategories,
  getRandomRecipe,
  getRecipeById,
  getRecommendations,
  normalizeDrink,
  normalizeMeal,
  searchRecipes,
} from '../services/recipesApi';
import fetchMock from './mocks/fetchMock';

describe('recipesApi', () => {
  beforeEach(() => {
    clearCache();
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  afterEach(() => jest.restoreAllMocks());

  describe('normalisation', () => {
    it('turns a meal payload into a typed recipe', () => {
      const recipe = normalizeMeal({
        idMeal: 52771,
        strMeal: 'Arrabiata',
        strMealThumb: 'img.jpg',
        strCategory: 'Vegetarian',
        strArea: 'Italian',
        strInstructions: 'Cook it',
        strTags: 'Pasta, Spicy ,',
        strYoutube: 'https://www.youtube.com/watch?v=abc123&t=10',
        strIngredient1: ' penne ',
        strMeasure1: ' 1 pound ',
        strIngredient2: '',
        strMeasure2: '',
        strIngredient3: 'garlic',
        strMeasure3: '',
      });

      expect(recipe).toEqual({
        id: '52771',
        type: 'meal',
        name: 'Arrabiata',
        image: 'img.jpg',
        category: 'Vegetarian',
        area: 'Italian',
        alcoholic: '',
        instructions: 'Cook it',
        tags: ['Pasta', 'Spicy'],
        youtubeId: 'abc123',
        ingredients: [
          { name: 'penne', measure: '1 pound' },
          { name: 'garlic', measure: '' },
        ],
      });
    });

    it('turns a drink payload into a typed recipe', () => {
      const recipe = normalizeDrink({
        idDrink: '15997',
        strDrink: 'GG',
        strDrinkThumb: 'gg.jpg',
        strCategory: 'Ordinary Drink',
        strAlcoholic: 'Optional alcohol',
        strInstructions: 'Mix it',
        strIngredient1: 'Galliano',
        strMeasure1: '2 shots',
      });

      expect(recipe).toMatchObject({
        id: '15997',
        type: 'drink',
        name: 'GG',
        area: '',
        alcoholic: 'Optional alcohol',
        tags: [],
        youtubeId: '',
        ingredients: [{ name: 'Galliano', measure: '2 shots' }],
      });
    });
  });

  describe('requests', () => {
    it('builds the right URL for every search mode', async () => {
      await searchRecipes('meal', { mode: 'ingredient', query: 'chicken' });
      await searchRecipes('meal', { mode: 'name', query: 'soup' });
      await searchRecipes('meal', { mode: 'first-letter', query: 'b' });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken',
      );
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=soup',
      );
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/search.php?f=b',
      );
    });

    it('only keeps the first character of a first-letter search', async () => {
      await searchRecipes('drink', { mode: 'first-letter', query: 'abc' });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a',
      );
    });

    it('returns an empty list when the API answers with null', async () => {
      await expect(searchRecipes('meal', { mode: 'name', query: 'xablau' }))
        .resolves.toEqual([]);
    });

    it('caches identical requests', async () => {
      await getCategories('meal');
      await getCategories('meal');

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('throws a readable error for a missing recipe', async () => {
      await expect(getRecipeById('meal', '1')).rejects.toThrow('Recipe not found');
    });

    it('filters by category, picks a random recipe and recommends the other API', async () => {
      await expect(filterRecipesByCategory('meal', 'Beef')).resolves.toHaveLength(2);
      await expect(getRandomRecipe('meal')).resolves.toMatchObject({ id: '52771' });
      await expect(getRecommendations('meal')).resolves.toHaveLength(MAX_RECOMMENDATIONS);
    });
  });
});
