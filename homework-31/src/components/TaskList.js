import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, List, Alert } from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = useSelector(state => state.todo.tasks);

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Мої завдання ({tasks.length})
      </Typography>
      
      {tasks.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          Поки немає завдань :(
        </Alert>
      ) : (
        <List>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default TaskList;