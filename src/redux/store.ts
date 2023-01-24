import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

export interface IAppState {
  // your state properties
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
