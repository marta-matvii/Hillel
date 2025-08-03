import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Box
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import {
  toggleTodo,
  deleteTodo,
  startEditTodo,
  saveEditTodo,
  cancelEditTodo
} from '../actions/todoActions';

function TodoItem({ todo }) {
  const [editText, setEditText] = useState(todo.text);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    if (window.confirm('Ви впевнені, що хочете видалити це завдання?')) {
      dispatch(deleteTodo(todo.id));
    }
  };

  const handleStartEdit = () => {
    setEditText(todo.text);
    dispatch(startEditTodo(todo.id));
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      dispatch(saveEditTodo(todo.id, editText.trim()));
    } else {
      dispatch(cancelEditTodo(todo.id));
    }
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    dispatch(cancelEditTodo(todo.id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <ListItem
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        mb: 1,
        bgcolor: 'background.paper'
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={handleToggle}
        disabled={todo.isEditing}
      />
      
      {todo.isEditing ? (
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 1 }}>
          <TextField
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            size="small"
            fullWidth
            autoFocus
          />
          <IconButton onClick={handleSaveEdit} color="primary">
            <Save />
          </IconButton>
          <IconButton onClick={handleCancelEdit} color="secondary">
            <Cancel />
          </IconButton>
        </Box>
      ) : (
        <>
          <ListItemText
            primary={todo.text}
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              opacity: todo.completed ? 0.6 : 1
            }}
          />
          <IconButton onClick={handleStartEdit} color="primary">
            <Edit />
          </IconButton>
          <IconButton onClick={handleDelete} color="error">
            <Delete />
          </IconButton>
        </>
      )}
    </ListItem>
  );
}

export default TodoItem;