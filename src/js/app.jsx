import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ProviderContainer from './ProviderContainer';

const env = process.env.NODE_ENV;
const container = document.getElementById('react-container');

if (env === 'development') {
  const render = (Component) => {
    ReactDOM.render(
      <AppContainer key={Math.random()}>
        <Component />
      </AppContainer>,
      container,
    );
  };

  render(ProviderContainer);

  /* eslint-disable global-require  */
  // Webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept('./ProviderContainer', () => render(require('./ProviderContainer').default));
  }
  /* eslint-enable */
} else {
  ReactDOM.render(<ProviderContainer />, container);
}
