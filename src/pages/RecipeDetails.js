import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function RecipeDetails({ match: { params: { id } }, location: { pathname } }) {
  const { respostaDaPesquisa, setRespostaDaPesquisa } = useContext(AppContext);

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

  console.log(respostaDaPesquisa);
  return (
    <div>
      RecipeDetails
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
