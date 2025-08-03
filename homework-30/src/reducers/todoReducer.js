import {
  LOAD_TODOS_SUCCESS,
  ADD_TODO_SUCCESS,
  TOGGLE_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  START_EDIT_TODO,
  SAVE_EDIT_TODO_SUCCESS,
  CANCEL_EDIT_TODO,
  CLEAR_ALL_TODOS_SUCCESS
} from '../actions/todoActions';

const initialState = {
  todos: []
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case TOGGLE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case DELETE_TODO_SUCCESS:
      return {
        ...state,
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
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text, isEditing: false }
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
        todos: []
      };

    default:
      return state;
  }
};

export default todoReducer;