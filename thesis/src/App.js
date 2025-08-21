import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store/index';
import LoginPage from './pages/Login';
import ProductsPage from './pages/Products';
import PreviewPage from './pages/Preview';
import { ProtectedRoute } from './components';

const theme = createTheme({
  palette: {
    primary: {
      main: '#52c263',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const AppContent = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/products" 
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/preview" 
        element={
          <ProtectedRoute>
            <PreviewPage />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;