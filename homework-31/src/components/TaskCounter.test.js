import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../store/todoSlice';
import TaskCounter from './TaskCounter.js';

const createTestStore = (tasksArray) => {
  return configureStore({
    reducer: {
      todo: todoReducer
    },
    preloadedState: {
      todo: { tasks: tasksArray }
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

describe('TaskCounter', () => {
  test('should show correct task count for different numbers of tasks', () => {
    const emptyStore = createTestStore([]);
    const { rerender } = renderWithProvider(<TaskCounter />, emptyStore);
    expect(screen.getByText(/загальна кількість завдань: 0/i)).toBeInTheDocument();

    const oneTaskStore = createTestStore([
      { id: 1, text: 'Перше завдання', completed: false }
    ]);
    rerender(
      <Provider store={oneTaskStore}>
        <TaskCounter />
      </Provider>
    );
    expect(screen.getByText(/загальна кількість завдань: 1/i)).toBeInTheDocument();

    const manyTasksStore = createTestStore([
      { id: 1, text: 'Завдання 1', completed: false },
      { id: 2, text: 'Завдання 2', completed: true },
      { id: 3, text: 'Завдання 3', completed: false }
    ]);
    rerender(
      <Provider store={manyTasksStore}>
        <TaskCounter />
      </Provider>
    );
    expect(screen.getByText(/загальна кількість завдань: 3/i)).toBeInTheDocument();
  });
});