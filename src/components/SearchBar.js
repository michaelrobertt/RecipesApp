import React, { useState } from 'react';

function SearchBar() {
  const [tipoDePesquisa, setTipoDePesquisa] = useState('ingrediente');
  const [refeicaoPesquisada, setRefeicaoPesquisada] = useState('');

  const pesquisar = async () => {
    if (tipoDePesquisa === 'ingrediente') {
      const requisicao = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${refeicaoPesquisada}`);
      const dados = await requisicao.JSON;
      return dados;
    } if (tipoDePesquisa === 'nome') {
      const requisicaoNome = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${refeicaoPesquisada}`);
      const dadosNome = await requisicaoNome.JSON;
      return dadosNome;
    } if (tipoDePesquisa === 'primeiraLetra' && tipoDePesquisa.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const requisicaoLetra = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${refeicaoPesquisada}`);
    const dadosLetra = await requisicaoLetra.JSON;
    return dadosLetra;
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
