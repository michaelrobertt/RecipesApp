import React, { useState, useEffect } from 'react';
/* import clipboardCopy from 'clipboard-copy'; */
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const dateNow = new Date();
  const [linkCopied, setLinkCopied] = useState(false);
  const [filtro, setBtnFiltro] = useState([]);
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
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
  ]);

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(localStorage, 'doneRecipes')) {
      const done = JSON.parse(localStorage.getItem('doneRecipes'));
      console.log(done);
      setReceitaFeita(done);
    }
  }, []);

  useEffect(() => {
    setBtnFiltro(receitaFeita);
  }, [receitaFeita]);

  const botaoBtnFiltro = ({ target }) => {
    if (target.name !== 'All') {
      console.log('Entrei dentro do filtro!');
      const mealFilter = receitaFeita.filter((el) => el.type === target.name);
      setBtnFiltro(mealFilter);
    } else {
      setBtnFiltro(receitaFeita);
    }
  };

  return (
    <div>
      <Header pesquisaOff titulo="Done Recipes" />
      <button
        name="All"
        onClick={ botaoBtnFiltro }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        name="meal"
        onClick={ botaoBtnFiltro }
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        name="drink"
        onClick={ botaoBtnFiltro }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      {
        filtro.map((done, index) => {
          const {
            image,
            /* id, */
            name,
            nationality,
            category,
            tags,
            alcoholicOrNot,
            type,
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

                { type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot}
              </span>
              {
                type === 'meal'
                && tags.length > 0
                && tags.map((tag) => (
                  <span
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </span>
                ))
              }

              <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
              <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

              <button
                src={ shareIcon }
                onClick={ () => {
                  navigator.clipboard.writeText(`http://localhost:3000/${done.type}s/${done.id}`)
                    .then(
                      () => { setLinkCopied(true); },
                      () => { setLinkCopied(false); },
                    );
                } }
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
              >
                Share
              </button>
              {
                linkCopied && <p>Link copied!</p>

              }
            </div>

          );
        })
      }
    </div>
  );
}

export default DoneRecipes;
