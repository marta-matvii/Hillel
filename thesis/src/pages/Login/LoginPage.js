import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import {
  Box,
  Paper,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser, clearError } from '../../store/slices/authSlice';
import { validateLoginForm } from '../../utils/validation';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values) => {
    const { username, password } = values;
    dispatch(loginUser({ username, password }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#52c263',
        padding: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <img 
            src="/rozetka-logo-dark.png" 
            alt="Rozetka logo"
            style={{ 
              height: '60px',
            }}
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Form
          onSubmit={onSubmit}
          validate={validateLoginForm}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <Field name="username">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      fullWidth
                      label="User Name"
                      variant="filled"
                      error={meta.error && meta.touched}
                      helperText={meta.error && meta.touched ? meta.error : ''}
                      disabled={isLoading}
                      sx={{
                        backgroundColor: 'rgba(200, 200, 200, 0.3)',
                        '& .MuiFilledInput-root': {
                          backgroundColor: 'rgba(200, 200, 200, 0.3)',
                        },
                      }}
                    />
                  )}
                </Field>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Field name="password">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      variant="filled"
                      error={meta.error && meta.touched}
                      helperText={meta.error && meta.touched ? meta.error : ''}
                      disabled={isLoading}
                      sx={{
                        backgroundColor: 'rgba(200, 200, 200, 0.3)',
                        '& .MuiFilledInput-root': {
                          backgroundColor: 'rgba(200, 200, 200, 0.3)',
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                              disabled={isLoading}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  backgroundColor: '#52c263',
                  '&:hover': {
                    backgroundColor: '#469c57',
                  },
                  height: 56,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
            </form>
          )}
        />
      </Paper>
    </Box>
  );
};

export default LoginPage;