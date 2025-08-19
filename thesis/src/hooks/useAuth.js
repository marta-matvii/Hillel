import { useState, useEffect, useCallback } from 'react';

let authState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

let listeners = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener(authState));
};

export const useAuth = () => {
  const [state, setState] = useState(authState);

  useEffect(() => {
    listeners.push(setState);
    
    if (!authState.isAuthenticated) {
      const token = localStorage.getItem('authToken');
      if (token) {
        authState = {
          ...authState,
          isAuthenticated: true,
          user: { username: 'admin', role: 'admin' }
        };
        notifyListeners();
      }
    }

    return () => {
      listeners = listeners.filter(listener => listener !== setState);
    };
  }, []);

  const login = useCallback(async (username, password) => {
    authState = { ...authState, isLoading: true, error: null };
    notifyListeners();

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username === 'admin' && password === 'password123') {
        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('authToken', token);
        
        const userData = { username, role: 'admin' };
        authState = {
          ...authState,
          user: userData,
          isAuthenticated: true,
          isLoading: false,
          error: null
        };
        notifyListeners();
        
        return { success: true, user: userData, token };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      authState = {
        ...authState,
        error: error.message,
        isAuthenticated: false,
        isLoading: false
      };
      notifyListeners();
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    authState = {
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null
    };
    notifyListeners();
  }, []);

  const clearError = useCallback(() => {
    authState = { ...authState, error: null };
    notifyListeners();
  }, []);

  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
    clearError,
  };
};