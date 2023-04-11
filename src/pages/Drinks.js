import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';

function Drinks() {
  const { respostaDaPesquisa, setRespostaDaPesquisa } = useContext(AppContext);
  const [categoriaBebida, setCategoriaBebida] = useState();
  const [renderizaReceita, setRederizaReceita] = useState();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState();
  const [carregando, setCarregando] = useState(true);

  const requisicaoPadrao = async () => {
    const requisicao = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const dados = await requisicao.json();
    setRespostaDaPesquisa(dados.drinks);
  };

  useEffect(() => {
    requisicaoPadrao();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (respostaDaPesquisa) {
      const dozeReceitas = () => {
        const numeroDeReceitas = 12;
        const receitas = respostaDaPesquisa.slice(0, numeroDeReceitas);
        setRederizaReceita(receitas);
      };
      const requisicaoCategoria = async () => {
        const numeroDeReceitas = 5;
        const requisicao = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const dados = await requisicao.json();
        const cincoBebidas = dados.drinks.slice(0, numeroDeReceitas);
        setCategoriaBebida(cincoBebidas);
        setCarregando(false);
      };
      dozeReceitas();
      requisicaoCategoria();
    }
  }, [respostaDaPesquisa]);

  const requisicaoPorCategoria = async (category) => {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await request.json();
    setRespostaDaPesquisa(data.drinks);
    setCategoriaSelecionada(true);
    if (categoriaSelecionada) {
      requisicaoPadrao();
    }
  };

  return (
    <div className="secaoComidaDrink">
      <Header titulo="Drinks" />
      <div className="botaoMealsDrink">
        <button
          type="button"
          className="drinks-btnCategory"
          onClick={ () => { requisicaoPadrao(); } }
          data-testid="All-category-filter"
        >
          All
        </button>
        { categoriaBebida && categoriaBebida.map((ele, index2) => (
          <div key={ index2 }>
            <button
              type="button"
              className="drinks-btnCategory"
              id={ ele.strCategory }
              data-testid={ `${ele.strCategory}-category-filter` }
              onClick={ () => requisicaoPorCategoria(ele.strCategory) }
            >
              { ele.strCategory }
            </button>
          </div>
        ))}
      </div>
      <div className="cardapio">
        {carregando ? (<p>carregando...</p>) : (
          renderizaReceita.map((receita, index) => (
            <div className="comidaCard" key={ receita.idDrink }>
              <Link
                className="receitaLink"
                to={ `/drinks/${receita.idDrink}` }
                data-testid={ `${index}-recipe-card` }
              >
                <div>
                  <img
                    src={ receita.strDrinkThumb }
                    alt="Foto da comida"
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-card-name` }>{receita.strDrink}</p>
                </div>
              </Link>
            </div>
          ))
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Drinks;
