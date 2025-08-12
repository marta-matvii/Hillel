import React from 'react';
import { Container, Typography } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskCounter from './components/TaskCounter';

function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Todo List (Redux)
      </Typography>
      
      <TaskForm />
      <TaskList />
      <TaskCounter />
    </Container>
  );
}

export default App;