import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';

function Meals() {
  const { respostaDaPesquisa, setRespostaDaPesquisa } = useContext(AppContext);
  const [renderizaReceita, setRederizaReceita] = useState();
  const [categoriaComida, setCategoriaComida] = useState();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const requisicaoPadrao = async () => {
      const requisicao = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const dados = await requisicao.json();
      console.log(dados);
      setRespostaDaPesquisa(dados.meals);
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

  console.log(renderizaReceita);

  return (
    <div>
      <Header titulo="Meals" />
      {carregando ? (<p>carregando...</p>) : (
        renderizaReceita.map((receita, index) => (
          <div key={ receita.idMeals }>
            <button
              type="button"
              className="meals-btnCategory"
              onClick={ () => { requisicaoPadrao(); } }
              data-testid="All-category-filter"
            >
              All
            </button>
            {categoriaComida.map((ele, index2) => (
              <div key={ index2 }>
                <button
                  type="button"
                  className="meals-btnCategory"
                  id={ ele.strCategory }
                  data-testid={ `${ele.strCategory}-category-filter` }
                >
                  { ele.strCategory }
                </button>
              </div>
            ))}
            <div
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ receita.strMealThumb }
                alt="Foto da comida"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{receita.strMeal}</p>

            </div>
          </div>
        ))
      )}
      <Footer />
    </div>
  );
}

export default Meals;
