import React, { Component } from 'react';
import { Alert, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navigation from '../Nav';
import DataDump from './DataDump';

const _ = require('lodash');

class End extends Component {
  constructor(props) {
    super(props);

    this.lowdbData = ipcRenderer.sendSync('getData', props.finalData.experimentID, props.finalData.participantID);

    const alertMessage = _.isEqual(this.lowdbData, props.finalData);

    this.state = {
      alertMessage
    };
  }

  componentWillMount() {
    if ((!this.props.finalData.experimentID || this.props.finalData.experimentID === '')
      && (!this.props.finalData.participantID || this.props.finalData.participantID === '')) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div id="homeContainer">
        <Navigation home={false} />
        {
          this.state.alertMessage
        ?
          <Row className="justify-content-center align-items-center h-100">
            <Col xs="auto">
              <h1 className="display-4">
              Thank you for your submission
              </h1>
              <div className="text-center mt-5">
                <Alert color="success">
                Please inform that you have completed the NASA-TLX questionnaire successfully
                </Alert>
              </div>
              <div className="text-center mt-5">
                <Link
                  className="btn btn-info btn-lg"
                  to={`/rawdata/${this.props.finalData.experimentID}/${this.props.finalData.participantID}`}
                >
                  Check Result
                </Link>
              </div>
            </Col>
          </Row>
        :
          <DataDump lowdbData={this.lowdbData} reduxData={this.props.finalData} />
        }
      </div>
    );
  }
}

End.propTypes = {
  finalData: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  finalData: state.questionnaire,
});

export default connect(mapStateToProps)(End);
