import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import PageNotFound from './PageNotFound';
import DetailsForm from './DetailsForm';
import SubScale from './SubScale';
import Pairwise from './Pairwise';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/details" component={DetailsForm} />
      <Route exact path="/part1" component={SubScale} />
      <Route exact path="/part2" component={Pairwise} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default Routes;
