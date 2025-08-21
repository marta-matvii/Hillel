import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return `${price.toLocaleString('uk-UA')}₴`;
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 300,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.photo}
        alt={product.name}
        sx={{ 
          objectFit: 'contain',
          backgroundColor: '#f8f9fa',
          p: 2
        }}
      />
      
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        p: 2
      }}>
        {/* Product Name */}
        <Typography 
          variant="body1" 
          component="h3"
          sx={{ 
            fontWeight: 500,
            fontSize: '0.9rem',
            lineHeight: 1.3,
            mb: 2,
            minHeight: '2.6rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>
        
        {/* Price and Quantity */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#ff6900',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            {formatPrice(product.price)}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666',
              fontSize: '0.8rem'
            }}
          >
            Кількість: {product.quantity}
          </Typography>
        </Box>
        
        {/* Ready to ship */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1,
          mt: 'auto'
        }}>
          <ShoppingCart sx={{ color: '#52c263', fontSize: '1rem' }} />
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#52c263',
              fontSize: '0.8rem',
              fontWeight: 500
            }}
          >
            Готовий до відправки
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;