/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './containers/App';
import Home from './containers/Home';
import DetailsForm from './containers/DetailsForm';
import SubScale from './containers/SubScale';
import Pairwise from './containers/Pairwise';
import PageNotFound from './containers/PageNotFound';
import End from "./containers/End";
import Dashboard from "./containers/Dashboard";
import RawData from "./containers/Dashboard/RawData";


export default () => (
  <App>
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/rawdata/:expID/:partID" component={RawData} />
      <Route path="/end" component={End} />
      <Route path="/part2" component={Pairwise} />
      <Route path="/part1" component={SubScale} />
      <Route path="/details" component={DetailsForm} />
      <Route path="/" component={Home} />
      <Route component={PageNotFound} />
    </Switch>
  </App>
);
