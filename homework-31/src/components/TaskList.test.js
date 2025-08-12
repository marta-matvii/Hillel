import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../store/todoSlice';
import TaskList from './TaskList.js';

const createTestStore = (initialState = { tasks: [] }) => {
  return configureStore({
    reducer: {
      todo: todoReducer
    },
    preloadedState: {
      todo: initialState
    }
  });
};

const renderWithProvider = (component, store) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('TaskList', () => {
  test('should show empty message when no tasks', () => {
    const store = createTestStore({ tasks: [] });
    
    renderWithProvider(<TaskList />, store);
    
    expect(screen.getByText(/мої завдання \(0\)/i)).toBeInTheDocument();
    
    expect(screen.getByText(/поки немає завдань/i)).toBeInTheDocument();
  });
});