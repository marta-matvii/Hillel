import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { addProduct, updateProduct } from '../store/slices/productsSlice'; 
import Modal from './Modal'; 
import Input from './Input'; 
import {
  validateProductName,
  validateCategory,
  validatePrice,
  validateQuantity,
  validatePhoto,
  validateDescription,
} from '../utils/validation'; 

const ProductModal = ({ open, onClose, product, mode }) => {
  const dispatch = useDispatch();

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

  const initialValues = {
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || '',
    quantity: product?.quantity || '',
    photo: product?.photo || '',
    description: product?.description || '',
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting }) => (
        <Modal
          open={open}
          onClose={onClose}
          title={mode === 'edit' ? 'Edit product' : 'Add product'}
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitText="Submit"
          cancelText="Cancel"
          isSubmitting={submitting}
        >
          <Field name="category" validate={validateCategory}>
            {({ input, meta }) => (
              <Input
                label="Category"
                input={input}
                meta={meta}
                disabled={submitting}
              />
            )}
          </Field>

          <Field name="name" validate={validateProductName}>
            {({ input, meta }) => (
              <Input
                label="Name"
                input={input}
                meta={meta}
                disabled={submitting}
              />
            )}
          </Field>

          <Field name="quantity" validate={validateQuantity}>
            {({ input, meta }) => (
              <Input
                label="Quantity"
                input={input}
                meta={meta}
                type="number"
                disabled={submitting}
                inputProps={{ min: 1 }}
              />
            )}
          </Field>

          <Field name="price" validate={validatePrice}>
            {({ input, meta }) => (
              <Input
                label="Price"
                input={input}
                meta={meta}
                type="number"
                disabled={submitting}
                inputProps={{ min: 0, step: 0.01 }}
              />
            )}
          </Field>

          <Field name="photo" validate={validatePhoto}>
            {({ input, meta }) => (
              <Input
                label="Photo"
                input={input}
                meta={meta}
                disabled={submitting}
              />
            )}
          </Field>

          <Field name="description" validate={validateDescription}>
            {({ input, meta }) => (
              <Input
                label="Description"
                input={input}
                meta={meta}
                multiline
                rows={4}
                disabled={submitting}
              />
            )}
          </Field>
        </Modal>
      )}
    />
  );
};

export default ProductModal;