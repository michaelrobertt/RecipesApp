const img = (name) => `https://cdn.test/${name}.jpg`;

const mealRows = Array.from({ length: 14 }, (_, index) => ({
  idMeal: String(52000 + index),
  strMeal: `Test meal ${index + 1}`,
  strMealThumb: img(`meal-${index + 1}`),
}));

const drinkRows = Array.from({ length: 14 }, (_, index) => ({
  idDrink: String(11000 + index),
  strDrink: `Test drink ${index + 1}`,
  strDrinkThumb: img(`drink-${index + 1}`),
}));

export const mealsList = { meals: mealRows };
export const drinksList = { drinks: drinkRows };

export const mealCategories = {
  meals: [
    { strCategory: 'Beef' },
    { strCategory: 'Breakfast' },
    { strCategory: 'Chicken' },
    { strCategory: 'Dessert' },
    { strCategory: 'Pasta' },
  ],
};

export const drinkCategories = {
  drinks: [
    { strCategory: 'Ordinary Drink' },
    { strCategory: 'Cocktail' },
    { strCategory: 'Shake' },
    { strCategory: 'Cocoa' },
  ],
};

export const beefMeals = {
  meals: [
    { idMeal: '52977', strMeal: 'Spicy Arrabiata Penne', strMealThumb: img('arrabiata') },
    { idMeal: '52978', strMeal: 'Beef Wellington', strMealThumb: img('wellington') },
  ],
};

export const cocktailDrinks = {
  drinks: [
    { idDrink: '15997', strDrink: 'GG', strDrinkThumb: img('gg') },
    { idDrink: '15998', strDrink: 'Margarita', strDrinkThumb: img('margarita') },
  ],
};

export const mealDetail = {
  meals: [
    {
      idMeal: '52771',
      strMeal: 'Spicy Arrabiata Penne',
      strCategory: 'Vegetarian',
      strArea: 'Italian',
      strInstructions: 'Boil the pasta.\nMake the sauce.\nToss and serve.',
      strMealThumb: img('arrabiata'),
      strTags: 'Pasta,Spicy',
      strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
      strIngredient1: 'penne rigate',
      strMeasure1: '1 pound',
      strIngredient2: 'olive oil',
      strMeasure2: '1/4 cup',
      strIngredient3: 'garlic',
      strMeasure3: '3 cloves',
      strIngredient4: 'chopped tomatoes',
      strMeasure4: '2 cans',
      strIngredient5: '',
      strMeasure5: '',
    },
  ],
};

export const drinkDetail = {
  drinks: [
    {
      idDrink: '15997',
      strDrink: 'GG',
      strCategory: 'Ordinary Drink',
      strAlcoholic: 'Optional alcohol',
      strGlass: 'Highball glass',
      strInstructions: 'Pour the Galliano liqueur over ice and top with ginger ale.',
      strDrinkThumb: img('gg'),
      strIngredient1: 'Galliano',
      strMeasure1: '2 1/2 shots',
      strIngredient2: 'Ginger ale',
      strMeasure2: '',
      strIngredient3: 'Ice',
      strMeasure3: '',
    },
  ],
};

export const emptyResult = { meals: null, drinks: null };

export const offline = () => Promise.reject(new TypeError('Failed to fetch'));
