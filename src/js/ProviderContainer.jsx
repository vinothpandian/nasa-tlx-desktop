import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import '../css/style.scss';
import Root from './containers/Root';
import reducers from './reducers';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

export default function ProviderContainer() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
