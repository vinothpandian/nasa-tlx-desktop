import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import QuestionCard from './QuestionCard';

class Pairwise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: false,
    };
  }

  componentWillMount() {
    if ((!this.props.expID || this.props.expID === '') && (!this.props.partID || this.props.partID === '')) {
      this.props.history.push('/');
    }
  }

  render() {
    if (!this.state.completed) {
      return (
        <Row className="justify-content-center, align-items-center h-100">
          <Col xs="auto">
            <QuestionCard qNo={1} />
          </Col>
        </Row>
      );
    }

    return (
      <Row className="justify-content-center align-items-center h-100">
        <Col xs="auto">
          <h4 className="display-3">
            Thank you for your submission
          </h4>
          <Alert className="text-center" color="success">
            Please inform that you have completed the NASA-TLX questionnaire successfully
          </Alert>
        </Col>
      </Row>
    );
  }
}

Pairwise.propTypes = {
  expID: PropTypes.string.isRequired,
  partID: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  expID: state.questionnaire.experimentID,
  partID: state.questionnaire.participantID,
});

export default connect(mapStateToProps)(Pairwise);
