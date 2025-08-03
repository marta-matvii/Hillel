import { takeEvery, put, select } from 'redux-saga/effects';
import {
  LOAD_TODOS,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  SAVE_EDIT_TODO,
  CLEAR_ALL_TODOS,
  loadTodosSuccess,
  addTodoSuccess,
  toggleTodoSuccess,
  deleteTodoSuccess,
  saveEditTodoSuccess,
  clearAllTodosSuccess
} from '../actions/todoActions';

const STORAGE_KEY = 'todos';

function* loadTodosSaga() {
  try {
    const todosFromStorage = localStorage.getItem(STORAGE_KEY);
    const todos = todosFromStorage ? JSON.parse(todosFromStorage) : [];
    yield put(loadTodosSuccess(todos));
  } catch (error) {
    console.error('Error loading todos:', error);
    yield put(loadTodosSuccess([]));
  }
}

function* addTodoSaga(action) {
  try {
    const newTodo = {
      id: Date.now(),
      text: action.payload,
      completed: false,
      isEditing: false
    };

    const currentState = yield select();
    const currentTodos = currentState.todos.todos;
    const updatedTodos = [...currentTodos, newTodo];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    yield put(addTodoSuccess(newTodo));
  } catch (error) {
    console.error('Error adding todo:', error);
  }
}

function* toggleTodoSaga(action) {
  try {
    const currentState = yield select();
    const currentTodos = currentState.todos.todos;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    yield put(toggleTodoSuccess(action.payload));
  } catch (error) {
    console.error('Error toggling todo:', error);
  }
}

function* deleteTodoSaga(action) {
  try {
    const currentState = yield select();
    const currentTodos = currentState.todos.todos;
    const updatedTodos = currentTodos.filter(todo => todo.id !== action.payload);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}

function* saveEditTodoSaga(action) {
  try {
    const { id, text } = action.payload;
    const currentState = yield select();
    const currentTodos = currentState.todos.todos;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id
        ? { ...todo, text, isEditing: false }
        : todo
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    yield put(saveEditTodoSuccess(id, text));
  } catch (error) {
    console.error('Error saving todo edit:', error);
  }
}

function* clearAllTodosSaga() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    yield put(clearAllTodosSuccess());
  } catch (error) {
    console.error('Error clearing todos:', error);
  }
}

function* todoSaga() {
  yield takeEvery(LOAD_TODOS, loadTodosSaga);
  yield takeEvery(ADD_TODO, addTodoSaga);
  yield takeEvery(TOGGLE_TODO, toggleTodoSaga);
  yield takeEvery(DELETE_TODO, deleteTodoSaga);
  yield takeEvery(SAVE_EDIT_TODO, saveEditTodoSaga);
  yield takeEvery(CLEAR_ALL_TODOS, clearAllTodosSaga);
}

export default todoSaga;