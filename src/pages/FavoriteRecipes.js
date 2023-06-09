import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [receitasSalvas, setReceitasSalvas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [filtro, setFiltro] = useState('all');

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

  let receitasFiltradas = receitasSalvas;
  if (filtro !== 'all') {
    receitasFiltradas = receitasSalvas.filter((receita) => receita.type === filtro);
  }

  return (
    <div>
      <Header pesquisaOff titulo="Favorite Recipes" />
      <header className="donerecipebtn">

        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setFiltro('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => setFiltro('meal') }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => setFiltro('drink') }
        >
          Drinks
        </button>
      </header>
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <div>
          {receitasSalvas
      && receitasFiltradas.map((receita, index) => {
        if (receita.type === 'meal') {
          return (
            <div key={ index } className="doneRecipes">
              <div>
                <Link to={ `/${receita.type}s/${receita.id}` }>
                  <receitafav className="receitafavorite">
                    <img
                      className="favoriterecipeimg"
                      src={ receita.image }
                      alt="Imagem da receita favoritada"
                      data-testid={ `${index}-horizontal-image` }
                    />
                    <p
                      className="receitaLink"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${receita.nationality} - ${receita.category}`}
                    </p>
                    <p
                      className="receitaLink"
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {`${receita.name}`}
                    </p>
                  </receitafav>
                </Link>
                <div className="interact-btns">
                  <button
                    className="botaocss"
                    src={ shareIcon }
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => funcaoBotaoCompartilhar(receita.type, receita.id) }
                  >
                    <img src={ shareIcon } alt="Botão Compartilhar" />
                  </button>
                  <button
                    className="botaocss"
                    src={ blackHeartIcon }
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ () => funcaoBotaoDesfavoritar(receita.id) }
                  >
                    <img src={ blackHeartIcon } alt="Botão Desfavoritar" />
                  </button>
                </div>
                {linkCopiado ? (<p>Link copied!</p>) : ''}
              </div>
            </div>
          );
        }
        return (
          <div key={ index }>
            <Link to={ `/${receita.type}s/${receita.id}` }>
              <img
                className="imgComida"
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
            </Link>
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
