import { takeEvery, put, call, select } from 'redux-saga/effects';
import { todoAPI } from '../../services/api';
import {
  LOAD_TODOS,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  SAVE_EDIT_TODO,
  CLEAR_ALL_TODOS,
  loadTodosSuccess,
  loadTodosFailure,
  addTodoSuccess,
  addTodoFailure,
  toggleTodoSuccess,
  toggleTodoFailure,
  deleteTodoSuccess,
  deleteTodoFailure,
  saveEditTodoSuccess,
  saveEditTodoFailure,
  clearAllTodosSuccess,
  clearAllTodosFailure
} from '../actions/todoActions';

function* loadTodosSaga() {
  try {
    const todos = yield call(todoAPI.getAllTodos);
    yield put(loadTodosSuccess(todos));
  } catch (error) {
    yield put(loadTodosFailure(error.message));
  }
}

function* addTodoSaga(action) {
  try {
    const todoData = {
      text: action.payload,
      completed: false
    };
    const newTodo = yield call(todoAPI.createTodo, todoData);
    yield put(addTodoSuccess(newTodo));
  } catch (error) {
    yield put(addTodoFailure(error.message));
  }
}

function* toggleTodoSaga(action) {
  try {
    const currentState = yield select();
    const todoToToggle = currentState.todos.todos.find(todo => todo.id === action.payload);
    
    if (todoToToggle) {
      const updatedTodo = yield call(todoAPI.updateTodo, action.payload, {
        ...todoToToggle,
        completed: !todoToToggle.completed
      });
      yield put(toggleTodoSuccess(updatedTodo));
    }
  } catch (error) {
    yield put(toggleTodoFailure(error.message));
  }
}

function* deleteTodoSaga(action) {
  try {
    yield call(todoAPI.deleteTodo, action.payload);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    yield put(deleteTodoFailure(error.message));
  }
}

function* saveEditTodoSaga(action) {
  try {
    const { id, text } = action.payload;
    const currentState = yield select();
    const todoToUpdate = currentState.todos.todos.find(todo => todo.id === id);
    
    if (todoToUpdate) {
      const updatedTodo = yield call(todoAPI.updateTodo, id, {
        ...todoToUpdate,
        text
      });
      yield put(saveEditTodoSuccess(updatedTodo));
    }
  } catch (error) {
    yield put(saveEditTodoFailure(error.message));
  }
}

function* clearAllTodosSaga() {
  try {
    const currentState = yield select();
    const currentTodos = currentState.todos.todos;
    
    yield Promise.all(
      currentTodos.map(todo => call(todoAPI.deleteTodo, todo.id))
    );
    
    yield put(clearAllTodosSuccess());
  } catch (error) {
    yield put(clearAllTodosFailure(error.message));
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