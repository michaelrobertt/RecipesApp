import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton() {
  const { receita } = useContext(AppContext);
  const favoritos = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [receitaFavorita, setreceitaFavorita] = useState(false);

  useEffect(() => {
    if (receita !== undefined && favoritos) {
      const tipoReceitas = Object.keys(receita).toString();
      if (tipoReceitas === 'drinks') {
        const id = receita.drinks[0].idDrink;
        const estaFavoritado = favoritos.some((favRec) => favRec.id === id);
        setreceitaFavorita(estaFavoritado);
      } if (tipoReceitas === 'meals') {
        const id = receita.meals[0].idMeal;
        const estaFavoritado = favoritos.some((favRec) => favRec.id === id);
        setreceitaFavorita(estaFavoritado);
      }
    }
  }, []);

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
    if (!receitaFavorita) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const receitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
    receitasFavoritas.push(receitaData);
    localStorage.setItem('favoriteRecipes', JSON.stringify(receitasFavoritas));
  };

  const removeNoLocalStorage = (receitaData) => {
    const receitasFavoritas = favoritos
      .filter((favoritaReceita) => favoritaReceita.id !== receitaData.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(receitasFavoritas));
  };

  const atualizarLocalStorage = () => {
    const receitaData = formatoReceitaData();
    console.log(receitaFavorita);
    if (!receitaFavorita) {
      adicionarNoLocalStorage(receitaData);
    } if (receitaFavorita) {
      removeNoLocalStorage(receitaData);
    }
    setreceitaFavorita(!receitaFavorita);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ atualizarLocalStorage }
        src={ (receitaFavorita) ? blackHeartIcon : whiteHeartIcon }
      >
        <img
          alt="favorite-icon"
          src={ (receitaFavorita) ? blackHeartIcon : whiteHeartIcon }
        />
      </button>

    </div>
  );
}

export default FavoriteButton;
