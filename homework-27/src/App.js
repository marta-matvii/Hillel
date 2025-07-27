import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Counter from './components/Counter';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Counter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;