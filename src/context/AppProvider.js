import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [respotaDaPesquisa, setRespostaDaPesquisa] = useState;

  const values = useMemo(() => ({
    respotaDaPesquisa,
    setRespostaDaPesquisa,
  }), [
    respotaDaPesquisa,
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
