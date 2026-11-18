import {
  normalizeStoredRecipe,
  normalizeStoredList,
  normalizeType,
  toStoredRecipe,
  toggleInList,
  typeToPath,
} from '../utils/library';

const recipe = {
  id: '52771',
  type: 'meal',
  name: 'Arrabiata',
  image: 'img.jpg',
  category: 'Vegetarian',
  area: 'Italian',
  alcoholic: '',
  tags: ['Pasta'],
};

describe('library helpers', () => {
  it('normalises legacy plural types', () => {
    expect(normalizeType('meals')).toBe('meal');
    expect(normalizeType('meal')).toBe('meal');
    expect(normalizeType('drinks')).toBe('drink');
    expect(normalizeType(undefined)).toBe('drink');
    expect(typeToPath('meal')).toBe('meals');
    expect(typeToPath('drinks')).toBe('drinks');
  });

  it('builds the shape stored in localStorage', () => {
    expect(toStoredRecipe(recipe)).toEqual({
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Arrabiata',
      image: 'img.jpg',
    });
  });

  it('adds a done recipe with a date and its tags', () => {
    const stored = toStoredRecipe(recipe, { done: true });

    expect(stored.tags).toEqual(['Pasta']);
    expect(new Date(stored.doneDate).getTime()).not.toBeNaN();
  });

  it('toggles a recipe in a list without duplicating it', () => {
    const once = toggleInList([], recipe);
    expect(once).toHaveLength(1);

    const twice = toggleInList(once, recipe);
    expect(twice).toEqual([]);
  });

  it('repairs entries written by older versions', () => {
    expect(normalizeStoredRecipe({ id: 1, type: 'meals' })).toMatchObject({
      id: '1',
      type: 'meal',
      tags: [],
      doneDate: '',
      name: '',
    });

    expect(normalizeStoredList([{ id: 'a' }, null, { name: 'no id' }])).toHaveLength(1);
    expect(normalizeStoredList(undefined)).toEqual([]);
  });
});
