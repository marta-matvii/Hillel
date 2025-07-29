import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/todoSlice';
import { Formik } from 'formik';
import { 
  TextField, 
  Button, 
  Box, 
  Paper,
  Typography
} from '@mui/material';

const validateTask = (values) => {
  const errors = {};
  
  if (!values.task) {
    errors.task = 'Це поле обов\'язкове';
  } 
  else if (values.task.trim().length < 5) {
    errors.task = 'Завдання повинно містити принаймні 5 символів';
  }
  
  return errors;
};

const TaskForm = () => {
  const dispatch = useDispatch();
  
  const handleAddTask = (values, { resetForm }) => {
    dispatch(addTask(values.task));
    resetForm();
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Додати нове завдання
      </Typography>
      
      <Formik
        initialValues={{ task: '' }}
        validate={validateTask}
        onSubmit={handleAddTask}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty, values, handleChange, errors, touched }) => (
          <Box component="form" noValidate>
            <TextField
              fullWidth
              id="task"
              name="task"
              label="Нове завдання"
              placeholder="Назва завдання (мінімум 5 символів)"
              value={values.task}
              onChange={handleChange}
              error={touched.task && Boolean(errors.task)}
              helperText={touched.task && errors.task}
              margin="normal"
              variant="outlined"
            />
            
            <Button
              onClick={handleSubmit}
              disabled={!isValid || !dirty || isSubmitting}
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              {isSubmitting ? 'Додавання...' : 'Додати завдання'}
            </Button>
          </Box>
        )}
      </Formik>
    </Paper>
  );
};

export default TaskForm;