import {
  beefMeals,
  cocktailDrinks,
  drinkCategories,
  drinkDetail,
  drinksList,
  emptyResult,
  mealCategories,
  mealDetail,
  mealsList,
} from './data';

const ok = (payload) => Promise.resolve({
  ok: true,
  status: 200,
  json: () => Promise.resolve(payload),
});

const isDrinkApi = (url) => url.includes('thecocktaildb');

/**
 * Minimal stand-in for TheMealDB / TheCocktailDB, matching on the request path
 * the same way the real APIs do.
 */
export default function fetchMock(url) {
  const drink = isDrinkApi(url);

  if (url.includes('lookup.php')) {
    if (url.includes('52771')) return ok(mealDetail);
    if (url.includes('15997')) return ok(drinkDetail);
    return ok(emptyResult);
  }

  if (url.includes('random.php')) {
    return ok(drink ? drinkDetail : mealDetail);
  }

  if (url.includes('list.php?c=list')) {
    return ok(drink ? drinkCategories : mealCategories);
  }

  if (url.includes('filter.php?c=')) {
    return ok(drink ? cocktailDrinks : beefMeals);
  }

  if (url.includes('filter.php?i=')) {
    return ok(drink ? cocktailDrinks : beefMeals);
  }

  if (url.includes('search.php?f=')) {
    return ok(drink ? { drinks: drinksList.drinks.slice(0, 2) }
      : { meals: mealsList.meals.slice(0, 2) });
  }

  if (url.includes('search.php?s=xablau')) {
    return ok(emptyResult);
  }

  if (url.includes('search.php?s=')) {
    return ok(drink ? drinksList : mealsList);
  }

  return ok(emptyResult);
}
