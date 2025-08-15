import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  TableSortLabel,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/slices/productsSlice';

const ProductTable = ({ products, onEdit, onPreview }) => {
  const dispatch = useDispatch();
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const sortedProducts = React.useMemo(() => {
    if (!orderBy) return products;

    return [...products].sort((a, b) => {
      if (orderBy === 'price') {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      }
      
      const aValue = a[orderBy]?.toString().toLowerCase() || '';
      const bValue = b[orderBy]?.toString().toLowerCase() || '';
      
      if (order === 'asc') {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });
  }, [products, orderBy, order]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <TableContainer 
      component={Paper} 
      elevation={0}
      sx={{ 
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
              <TableSortLabel
                active={orderBy === 'id'}
                direction={orderBy === 'id' ? order : 'asc'}
                onClick={() => handleSort('id')}
                sx={{ color: '#52c263 !important' }}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
              <TableSortLabel
                active={orderBy === 'category'}
                direction={orderBy === 'category' ? order : 'asc'}
                onClick={() => handleSort('category')}
                sx={{ color: '#52c263 !important' }}
              >
                Category
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleSort('name')}
                sx={{ color: '#52c263 !important' }}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
              <TableSortLabel
                active={orderBy === 'quantity'}
                direction={orderBy === 'quantity' ? order : 'asc'}
                onClick={() => handleSort('quantity')}
                sx={{ color: '#52c263 !important' }}
              >
                Quantity
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
              <TableSortLabel
                active={orderBy === 'price'}
                direction={orderBy === 'price' ? order : 'asc'}
                onClick={() => handleSort('price')}
                sx={{ color: '#52c263 !important' }}
              >
                Price (₴)
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedProducts.map((product, index) => (
            <TableRow 
              key={product.id}
              sx={{ 
                backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(82, 194, 99, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(82, 194, 99, 0.2)',
                }
              }}
            >
              <TableCell sx={{ fontSize: '1rem' }}>{product.id}</TableCell>
              <TableCell sx={{ fontSize: '1rem' }}>{product.category}</TableCell>
              <TableCell sx={{ fontSize: '1rem', fontWeight: 'medium' }}>
                {product.name}
              </TableCell>
              <TableCell sx={{ fontSize: '1rem' }}>
                {product.quantity || Math.floor(Math.random() * 100) + 1}
              </TableCell>
              <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                {formatPrice(product.price)}
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <IconButton
                    size="small"
                    onClick={() => onEdit(product)}
                    sx={{ 
                      color: '#333',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' }
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(product.id)}
                    sx={{ 
                      color: '#333',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' }
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;