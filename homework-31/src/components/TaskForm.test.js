import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../store/todoSlice';
import TaskForm from './TaskForm';

const createTestStore = () => {
  return configureStore({
    reducer: {
      todo: todoReducer
    }
  });
};

const renderWithProvider = (component) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('TaskForm', () => {
  test('should disable submit button when input has less than 5 characters', async () => {
    const user = userEvent.setup();
    
    renderWithProvider(<TaskForm />);
    
    const input = screen.getByRole('textbox', { name: /нове завдання/i });
    const button = screen.getByRole('button', { name: /додати завдання/i });
    
    expect(button).toBeDisabled();
    
    await user.type(input, 'Test');
    
    expect(button).toBeDisabled();
    
    await user.clear(input);
    await user.type(input, 'Валідне завдання');
    
    expect(button).toBeEnabled();
  });
});