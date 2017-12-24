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
          <Route exact path="/" component={MainPage} />
          <Route exact path="/definitions" component={Definitions} />
          <Route exact path="/instructions" component={Instructions} />
        </Switch>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Home;
