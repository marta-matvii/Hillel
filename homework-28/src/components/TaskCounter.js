import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

const TaskCounter = () => {
  const taskCount = useSelector(state => state.todo.tasks.length);

  return (
    <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Загальна кількість завдань: {taskCount}
      </Typography>
    </Box>
  );
};

export default TaskCounter;