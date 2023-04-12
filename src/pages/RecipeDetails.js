import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecommendationCard from '../components/RecommendationCard';
import AppContext from '../context/AppContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

function RecipeDetails({ match: { params: { id } }, location: { pathname } }) {
  const { setRecomendacoes, receita, setReceita } = useContext(AppContext);
  const history = useHistory();
  const [ingredientes, setingredientes] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [receitaCompleta, setReceitaCompleta] = useState(false);
  const [receitaEmAndamento, setReceitaEmAndamento] = useState(false);
  const receitasProntas = JSON.parse(localStorage.getItem('doneRecipes'));
  const receitasComecadas = JSON.parse(localStorage.getItem('inProgressRecipes'));

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
    if (receitasProntas) {
      receitasProntas.forEach((item) => {
        if (item.id === id) {
          setReceitaCompleta(true);
        }
      });
    }
  }, [receitasProntas]);

  useEffect(() => {
    if (receitasComecadas && tipo) {
      console.log(receitasComecadas);
      console.log(tipo);
      const idReceitasComecadas = Object.keys(receitasComecadas[tipo]);
      idReceitasComecadas.forEach((item) => {
        if (item === id) {
          setReceitaEmAndamento(true);
        }
      });
    }
  }, [receitasComecadas, tipo]);

  const iniciarReceita = () => {
    history.push(`${pathname}/in-progress`);
  };

  useEffect(() => {
    if (ingredientes) {
      setCarregando(false);
    }
  }, [ingredientes]);

  if (carregando) { return <h1>Carregando...</h1>; }
  return (
    <div>
      <ShareButton />
      <FavoriteButton />
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
          onClick={ iniciarReceita }
          style={ {
            position: 'fixed',
            bottom: 0,
          } }
        >
          Start Recipe
        </button>) : null}
      {receitaEmAndamento ? (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ iniciarReceita }
          style={ {
            position: 'fixed',
            bottom: 0,
          } }
        >
          Continue Recipe
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
