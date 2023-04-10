import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/RecommendationCard.css';

function RecommendationCard() {
  const { recomendacoes } = useContext(AppContext);
  const [dados, setDados] = useState();
  const tipo = Object.keys(recomendacoes).toString();

  useEffect(() => {
    const seisRecomendacoes = () => {
      if (tipo) {
        if (tipo === 'drinks') {
          console.log(recomendacoes);
          console.log(tipo);
          const chave = 6;
          const recomendacoesDados = recomendacoes[tipo].slice(0, chave);
          setDados(recomendacoesDados);
        } {
          const chave = 6;
          const recomendacoesDados = recomendacoes[tipo].slice(0, chave);
          setDados(recomendacoesDados);
        }
      }
    };
    seisRecomendacoes();
  }, []);

  console.log(dados);
  return (
    <>
      <h1>Recomendações</h1>
      {dados ? (
        <div className="container-recomendacao">
          <div className="container">
            {tipo === 'drinks' ? (
              <section className="galeria">
                {dados.map((element, i) => (
                  <Link
                    data-testid={ `${i}-recommendation-card` }
                    key={ element.idDrink }
                    to={ `/drinks/${element.idDrink}` }
                    // onClick={ () => window.location.replace(`/drinks/${element.idDrink}`) }
                  >
                    <img src={ element.strDrinkThumb } alt={ element.strCategory } />
                    <p data-testid={ `${i}-recommendation-title` }>{element.strDrink}</p>
                  </Link>
                ))}
              </section>
            ) : (
              <section className="galeria">
                {dados.map((element, i) => (
                  <Link
                    data-testid={ `${i}-recommendation-card` }
                    key={ element.idMeal }
                    to={ `/meals/${element.idMeal}` }
                    // onClick={ () => window.location.replace(`/meals/${element.idMeal}`) }
                  >
                    <img src={ element.strMealThumb } alt={ element.strCategory } />
                    <p data-testid={ `${i}-recommendation-title` }>{element.strMeal}</p>
                  </Link>
                ))}
              </section>)}
          </div>
        </div>) : null}

    </>
  );
}

export default RecommendationCard;
