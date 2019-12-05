import { searchCaller, seriesCaller } from './api';

/**
 * Register api request in API object
 */
const API = {
  search: searchCaller,
  series: seriesCaller
};

/**
 * apiMiddleware
 * Alternative to Redux-Saga; I'm using custom Redux middleware for API
 * @param {{ dipatch: Function, getState: Function }} store
 * @return
 */
export const apiMiddleware = store => next => action => {
  next(action);
  if (API.hasOwnProperty(action.type)) {
    API[action.type].apply(null, [store.dispatch, action.args]);
  }
};
