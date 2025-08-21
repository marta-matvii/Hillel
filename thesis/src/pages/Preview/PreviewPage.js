import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { fetchProducts } from '../../store/slices/productsSlice';
import ProductCard from './ProductCard';

const PreviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleBackToProducts = () => {
    navigate('/products');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#52c263', p: 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img 
            src="/rozetka-small.png" 
            alt="Rozetka"
            style={{ 
              height: '40px',
              width: '40px'
            }}
          />
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5rem'
            }}
          >
            ROZETKA
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={handleBackToProducts}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          НАЗАД
        </Button>
      </Box>

      {/* Content */}
      <Container maxWidth="xl">
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            Error loading products: {error}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '400px'
          }}>
            <CircularProgress size={60} sx={{ color: 'white' }} />
          </Box>
        ) : products.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8
          }}>
            <Typography variant="h5" sx={{ color: 'white' }}>
              No products available
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default PreviewPage;