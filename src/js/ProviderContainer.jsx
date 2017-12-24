import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import '../css/style.scss';
import Root from './containers/Root';
import reducers from './reducers';

const env = process.env.NODE_ENV;
let store;

if (env === 'development') {
  /* eslint-disable no-underscore-dangle */
  store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  /* eslint-enable */
} else {
  store = createStore(reducers);
}

export default function ProviderContainer() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
