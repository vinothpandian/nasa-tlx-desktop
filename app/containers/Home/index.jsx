import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Nav from '../Nav';
import MainPage from './MainPage';
import Instructions from './Instructions';
import Definitions from './Definitions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.formSubmitted = this.formSubmitted.bind(this);
  }

  formSubmitted() {
    this.props.history.push('/details');
  }


  render() {
    return (
      <div id="homeContainer">
        <Nav home />
        <Switch>
          <Route path="/instructions" component={Instructions} />
          <Route path="/definitions" component={Definitions} />
          <Route path="/" component={MainPage} />
        </Switch>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Home;
