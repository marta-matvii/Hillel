import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { addProduct, updateProduct } from '../../store/slices/productsSlice';

const ProductModal = ({ open, onClose, product, mode }) => {
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    
    if (!values.name || values.name.trim() === '') {
      errors.name = 'Product name is required';
    }
    
    if (!values.category || values.category.trim() === '') {
      errors.category = 'Category is required';
    }
    
    if (!values.price || values.price <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    
    if (!values.quantity || values.quantity <= 0) {
      errors.quantity = 'Quantity must be greater than 0';
    }
    
    if (!values.photo || values.photo.trim() === '') {
      errors.photo = 'Photo URL is required';
    }
    
    if (!values.description || values.description.trim() === '') {
      errors.description = 'Description is required';
    }
    
    return errors;
  };

  const onSubmit = (values) => {
    const productData = {
      ...values,
      price: parseFloat(values.price),
      quantity: parseInt(values.quantity),
    };

    if (mode === 'edit' && product) {
      dispatch(updateProduct({ id: product.id, productData }));
    } else {
      dispatch(addProduct(productData));
    }
    
    onClose();
  };

  const initialValues = product ? {
    name: product.name || '',
    category: product.category || '',
    price: product.price || '',
    quantity: product.quantity || '',
    photo: product.photo || '',
    description: product.description || '',
  } : {
    name: '',
    category: '',
    price: '',
    quantity: '',
    photo: '',
    description: '',
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 0,
          backgroundColor: '#d3d3d3',
          minHeight: '80vh',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }
      }}
    >
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={initialValues}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              p: 2,
              borderBottom: '1px solid #bbb'
            }}>
              <Typography variant="h6" sx={{ color: '#888', fontWeight: 'normal' }}>
                {mode === 'edit' ? 'Edit product' : 'Add product'}
              </Typography>
              <IconButton onClick={onClose} sx={{ color: '#333' }}>
                <Close />
              </IconButton>
            </Box>
            
            <DialogContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                
                <Box>
                  <Typography variant="body1" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
                    Category
                  </Typography>
                  <Field name="category">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        fullWidth
                        variant="filled"
                        error={meta.error && meta.touched}
                        helperText={meta.error && meta.touched ? meta.error : ''}
                        disabled={submitting}
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
                    )}
                  </Field>
                </Box>

                <Box>
                  <Typography variant="body1" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
                    Name
                  </Typography>
                  <Field name="name">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        fullWidth
                        variant="filled"
                        error={meta.error && meta.touched}
                        helperText={meta.error && meta.touched ? meta.error : ''}
                        disabled={submitting}
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
                    )}
                  </Field>
                </Box>

                <Box>
                  <Typography variant="body1" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
                    Quantity
                  </Typography>
                  <Field name="quantity">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        fullWidth
                        type="number"
                        variant="filled"
                        inputProps={{ min: 1 }}
                        error={meta.error && meta.touched}
                        helperText={meta.error && meta.touched ? meta.error : ''}
                        disabled={submitting}
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
                    )}
                  </Field>
                </Box>

                <Box>
                  <Typography variant="body1" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
                    Price
                  </Typography>
                  <Field name="price">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        fullWidth
                        type="number"
                        variant="filled"
                        inputProps={{ min: 0, step: 0.01 }}
                        error={meta.error && meta.touched}
                        helperText={meta.error && meta.touched ? meta.error : ''}
                        disabled={submitting}
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
                    )}
                  </Field>
                </Box>

                <Box>
                  <Typography variant="body1" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
                    Photo
                  </Typography>
                  <Field name="photo">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        fullWidth
                        variant="filled"
                        error={meta.error && meta.touched}
                        helperText={meta.error && meta.touched ? meta.error : ''}
                        disabled={submitting}
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
                    )}
                  </Field>
                </Box>

                <Box>
                  <Typography variant="body1" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
                    Description
                  </Typography>
                  <Field name="description">
                    {({ input, meta }) => (
                      <TextField
                        {...input}
                        fullWidth
                        multiline
                        rows={4}
                        variant="filled"
                        error={meta.error && meta.touched}
                        helperText={meta.error && meta.touched ? meta.error : ''}
                        disabled={submitting}
                        sx={{
                          '& .MuiFilledInput-root': {
                            backgroundColor: 'white',
                            borderRadius: 0,
                            '&:hover': { backgroundColor: 'white' },
                            '&.Mui-focused': { backgroundColor: 'white' }
                          }
                        }}
                      />
                    )}
                  </Field>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                  <Button 
                    onClick={onClose} 
                    variant="contained"
                    disabled={submitting}
                    sx={{ 
                      backgroundColor: '#666',
                      color: 'white',
                      px: 4,
                      py: 1,
                      borderRadius: 0,
                      '&:hover': { backgroundColor: '#555' }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained"
                    disabled={submitting}
                    sx={{
                      backgroundColor: '#52c263',
                      color: 'white',
                      px: 4,
                      py: 1,
                      borderRadius: 0,
                      '&:hover': { backgroundColor: '#469c57' }
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          </form>
        )}
      />
    </Dialog>
  );
};

export default ProductModal;