import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

function SearchBar() {
  const { setRespostaDaPesquisa } = useContext(AppContext);
  const [tipoDePesquisa, setTipoDePesquisa] = useState('ingrediente');
  const [refeicaoPesquisada, setRefeicaoPesquisada] = useState('');
  const [comidaDados, setComidaDados] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (comidaDados) {
      if (location.pathname === '/meals') {
        if (comidaDados.length === 1) {
          history.push(`/meals/${comidaDados[0].idMeal}`);
        }
        setRespostaDaPesquisa(comidaDados);
      }
      if (location.pathname === '/drinks') {
        if (comidaDados.length === 1) {
          history.push(`/drinks/${comidaDados[0].idDrink}`);
        }
        setRespostaDaPesquisa(comidaDados);
      }
    }
  }, [comidaDados]);

  const verificaFiltros = () => {
    console.log(comidaDados);
    if (comidaDados === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const pesquisarComida = async () => {
    if (tipoDePesquisa === 'ingrediente') {
      const requisicao = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${refeicaoPesquisada}`);
      const dados = await requisicao.json();
      return setComidaDados(dados.meals);
    } if (tipoDePesquisa === 'nome') {
      const requisicaoNome = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${refeicaoPesquisada}`);
      const dadosNome = await requisicaoNome.json();
      return setComidaDados(dadosNome.meals);
    } if (tipoDePesquisa === 'primeiraLetra' && tipoDePesquisa.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const requisicaoLetra = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${refeicaoPesquisada}`);
    const dadosLetra = await requisicaoLetra.json();
    return setComidaDados(dadosLetra.meals);
  };

  const pesquisarBebida = async () => {
    if (tipoDePesquisa === 'ingrediente') {
      const requisicao = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${refeicaoPesquisada}`);
      const dados = await requisicao.json();
      return setComidaDados(dados.drinks);
    } if (tipoDePesquisa === 'nome') {
      const requisicaoNome = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${refeicaoPesquisada}`);
      const dadosNome = await requisicaoNome.json();
      return setComidaDados(dadosNome.drinks);
    } if (tipoDePesquisa === 'primeiraLetra' && tipoDePesquisa.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const requisicaoLetra = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${refeicaoPesquisada}`);
    const dadosLetra = await requisicaoLetra.json();
    return setComidaDados(dadosLetra.drinks);
  };

  const pesquisar = async () => {
    if (location.pathname === '/meals') {
      pesquisarComida();
      verificaFiltros();
    }
    if (location.pathname === '/drinks') {
      pesquisarBebida();
      verificaFiltros();
    }
  };

  return (
    <>
      <div>SearchBar</div>
      <input
        type="text"
        data-testid="search-input"
        name="barraDePesquisa"
        onChange={ (e) => setRefeicaoPesquisada(e.target.value) }
      />
      <label htmlFor="ingrediente">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingrediente"
          name="ingrediente"
          value="ingrediente"
          checked={ tipoDePesquisa === 'ingrediente' }
          onChange={ () => setTipoDePesquisa('ingrediente') }
        />
        Ingrediente
      </label>
      <label htmlFor="nome">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="nome"
          name="nome"
          value="nome"
          checked={ tipoDePesquisa === 'nome' }
          onChange={ () => setTipoDePesquisa('nome') }
        />
        Nome
      </label>
      <label htmlFor="primeiraLetra">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="PrimeiraLetra"
          name="primeiraLetra"
          value="primeiraLetra"
          checked={ tipoDePesquisa === 'primeiraLetra' }
          onChange={ () => setTipoDePesquisa('primeiraLetra') }
        />
        Primeira Letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        name="botaoDePesquisa"
        onClick={ () => pesquisar() }
      >
        Pesquisar
      </button>
    </>
  );
}

export default SearchBar;
