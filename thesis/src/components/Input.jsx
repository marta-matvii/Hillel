import React from 'react';
import {
  TextField,
  Typography,
  Box,
} from '@mui/material';

const Input = ({ 
  label, 
  input, 
  meta, 
  disabled = false, 
  type = 'text',
  multiline = false,
  rows = 1,
  inputProps = {},
  ...props 
}) => {
  return (
    <Box>
      <Typography variant="body1" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
        {label}
      </Typography>
      <TextField
        {...input}
        {...props}
        fullWidth
        type={type}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        variant="filled"
        error={meta.error && meta.touched}
        helperText={meta.error && meta.touched ? meta.error : ''}
        disabled={disabled}
        inputProps={inputProps}
        sx={{
          '& .MuiFilledInput-root': {
            backgroundColor: 'white',
            borderRadius: 0,
            '&:hover': { backgroundColor: 'white' },
            '&.Mui-focused': { backgroundColor: 'white' }
          },
          '& .MuiFilledInput-input': {
            color: '#52c263',
            fontWeight: 'bold',
          }
        }}
      />
    </Box>
  );
};

export default Input;