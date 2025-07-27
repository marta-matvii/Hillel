import React from 'react';
import { useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/counterSlice';
import { Button, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const CounterControls = () => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
      <Button
        variant="contained"
        color="success"
        startIcon={<Add />}
        onClick={handleIncrement}
        size="large"
      >
        Збільшити
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={<Remove />}
        onClick={handleDecrement}
        size="large"
      >
        Зменшити
      </Button>
    </Box>
  );
};

export default CounterControls;