import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper } from '@mui/material';

const CounterDisplay = () => {
  const count = useSelector(state => state.counter.count);

  return (
    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', mb: 2 }}>
      <Typography variant="h2" component="div" color="primary">
        {count}
      </Typography>
    </Paper>
  );
};

export default CounterDisplay;