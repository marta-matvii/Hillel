import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store/index';
import { checkAuthStatus } from './store/slices/authSlice';
import LoginPage from './pages/Login';

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

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AuthChecker = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return children;
};

const AppContent = () => {
  return (
    <AuthChecker>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/products" 
          element={
            <ProtectedRoute>
              <div style={{ padding: '20px' }}>
                <h1>Products Page (Coming Soon)</h1>
                <button 
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    window.location.reload();
                  }}
                  style={{
                    backgroundColor: '#52c263',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Logout (Test)
                </button>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/preview" 
          element={
            <ProtectedRoute>
              <div>Preview Page (Coming Soon)</div>
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthChecker>
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