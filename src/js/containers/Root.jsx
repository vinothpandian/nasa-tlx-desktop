import React from 'react';
// import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav/Nav';
import Home from './Home';
import PageNotFound from './PageNotFound';
import DetailsForm from './DetailsForm';
import SubScale from './SubScale';

function Root() {
  return (
    <div id="root">
      <Nav />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details" component={DetailsForm} />
          <Route exact path="/part1" component={SubScale} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default Root;
