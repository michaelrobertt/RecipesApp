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
    </>
  );
}

export default SearchBar;
