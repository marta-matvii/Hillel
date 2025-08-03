import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper
} from '@mui/material';
import {
  loadTodos,
  addTodo,
  clearAllTodos
} from '../actions/todoActions';
import TodoList from './TodoList';

function TodoApp() {
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (inputText.trim()) {
      dispatch(addTodo(inputText.trim()));
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleClearAll = () => {
    if (todos.length > 0 && window.confirm('Ви впевнені, що хочете видалити всі завдання?')) {
      dispatch(clearAllTodos());
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Todo App with Redux Saga
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Додати нове завдання"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddTodo}
            disabled={!inputText.trim()}
            fullWidth
          >
            Додати
          </Button>
        </Box>

        <TodoList />

        {todos.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              color="warning"
              onClick={handleClearAll}
              fullWidth
            >
              Очистити всі завдання
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default TodoApp;