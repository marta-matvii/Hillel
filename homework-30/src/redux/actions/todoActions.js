export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

export const ADD_TODO = 'ADD_TODO';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TOGGLE_TODO_SUCCESS = 'TOGGLE_TODO_SUCCESS';
export const TOGGLE_TODO_FAILURE = 'TOGGLE_TODO_FAILURE';

export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

export const START_EDIT_TODO = 'START_EDIT_TODO';
export const SAVE_EDIT_TODO = 'SAVE_EDIT_TODO';
export const SAVE_EDIT_TODO_SUCCESS = 'SAVE_EDIT_TODO_SUCCESS';
export const SAVE_EDIT_TODO_FAILURE = 'SAVE_EDIT_TODO_FAILURE';
export const CANCEL_EDIT_TODO = 'CANCEL_EDIT_TODO';

export const CLEAR_ALL_TODOS = 'CLEAR_ALL_TODOS';
export const CLEAR_ALL_TODOS_SUCCESS = 'CLEAR_ALL_TODOS_SUCCESS';
export const CLEAR_ALL_TODOS_FAILURE = 'CLEAR_ALL_TODOS_FAILURE';

export const loadTodos = () => ({
  type: LOAD_TODOS
});

export const loadTodosSuccess = (todos) => ({
  type: LOAD_TODOS_SUCCESS,
  payload: todos
});

export const loadTodosFailure = (error) => ({
  type: LOAD_TODOS_FAILURE,
  payload: error
});

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: text
});

export const addTodoSuccess = (todo) => ({
  type: ADD_TODO_SUCCESS,
  payload: todo
});

export const addTodoFailure = (error) => ({
  type: ADD_TODO_FAILURE,
  payload: error
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

export const toggleTodoSuccess = (todo) => ({
  type: TOGGLE_TODO_SUCCESS,
  payload: todo
});

export const toggleTodoFailure = (error) => ({
  type: TOGGLE_TODO_FAILURE,
  payload: error
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});

export const deleteTodoSuccess = (id) => ({
  type: DELETE_TODO_SUCCESS,
  payload: id
});

export const deleteTodoFailure = (error) => ({
  type: DELETE_TODO_FAILURE,
  payload: error
});

export const startEditTodo = (id) => ({
  type: START_EDIT_TODO,
  payload: id
});

export const saveEditTodo = (id, text) => ({
  type: SAVE_EDIT_TODO,
  payload: { id, text }
});

export const saveEditTodoSuccess = (todo) => ({
  type: SAVE_EDIT_TODO_SUCCESS,
  payload: todo
});

export const saveEditTodoFailure = (error) => ({
  type: SAVE_EDIT_TODO_FAILURE,
  payload: error
});

export const cancelEditTodo = (id) => ({
  type: CANCEL_EDIT_TODO,
  payload: id
});

export const clearAllTodos = () => ({
  type: CLEAR_ALL_TODOS
});

export const clearAllTodosSuccess = () => ({
  type: CLEAR_ALL_TODOS_SUCCESS
});

export const clearAllTodosFailure = (error) => ({
  type: CLEAR_ALL_TODOS_FAILURE,
  payload: error
});