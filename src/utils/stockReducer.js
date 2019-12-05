/**
 * I hate to create multiple action type to udpate single object. ;)
 * I'm using single ACTION type to update state.
 */
const REDUX_ACTION_TYPE = process.env.REDUX_ACTION_TYPE; // ref .env file.

export const initialState = {
  series: null,
  search: [],
  error: null,
  loading: false
};

export default (state, action) => {
  if (action.type === REDUX_ACTION_TYPE && action.payload) {
    return { ...state, ...action.payload };
  }
  return state;
};
