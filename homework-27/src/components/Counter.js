import React from 'react';
import CounterDisplay from './CounterDisplay';
import CounterControls from './CounterControls';
import { Container, Typography, Box } from '@mui/material';

const Counter = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Redux Counter
        </Typography>
        <CounterDisplay />
        <CounterControls />
      </Box>
    </Container>
  );
};

export default Counter;