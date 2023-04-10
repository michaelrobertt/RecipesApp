import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecommendationCard from '../components/RecommendationCard';
import AppContext from '../context/AppContext';

function RecipeDetails({ match: { params: { id } }, location: { pathname } }) {
  const { setRecomendacoes } = useContext(AppContext);
  const [receita, setReceita] = useState();
  const [ingredientes, setingredientes] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [receitaCompleta, setReceitaCompleta] = useState(false);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    const requisicaoDeReceita = async () => {
      if (pathname.includes('drinks')) {
        const requisicao = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const dados = await requisicao.json();
        const requisicaoRecomendacoes = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const dadosRecomendacoes = await requisicaoRecomendacoes.json();
        setReceita(dados);
        setRecomendacoes(dadosRecomendacoes);
      } else {
        const requisicao = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const dados = await requisicao.json();
        const requisicaoRecomendacoes = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const dadosRecomendacoes = await requisicaoRecomendacoes.json();
        setReceita(dados);
        setRecomendacoes(dadosRecomendacoes);
      }
    };
    requisicaoDeReceita();
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
    if (doneRecipes) {
      doneRecipes.forEach((item) => {
        if (item.id === id) {
          setReceitaCompleta(true);
        }
      });
    }
  }, [doneRecipes]);

  useEffect(() => {
    if (ingredientes) {
      setCarregando(false);
    }
  }, [ingredientes]);

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
          <h3 data-testid="recipe-title">{receita[tipo][0].strMeal}</h3>
          <p data-testid="recipe-category">{receita[tipo][0].strCategory}</p>
          {ingredientes.map((elemento, index) => (
            <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {receita[tipo][0][elemento]}
              {' '}
              {receita[tipo][0][`strMeasure${index + 1}`]}
            </p>
          ))}
          <p data-testid="instructions">{receita[tipo][0].strInstructions}</p>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ receita[tipo][0].strYoutube.replace('watch?v=', 'embed/') }
            title="YouTube video player"
            allow="accelerometer;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture"
            allowFullScreen
          />
        </section>
      ) : (
        <section>
          <img
            src={ receita[tipo][0].strDrinkThumb }
            alt={ receita[tipo][0].strDrink }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{receita[tipo][0].strDrink}</h3>
          <p data-testid="recipe-category">{receita[tipo][0].strAlcoholic}</p>
          {ingredientes.map((elemento, index) => (
            <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {receita[tipo][0][elemento]}
              {' '}
              {receita[tipo][0][`strMeasure${index + 1}`]}
            </p>
          ))}
          <p data-testid="instructions">{receita[tipo][0].strInstructions}</p>
        </section>
      )}
      <RecommendationCard />
      {!receitaCompleta ? (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ startRecipe }
          style={ {
            position: 'fixed',
            bottom: 0,
          } }
        >
          Start Recipe
        </button>) : null}
    </div>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeDetails;
