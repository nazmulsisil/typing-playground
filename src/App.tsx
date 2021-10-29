import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './App.styles';
import AppRouter from './components/Router';
import { AppProvider, AppContextProps } from 'context/App';
import { useCopyHolder } from 'hooks/useCopyHolder';

const App: React.FC = () => {
  const copyHolder = useCopyHolder();

  const appContextProps: AppContextProps = {
    copyHolder
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <AppProvider value={appContextProps}>
          <AppRouter />
        </AppProvider>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default App;
