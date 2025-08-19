import React, { useState, useMemo } from 'react';
import {
  Table as MuiTable,
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

const Table = ({ data, headers, onEdit, onDelete, onPreview }) => {
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDelete = (item) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(item.id);
    }
  };

  const sortedData = useMemo(() => {
    if (!orderBy || !data) return data;

    return [...data].sort((a, b) => {
      const aValue = a[orderBy.toLowerCase()];
      const bValue = b[orderBy.toLowerCase()];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      const aStr = String(aValue || '').toLowerCase();
      const bStr = String(bValue || '').toLowerCase();
      
      if (order === 'asc') {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    });
  }, [data, orderBy, order]);

  const formatValue = (value, header) => {
    if (header.toLowerCase() === 'price') {
      return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
    return value;
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
      <MuiTable>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            {headers.map((header, index) => (
              <TableCell 
                key={index} 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: '1rem',
                  textAlign: header === 'Action' ? 'center' : 'left'
                }}
              >
                {header === 'Action' ? (
                  header
                ) : (
                  <TableSortLabel
                    active={orderBy === header.toLowerCase()}
                    direction={orderBy === header.toLowerCase() ? order : 'asc'}
                    onClick={() => handleSort(header.toLowerCase())}
                    sx={{ color: '#52c263 !important' }}
                  >
                    {header}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData?.map((item, index) => (
            <TableRow 
              key={item.id}
              sx={{ 
                backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(82, 194, 99, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(82, 194, 99, 0.2)',
                }
              }}
            >
              {headers.map((header, cellIndex) => {
                if (header === 'Action') {
                  return (
                    <TableCell key={cellIndex} align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        {onEdit && (
                          <IconButton
                            size="small"
                            onClick={() => onEdit(item)}
                            sx={{ 
                              color: '#333',
                              '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' }
                            }}
                          >
                            <Edit />
                          </IconButton>
                        )}
                        {onDelete && (
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(item)}
                            sx={{ 
                              color: '#333',
                              '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' }
                            }}
                          >
                            <Delete />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  );
                }
                
                const value = item[header.toLowerCase()];
                return (
                  <TableCell 
                    key={cellIndex} 
                    sx={{ 
                      fontSize: '1rem',
                      fontWeight: header.toLowerCase() === 'name' ? 'medium' : 'normal'
                    }}
                  >
                    {formatValue(value, header)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;