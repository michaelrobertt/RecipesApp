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
  const alerta = 'Sorry, we haven\'t found any recipes for these filters.';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comidaDados]);

  const pesquisarComidaIngrediente = async () => {
    if (tipoDePesquisa === 'ingrediente' && refeicaoPesquisada !== '') {
      const requisicao = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${refeicaoPesquisada}`);
      const dados = await requisicao.json();
      if (dados.meals === null) {
        global.alert(alerta);
      }
      return setComidaDados(dados.meals);
    }
  };

  const pesquisarComidaNome = async () => {
    if (tipoDePesquisa === 'nome' && refeicaoPesquisada !== '') {
      const requisicaoNome = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${refeicaoPesquisada}`);
      const dadosNome = await requisicaoNome.json();
      if (dadosNome.meals === null) {
        global.alert(alerta);
      }
      return setComidaDados(dadosNome.meals);
    }
  };

  const pesquisarComidaLetra = async () => {
    if (tipoDePesquisa === 'primeiraLetra' && refeicaoPesquisada !== ''
    && refeicaoPesquisada.length === 1) {
      const requisicaoLetra = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${refeicaoPesquisada}`);
      const dadosLetra = await requisicaoLetra.json();
      if (dadosLetra.meals === null) {
        global.alert(alerta);
      }
      return setComidaDados(dadosLetra.meals);
    }
  };

  const pesquisarBebidaIngrediente = async () => {
    if (tipoDePesquisa === 'ingrediente' && refeicaoPesquisada !== '') {
      try {
        const requisicao = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${refeicaoPesquisada}`);
        const dados = await requisicao.json();
        return setComidaDados(dados.drinks);
      } catch (erro) {
        global.alert(alerta);
      }
    }
  };

  const pesquisarBebidaNome = async () => {
    if (tipoDePesquisa === 'nome' && refeicaoPesquisada !== '') {
      const requisicaoNome = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${refeicaoPesquisada}`);
      const dadosNome = await requisicaoNome.json();
      if (dadosNome.drinks === null) {
        global.alert(alerta);
      }
      return setComidaDados(dadosNome.drinks);
    }
  };

  const pesquisarBebidaLetra = async () => {
    if (tipoDePesquisa === 'primeiraLetra' && refeicaoPesquisada !== ''
    && refeicaoPesquisada.length === 1) {
      const requisicaoLetra = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${refeicaoPesquisada}`);
      const dadosLetra = await requisicaoLetra.json();
      if (dadosLetra.drinks === null) {
        global.alert(alerta);
      }
      return setComidaDados(dadosLetra.drinks);
    }
  };

  const pesquisar = () => {
    if (tipoDePesquisa === 'primeiraLetra' && refeicaoPesquisada.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } if (location.pathname === '/meals') {
      pesquisarComidaIngrediente();
      pesquisarComidaNome();
      pesquisarComidaLetra();
    } if (location.pathname === '/drinks') {
      pesquisarBebidaIngrediente();
      pesquisarBebidaNome();
      pesquisarBebidaLetra();
    }
  };

  return (
    <div className="search">
      <div className="pesquisa-search">
        <input
          type="text"
          data-testid="search-input"
          name="barraDePesquisa"
          value={ refeicaoPesquisada }
          onChange={ (e) => setRefeicaoPesquisada(e.target.value) }
          placeholder="Search..."
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          name="botaoDePesquisa"
          onClick={ () => pesquisar() }
        >
          Pesquisar
        </button>
      </div>
      <div className="pesquisa-filters">
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
            id="primeiraLetra"
            name="primeiraLetra"
            value="primeiraLetra"
            checked={ tipoDePesquisa === 'primeiraLetra' }
            onChange={ () => setTipoDePesquisa('primeiraLetra') }
          />
          Primeira Letra
        </label>
      </div>
    </div>
  );
}

export default SearchBar;
