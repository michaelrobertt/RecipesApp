import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';

function Drinks() {
  const { respostaDaPesquisa, setRespostaDaPesquisa } = useContext(AppContext);
  const [renderizaReceita, setRederizaReceita] = useState();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const requisicaoPadrao = async () => {
      const requisicao = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const dados = await requisicao.json();
      return setRespostaDaPesquisa(dados.drinks);
    };
    requisicaoPadrao();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (respostaDaPesquisa) {
      const dozeReceitas = () => {
        const numeroDeReceitas = 12;
        const receitas = respostaDaPesquisa.slice(0, numeroDeReceitas);
        setRederizaReceita(receitas);
        setCarregando(false);
      };
      dozeReceitas();
    }
  }, [respostaDaPesquisa]);

  return (
    <div>
      <Header titulo="Drinks" />
      {carregando ? (<p>Carregando...</p>) : (
        renderizaReceita.map((receita, index) => (
          <div
            key={ receita.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ receita.strDrinkThumb }
              alt="Foto da bebida"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{receita.strDrink}</p>

          </div>
        ))
      )}
      <Footer />
    </div>
  );
}

export default Drinks;
