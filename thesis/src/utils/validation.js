export const validateLoginForm = (values) => {
  const errors = {};
  if (!values.username || values.username.trim() === '') {
    errors.username = 'Username is required';
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Password is required';
  }
  return errors;
};

export const validateProductName = (value) => {
  if (!value || value.trim() === '') {
    return 'Product name is required';
  }
  return undefined;
};

export const validateCategory = (value) => {
  if (!value || value.trim() === '') {
    return 'Category is required';
  }
  return undefined;
};

export const validatePrice = (value) => {
  if (!value || value <= 0) {
    return 'Price must be greater than 0';
  }
  return undefined;
};

export const validateQuantity = (value) => {
  if (!value || value <= 0) {
    return 'Quantity must be greater than 0';
  }
  return undefined;
};

export const validatePhoto = (value) => {
  if (!value || value.trim() === '') {
    return 'Photo URL is required';
  }
  return undefined;
};

export const validateDescription = (value) => {
  if (!value || value.trim() === '') {
    return 'Description is required';
  }
  return undefined;
};