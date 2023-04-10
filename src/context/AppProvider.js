import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [respostaDaPesquisa, setRespostaDaPesquisa] = useState();
  const [recomendacoes, setRecomendacoes] = useState();

  const values = useMemo(() => ({
    respostaDaPesquisa,
    setRespostaDaPesquisa,
    recomendacoes,
    setRecomendacoes,
  }), [
    recomendacoes,
    setRecomendacoes,
    respostaDaPesquisa,
    setRespostaDaPesquisa,
  ]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
