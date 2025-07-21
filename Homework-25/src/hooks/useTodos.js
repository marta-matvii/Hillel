import { useState, useEffect } from 'react';

function useTodos() {
  // Завантажуємо todos з localStorage або порожній масив
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // Зберігаємо todos в localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Додати TODO
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Простий спосіб генерувати ID
      text: text.trim(),
      createdAt: new Date().toLocaleString('uk-UA')
    };
    setTodos(prev => [...prev, newTodo]); // Додаємо в кінець списку
  };

  // Видалити TODO
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id)); // Фільтруємо по ID
  };

  return { todos, addTodo, deleteTodo };
}

export default useTodos;