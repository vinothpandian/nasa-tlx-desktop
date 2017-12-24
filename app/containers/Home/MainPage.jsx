import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import MainForm from './MainForm';

const nasaLogo = require('../../assets/NasaLogo.png');

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
      <Row className="justify-content-center align-items-center h-100">
        <Col xs="auto">
          <img src={nasaLogo} alt="NasaLogo" width="256" />
        </Col>
        <Col xs={{ size: 4, offset: 1 }} xl={3} >
          <MainForm formSubmitted={this.formSubmitted} />
        </Col>
      </Row>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Home;
