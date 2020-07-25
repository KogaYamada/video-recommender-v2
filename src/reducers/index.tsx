import { combineReducers } from 'redux';

interface StoreState {}

export const reducers = combineReducers({
  counter: () => 1,
});
