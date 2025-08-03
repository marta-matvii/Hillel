import React from 'react';
import { useSelector } from 'react-redux';
import { List, Typography, Box } from '@mui/material';
import TodoItem from './TodoItem';

function TodoList() {
  const todos = useSelector(state => state.todos.todos);

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