import React from 'react';
import { ListItem, ListItemText, Paper } from '@mui/material';

const TaskItem = ({ task }) => {
  return (
    <ListItem>
      <Paper elevation={1} sx={{ width: '100%', p: 2 }}>
        <ListItemText primary={task.text} />
      </Paper>
    </ListItem>
  );
};

export default TaskItem;