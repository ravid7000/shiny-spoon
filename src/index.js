import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import HiverStock from './HiverStock';
import store from './utils/store';
import './styles.scss';

render(
  <Provider store={store}>
    <HiverStock />
  </Provider>,
  document.getElementById('root')
);
