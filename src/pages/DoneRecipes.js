import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const dateNow = new Date();
  const [receitaFeita, setReceitaFeita] = useState([
    {
      id: '178319',
      nationality: '',
      name: 'Aquamarine',
      category: 'Cocktail',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      tags: [],
      alcoholicOrNot: 'Alcoholic',
      type: 'drink',
      doneDate: dateNow.toISOString(),
    },
  ]);

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(localStorage, 'doneRecipes')) {
      const done = JSON.parse(localStorage.getItem('doneRecipes'));
      console.log(done);
      setReceitaFeita(done);
    }
  }, []);

  return (
    <div>
      <Header pesquisaOff titulo="Done Recipes" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>

      {
        receitaFeita.map((done, index) => {
          const {
            image,
            /* id, */
            name,
            /* nationality, */
            category,
            tags,
            /* alcoholicOrNot,
              type, */
            doneDate,
          } = done;
          console.log(typeof tags);
          return (
            <div key={ done }>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
              <span data-testid={ `${index}-horizontal-top-text` }>
                {category}
              </span>
              <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
              <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
              {
                tags.length > 0 && tags.map((tag) => (
                  <span
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </span>
                ))
              }
              <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
                Share
              </button>
            </div>
          );
        })
      }
      {/* {
          receitaFeita.filter((done) => filtro.includes(done.type))
            .map((done, index) => (
              <div key={ done }>
                <img
                  src={ done.image }
                  alt={ done.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {done.category}
                </span>
                <h3 data-testid={ `${index}-horizontal-name` }>{done.name}</h3>
                <p data-testid={ `${index}-horizontal-done-date` }>{done.doneDate}</p>
                <span data-testid={ `${index}-horizontal-done-date` }>
                  {recipe.doneDate}
                </span>
              </div>
            ))
        } */}
    </div>
  );
}

export default DoneRecipes;
