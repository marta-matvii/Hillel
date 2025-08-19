import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Add, AccountCircle } from '@mui/icons-material';
import { fetchProducts, deleteProduct } from '../../store/slices/productsSlice';
import { Table } from '../../components'; 
import ProductModal from './ProductModal';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, isLoading } = useSelector((state) => state.products);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [modalMode, setModalMode] = useState('add');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    setModalMode('add');
    setEditProduct(null);
    setModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setModalMode('edit');
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditProduct(null);
  };

  const handlePreview = () => {
    navigate('/preview');
  };

  const tableHeaders = ["ID", "Category", "Name", "Quantity", "Price", "Action"];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#52c263' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 3,
        pb: 4
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
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AccountCircle />}
            onClick={handlePreview}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddProduct}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Add product
          </Button>
        </Box>
      </Box>

      {/* Title */}
      <Box sx={{ textAlign: 'center', pb: 4 }}>
        <Box sx={{ 
          fontSize: '4rem', 
          fontWeight: 'bold', 
          color: 'white',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
        }}>
          Products
        </Box>
      </Box>

      {/* Content */}
      <Container maxWidth="lg">
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress size={60} sx={{ color: 'white' }} />
          </Box>
        ) : (
          <Table 
            data={products}
            headers={tableHeaders}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onPreview={handlePreview}
          />
        )}

        <ProductModal
          open={modalOpen}
          onClose={handleCloseModal}
          product={editProduct}
          mode={modalMode}
        />
      </Container>
    </Box>
  );
};

export default ProductsPage;