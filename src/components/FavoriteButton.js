import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function FavoriteButton() {
  const { receita } = useContext(AppContext);
  const favoritos = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const formatoReceitaData = () => {
    if (receita.meals) {
      const receitaData = {
        id: receita.meals[0].idMeal,
        type: 'meal',
        nationality: receita.meals[0].strArea,
        category: receita.meals[0].strCategory,
        alcoholicOrNot: (receita.meals[0]
          .strDrinkAlternate ? receita.meals[0].strDrinkAlternate : ''),
        name: receita.meals[0].strMeal,
        image: receita.meals[0].strMealThumb,
      };
      return receitaData;
    }
    const receitaData = {
      id: receita.drinks[0].idDrink,
      type: 'drink',
      nationality: (receita.drinks[0].strArea ? receita.drinks[0].strArea : ''),
      category: receita.drinks[0].strCategory,
      alcoholicOrNot: receita.drinks[0].strAlcoholic,
      name: receita.drinks[0].strDrink,
      image: receita.drinks[0].strDrinkThumb,
    };
    return receitaData;
  };

  const adicionarNoLocalStorage = (receitaData) => {
    if (!favoritos) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const receitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
    receitasFavoritas.push(receitaData);
    localStorage.setItem('favoriteRecipes', JSON.stringify(receitasFavoritas));
  };

  const atualizarLocalStorage = () => {
    const receitaData = formatoReceitaData();
    if (receitaData) {
      adicionarNoLocalStorage(receitaData);
    }
  };

  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ atualizarLocalStorage }
      >
        Favoritar
      </button>

    </div>
  );
}

export default FavoriteButton;
