import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [receitasSalvas, setReceitasSalvas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [linkCopiado, setLinkCopiado] = useState(false);

  useEffect(() => {
    const receitasDoUsuario = localStorage.getItem('favoriteRecipes');
    const receitasDoUsuarioObjeto = JSON.parse(receitasDoUsuario);
    setReceitasSalvas(receitasDoUsuarioObjeto);
    setCarregando(false);
  }, [], [receitasSalvas]);

  const funcaoBotaoCompartilhar = (tipoReceita, idReceita) => {
    const tempoDeMsg = 3000;
    navigator.clipboard.writeText(`http://localhost:3000/${tipoReceita}s/${idReceita}`);
    setLinkCopiado(true);
    setTimeout(() => {
      setLinkCopiado(false);
    }, tempoDeMsg);
  };

  const funcaoBotaoDesfavoritar = (idReceita) => {
    const receitasFiltradas = receitasSalvas.filter(
      (receita) => receita.id !== idReceita,
    );
    setReceitasSalvas(receitasFiltradas);
    localStorage.setItem('favoriteRecipes', JSON.stringify(receitasFiltradas));
  };

  return (
    <div>
      <Header pesquisaOff titulo="Favorite Recipes" />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Food</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <div>
          {receitasSalvas
      && receitasSalvas.map((receita, index) => {
        if (receita.type === 'meal') {
          return (
            <div key={ index }>
              <img
                src={ receita.image }
                alt="Imagem da receita favoritada"
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${receita.nationality} - ${receita.category}`}
              </p>
              <p data-testid={ `${index}-horizontal-name` }>
                {`${receita.name}`}
              </p>
              <button
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => funcaoBotaoCompartilhar(receita.type, receita.id) }
              >
                <img src={ shareIcon } alt="Botão Compartilhar" />
              </button>
              <button
                src={ blackHeartIcon }
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => funcaoBotaoDesfavoritar(receita.id) }
              >
                <img src={ blackHeartIcon } alt="Botão Desfavoritar" />
              </button>
              {linkCopiado ? (<p>Link copied!</p>) : ''}
            </div>
          );
        }
        return (
          <div key={ index }>
            <img
              src={ receita.image }
              alt="Imagem da receita favoritada"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${receita.alcoholicOrNot}`}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>
              {`${receita.name}`}
            </p>
            <button
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => funcaoBotaoCompartilhar(receita.type, receita.id) }
            >
              <img src={ shareIcon } alt="Botão Compartilhar" />
            </button>
            <button
              src={ blackHeartIcon }
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => funcaoBotaoDesfavoritar(receita.id) }
            >
              <img src={ blackHeartIcon } alt="Botão Desfavoritar" />
            </button>
            {linkCopiado ? (<p>Link copied!</p>) : ''}
          </div>
        );
      })}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
