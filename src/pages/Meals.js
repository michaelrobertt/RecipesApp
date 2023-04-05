import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';

function Meals() {
  const { respostaDaPesquisa } = useContext(AppContext);
  const [renderizaReceita, setRederizaReceita] = useState();
  const [carregando, setCarregando] = useState(true);

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
      <Header titulo="Meals" />
      {carregando ? (<p>carregando...</p>) : (
        renderizaReceita.map((receita, index) => (
          <div
            key={ receita.idMeals }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ receita.strMealThumb }
              alt="Foto da comida"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{receita.strMeal}</p>

          </div>
        ))
      )}
      <Footer />
    </div>
  );
}

export default Meals;
