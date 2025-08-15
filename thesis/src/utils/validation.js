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