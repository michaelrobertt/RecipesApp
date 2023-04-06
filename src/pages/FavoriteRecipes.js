import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  const [receitasSalvas, setReceitasSalvas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const receitasDoUsuario = localStorage.getItem('favoriteRecipes');
    const receitasDoUsuarioObjeto = JSON.parse(receitasDoUsuario);
    setReceitasSalvas(receitasDoUsuarioObjeto);
    setCarregando(false);
  }, []);

  return (
    <div>
      <Header pesquisaOff titulo="Favorite Recipes" />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Food</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      { carregando ? (<p>Carregando...</p>) : (
        receitasSalvas && receitasSalvas.map((receita, index) => (
          <div key={ index }>
            <img
              src={ receita.image }
              alt="Imagem da receita favoritada"
              data-testid={ `${index}-horizontal-image` }
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`Categoria: ${receita.category}`}
            </p>
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              {`Categoria: ${receita.name}`}
            </p>
            <button data-testid={ `${index}-horizontal-share-btn` }>Compartilhar</button>
            <button data-testid={ `${index}-horizontal-favorite-btn` }>Favoritar</button>
          </div>
        ))
      )}

      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
