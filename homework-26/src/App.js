import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Paper,
  Alert
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

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (values, { resetForm }) => {
    const newTask = {
      id: Date.now(),
      text: values.task,
      completed: false
    };
    setTasks([...tasks, newTask]);
    resetForm();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Todo List
      </Typography>
      
      <Formik
        initialValues={{ task: '' }}
        validate={validateTask}
        onSubmit={addTask}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty, values, handleChange, errors, touched }) => (
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
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
          </Paper>
        )}
      </Formik>

      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          Мої завдання ({tasks.length})
        </Typography>
        
        {tasks.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            Поки немає завдань :(
          </Alert>
        ) : (
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id}>
                <Paper elevation={1} sx={{ width: '100%', p: 2 }}>
                  <ListItemText primary={task.text} />
                </Paper>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}

export default App;