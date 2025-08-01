import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import swapiReducer from './reducers/swapiReducer';

const store = createStore(
  swapiReducer,
  applyMiddleware(thunk)
);

export default store;