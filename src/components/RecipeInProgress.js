import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../App.css';

function RecipeInProgress({ match: { params: { id } }, location: { pathname } }) {
  const [receita, setReceita] = useState();
  const [ingredientes, setingredientes] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [selectedIngredients, setSelectedIngredients] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) || [],
  );

  useEffect(() => {
    const requisicaoDeReceita = async () => {
      if (pathname.includes('drinks')) {
        const requisicao = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const dados = await requisicao.json();
        setReceita(dados);
      } else {
        const requisicao = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const dados = await requisicao.json();
        setReceita(dados);
      }
    };
    requisicaoDeReceita();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (receita) {
      const chaveIngredientes = Object.keys(receita).toString();
      const chave = Object.keys(receita[chaveIngredientes][0]);
      const todosIngredientes = [];
      chave.forEach((element) => {
        if (element.includes('strIngredient')
        && receita[chaveIngredientes][0][element]) {
          todosIngredientes.push(element);
        }
        setingredientes(todosIngredientes);
        setTipo(chaveIngredientes);
      });
    }
  }, [receita]);

  useEffect(() => {
    if (ingredientes) {
      setCarregando(false);
    }
  }, [ingredientes]);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;

    if (selectedIngredients.includes(value)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== value));
    } else {
      setSelectedIngredients([...selectedIngredients, value]);
    }
  };

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(selectedIngredients));
  }, [selectedIngredients]);

  if (carregando) { return <h1>Carregando...</h1>; }
  return (
    <div>
      {!pathname.includes('drinks') ? (
        <section>
          <img
            src={ receita[tipo][0].strMealThumb }
            alt={ receita[tipo][0].strMeal }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{receita[tipo][0].strMeal}</h1>
          <button
            src={ shareIcon }
            data-testid="share-btn"
            // onClick={ () => funcaoBotaoCompartilhar(receita.type, receita.id) }
          >
            <img src={ shareIcon } alt="Botão Compartilhar" />
          </button>
          <button
            src={ whiteHeartIcon }
            data-testid="favorite-btn"
            // onClick={ () => funcaoBotaoDesfavoritar(receita.id) }
          >
            <img src={ whiteHeartIcon } alt="Botão Favoritar" />
          </button>
          <p data-testid="recipe-category">{receita[tipo][0].strCategory}</p>
          <h2>Ingredients</h2>
          {ingredientes.map((elemento, index) => (
            <div key={ index }>
              <label
                className={ selectedIngredients.includes(receita[tipo][0][elemento])
                  ? 'strike' : '' }
                htmlFor={ receita.meals.idMeal }
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ receita.meals.idMeal }
                  name={ receita[tipo][0][elemento] }
                  value={ receita[tipo][0][elemento] }
                  checked={ selectedIngredients.includes(receita[tipo][0][elemento]) }
                  onChange={ handleCheckboxChange }
                />
                {receita[tipo][0][elemento]}
                {' '}
                {receita[tipo][0][`strMeasure${index + 1}`]}
              </label>
            </div>
          ))}
          <h2>Instructions</h2>
          <p data-testid="instructions">{receita[tipo][0].strInstructions}</p>
        </section>
      ) : (
        <section>
          <img
            src={ receita[tipo][0].strDrinkThumb }
            alt={ receita[tipo][0].strDrink }
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{receita[tipo][0].strDrink}</h1>
          <button
            src={ shareIcon }
            data-testid="share-btn"
            // onClick={ () => funcaoBotaoCompartilhar(receita.type, receita.id) }
          >
            <img src={ shareIcon } alt="Botão Compartilhar" />
          </button>
          <button
            src={ whiteHeartIcon }
            data-testid="favorite-btn"
            // onClick={ () => funcaoBotaoDesfavoritar(receita.id) }
          >
            <img src={ whiteHeartIcon } alt="Botão Favoritar" />
          </button>
          <p data-testid="recipe-category">{receita[tipo][0].strAlcoholic}</p>
          <h2>Ingredients</h2>
          {ingredientes.map((elemento, index) => (
            <div key={ index }>
              <label
                className={ selectedIngredients.includes(receita[tipo][0][elemento])
                  ? 'strike' : '' }
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ receita.drinks.idDrinks }
              >
                <input
                  type="checkbox"
                  id={ receita.drinks.idDrinks }
                  name={ receita[tipo][0][elemento] }
                  value={ receita[tipo][0][elemento] }
                  checked={ selectedIngredients.includes(receita[tipo][0][elemento]) }
                  onChange={ handleCheckboxChange }
                />
                {receita[tipo][0][elemento]}
                {' '}
                {receita[tipo][0][`strMeasure${index + 1}`]}
              </label>
            </div>
          ))}
          <h2>Instructions</h2>
          <p data-testid="instructions">{receita[tipo][0].strInstructions}</p>
        </section>
      )}
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeInProgress;
