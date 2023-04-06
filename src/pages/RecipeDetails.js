import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function RecipeDetails({ match: { params: { id } }, location: { pathname } }) {
  const { respostaDaPesquisa, setRespostaDaPesquisa } = useContext(AppContext);
  const [ingredientes, setingredientes] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const requisicaoDeReceita = async () => {
      if (pathname.includes('drinks')) {
        const requisicao = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const dados = await requisicao.json();
        setRespostaDaPesquisa(dados);
      } else {
        const requisicao = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const dados = await requisicao.json();
        setRespostaDaPesquisa(dados);
      }
    };
    requisicaoDeReceita();
  }, []);

  useEffect(() => {
    if (respostaDaPesquisa) {
      const chaveIngredientes = Object.keys(respostaDaPesquisa).toString();
      const chave = Object.keys(respostaDaPesquisa[chaveIngredientes][0]);
      const todosIngredientes = [];
      chave.forEach((element) => {
        if (element.includes('strIngredient')
        && respostaDaPesquisa[chaveIngredientes][0][element]) {
          todosIngredientes.push(element);
        }
        setingredientes(todosIngredientes);
        setTipo(chaveIngredientes);
      });
    }
  }, [respostaDaPesquisa]);

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
            src={ respostaDaPesquisa[tipo][0].strMealThumb }
            alt={ respostaDaPesquisa[tipo][0].strMeal }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{respostaDaPesquisa[tipo][0].strMeal}</h3>
          <p data-testid="recipe-category">{respostaDaPesquisa[tipo][0].strCategory}</p>
          {ingredientes.map((elemento, index) => (
            <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {respostaDaPesquisa[tipo][0][elemento]}
              {' '}
              {respostaDaPesquisa[tipo][0][`strMeasure${index + 1}`]}
            </p>
          ))}
          <p data-testid="instructions">{respostaDaPesquisa[tipo][0].strInstructions}</p>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ respostaDaPesquisa[tipo][0].strYoutube.replace('watch?v=', 'embed/') }
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
            src={ respostaDaPesquisa[tipo][0].strDrinkThumb }
            alt={ respostaDaPesquisa[tipo][0].strDrink }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{respostaDaPesquisa[tipo][0].strDrink}</h3>
          <p data-testid="recipe-category">{respostaDaPesquisa[tipo][0].strAlcoholic}</p>
          {ingredientes.map((elemento, index) => (
            <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {respostaDaPesquisa[tipo][0][elemento]}
              {' '}
              {respostaDaPesquisa[tipo][0][`strMeasure${index + 1}`]}
            </p>
          ))}
          <p data-testid="instructions">{respostaDaPesquisa[tipo][0].strInstructions}</p>
        </section>
      )}
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
