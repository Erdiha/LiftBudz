import { combineReducers } from 'redux';
import { IAppState } from './store';

const rootReducer = combineReducers<IAppState>({
  // your reducers
});

export default rootReducer;
