import 'whatwg-fetch'; // I could use AXIOS, but Let's use fetch
import { normalizeData, normalizeObject, normalizeSeriesData } from './helper';

const API_KEY = process.env.API_KEY; // ref .env file
const BASE_URL = process.env.BASE_URL; // ref .env file
const FUNCTION_SERIES = process.env.FUNCTION_SERIES; // ref .env file
const FUNCTION_SEARCH = process.env.FUNCTION_SEARCH; // ref .env file

/**
 * I hate to create multiple action type to udpate single object. ;)
 * I'm using single ACTION type to update reducer.
 */
const REDUX_ACTION_TYPE = process.env.REDUX_ACTION_TYPE; // ref .env file.

const createSearchEndpoint = () => {
  const url = `${BASE_URL}/query?function=${FUNCTION_SEARCH}&keywords=<query>&apikey=${API_KEY}`;
  return q => url.replace('<query>', q);
};

const searchEndpoint = createSearchEndpoint(); // some type of lazy function
export const searchCaller = async (dispatch, query) => {
  if (!query) {
    return dispatch({
      type: REDUX_ACTION_TYPE,
      payload: {
        search: []
      }
    });
  }

  dispatch({
    type: REDUX_ACTION_TYPE,
    payload: {
      loading: true,
      series: null
    }
  });
  try {
    const response = await window
      .fetch(searchEndpoint(query))
      .then(r => r.json());

    dispatch({
      type: REDUX_ACTION_TYPE,
      payload: {
        search: normalizeData(response.bestMatches)
      }
    });
  } catch (err) {
    dispatch({
      type: REDUX_ACTION_TYPE,
      payload: {
        error: err.message
      }
    });
    console.error(err);
  } finally {
    dispatch({
      type: REDUX_ACTION_TYPE,
      payload: {
        loading: false
      }
    });
  }
  return null;
};

const createSeriesEndpoint = () => {
  const url = `${BASE_URL}/query?function=${FUNCTION_SERIES}&symbol=<symbol>&interval=<interval>&apikey=${API_KEY}`;
  return (symbol, interval) =>
    url.replace('<symbol>', symbol).replace('<interval>', interval || '5min');
};

const seriesEndpoint = createSeriesEndpoint();
export const seriesCaller = async (dispatch, query) => {
  if (!query) {
    return dispatch({
      type: REDUX_ACTION_TYPE,
      payload: {
        series: null
      }
    });
  }

  dispatch({
    type: REDUX_ACTION_TYPE,
    payload: {
      loading: true
    }
  });
  try {
    const response = await window
      .fetch(seriesEndpoint(query.symbol))
      .then(r => r.json());

    const meta = normalizeObject(response['Meta Data']);
    const timeSeries = normalizeSeriesData(response['Time Series (5min)']);

    dispatch({
      type: REDUX_ACTION_TYPE,
      payload: {
        series: {
          meta: {
            ...meta,
            ...query
          },
          timeSeries
        }
      }
    });
  } catch (err) {
    dispatch({
      type: REDUX_ACTION_TYPE,
      payload: {
        error: err.message
      }
    });
    console.error(err);
  } finally {
    dispatch({
      type: REDUX_ACTION_TYPE,
      payload: {
        loading: false
      }
    });
  }
  return null;
};
