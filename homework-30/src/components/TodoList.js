import React from 'react';
import { useSelector } from 'react-redux';
import { List, Typography, Box, CircularProgress } from '@mui/material';
import TodoItem from './TodoItem';

function TodoList() {
  const { todos, loading } = useSelector(state => state.todos);

  if (loading && todos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Завантажую завдання...
        </Typography>
      </Box>
    );
  }

  if (todos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Немає завдань. Додайте перше завдання!
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
}

export default TodoList;