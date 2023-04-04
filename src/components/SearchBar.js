import React from 'react';

function SearchBar() {
  return (
    <>
      <div>SearchBar</div>
      <input
        type="text"
        data-testid="search-input"
        name="barraDePesquisa"
      />
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        name="ingrediente"
      />
      <input
        type="radio"
        data-testid="name-search-radio"
        name="nome"
      />
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        name="primeiraLetra"
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        name="botaoDePesquisa"
      >
        Pesquisar
      </button>
    </>
  );
}

export default SearchBar;
