import React from 'react';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import Nav from './Nav/Nav';
import Routes from './Routes';

function Root() {
  const env = process.env.NODE_ENV;

  return (
    <div id="root">
      <Nav />
      {
        env === 'development'
          ?
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          :
            <HashRouter>
              <Routes />
            </HashRouter>
      }
    </div>
  );
}

export default Root;
