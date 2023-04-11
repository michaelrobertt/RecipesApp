import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';

function Meals() {
  const { respostaDaPesquisa, setRespostaDaPesquisa } = useContext(AppContext);
  const [renderizaReceita, setRederizaReceita] = useState();
  const [categoriaComida, setCategoriaComida] = useState();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState();
  const [carregando, setCarregando] = useState(true);

  const requisicaoPadrao = async () => {
    const requisicao = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const dados = await requisicao.json();
    setRespostaDaPesquisa(dados.meals);
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
        const requisicao = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const dados = await requisicao.json();
        const cincoComidas = dados.meals.slice(0, numeroDeReceitas);
        setCategoriaComida(cincoComidas);
        setCarregando(false);
      };
      dozeReceitas();
      requisicaoCategoria();
    }
  }, [respostaDaPesquisa]);

  const requisicaoPorCategoria = async (category) => {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await request.json();
    setRespostaDaPesquisa(data.meals);
    setCategoriaSelecionada(true);
    if (categoriaSelecionada) {
      requisicaoPadrao();
    }
  };

  return (
    <div className="secaoComidaDrink">
      <Header titulo="Meals" />
      <div className="botaoMealsDrink">
        <button
          type="button"
          className="meals-btnCategory"
          onClick={ () => { requisicaoPadrao(); } }
          data-testid="All-category-filter"
        >
          All
        </button>
        { categoriaComida && categoriaComida.map((ele, index2) => (
          <div key={ index2 }>
            <button
              type="button"
              className="meals-btnCategory"
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
            <div className="comidaCard" key={ receita.idMeals }>
              <Link
                className="receitaLink"
                to={ `/meals/${receita.idMeal}` }
                data-testid={ `${index}-recipe-card` }
              >
                <div>
                  <img
                    src={ receita.strMealThumb }
                    alt="Foto da comida"
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-card-name` }>{receita.strMeal}</p>
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

export default Meals;
