import {
  LOAD_TODOS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  TOGGLE_TODO,
  TOGGLE_TODO_SUCCESS,
  TOGGLE_TODO_FAILURE,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  START_EDIT_TODO,
  SAVE_EDIT_TODO,
  SAVE_EDIT_TODO_SUCCESS,
  SAVE_EDIT_TODO_FAILURE,
  CANCEL_EDIT_TODO,
  CLEAR_ALL_TODOS,
  CLEAR_ALL_TODOS_SUCCESS,
  CLEAR_ALL_TODOS_FAILURE
} from '../actions/todoActions';

const initialState = {
  todos: [],
  loading: false,
  error: null
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS:
    case ADD_TODO:
    case TOGGLE_TODO:
    case DELETE_TODO:
    case SAVE_EDIT_TODO:
    case CLEAR_ALL_TODOS:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOAD_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload.map(todo => ({
          ...todo,
          isEditing: false
        }))
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: [...state.todos, { ...action.payload, isEditing: false }]
      };

    case TOGGLE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...action.payload, isEditing: false }
            : todo
        )
      };

    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case START_EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, isEditing: true }
            : { ...todo, isEditing: false }
        )
      };

    case SAVE_EDIT_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...action.payload, isEditing: false }
            : todo
        )
      };

    case CANCEL_EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, isEditing: false }
            : todo
        )
      };

    case CLEAR_ALL_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: []
      };

    case LOAD_TODOS_FAILURE:
    case ADD_TODO_FAILURE:
    case TOGGLE_TODO_FAILURE:
    case DELETE_TODO_FAILURE:
    case SAVE_EDIT_TODO_FAILURE:
    case CLEAR_ALL_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default todoReducer;