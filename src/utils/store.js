import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import stockReducer, { initialState } from './stockReducer';
import { apiMiddleware } from './apiMiddleware';

export default createStore(
  stockReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(apiMiddleware)
    // other store enhancers if any
  )
);
