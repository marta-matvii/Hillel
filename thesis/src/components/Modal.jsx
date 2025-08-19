import React from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const Modal = ({ 
  open, 
  onClose, 
  title, 
  children, 
  onSubmit, 
  onCancel,
  submitText = 'Submit',
  cancelText = 'Cancel',
  isSubmitting = false 
}) => {
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
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid #bbb'
      }}>
        <Typography variant="h6" sx={{ color: '#888', fontWeight: 'normal' }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#333' }}>
          <Close />
        </IconButton>
      </Box>
      
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {children}

          {/* Buttons */}
          {(onSubmit || onCancel) && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
              <Button 
                onClick={onCancel || onClose} 
                variant="contained"
                disabled={isSubmitting}
                sx={{ 
                  backgroundColor: '#666',
                  color: 'white',
                  px: 4,
                  py: 1,
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: '#555',
                  }
                }}
              >
                {cancelText}
              </Button>
              {onSubmit && (
                <Button 
                  onClick={onSubmit} 
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: '#52c263',
                    color: 'white',
                    px: 4,
                    py: 1,
                    borderRadius: 0,
                    '&:hover': {
                      backgroundColor: '#469c57',
                    }
                  }}
                >
                  {submitText}
                </Button>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;