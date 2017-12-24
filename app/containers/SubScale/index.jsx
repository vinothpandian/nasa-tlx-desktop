import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Card, CardBody, CardHeader, Container } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { storeData } from '../../actions';
import Slider from './Slider';
import { ipcRenderer } from 'electron';

class SubScale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: {
        mental: 50,
        physical: 50,
        temporal: 50,
        performance: 50,
        effort: 50,
        frustration: 50,
      },
      answered: false,
      alertMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentWillMount() {
    if ((!this.props.expID || this.props.expID === '') && (!this.props.partID || this.props.partID === '')) {
      this.props.history.push('/');
    }
  }

  handleChange(id, value) {
    let newValue = value;

    if (!this.state.answered) {
      this.setState({
        answered: true,
      });
    }

    if (id === 'performance') {
      newValue = 100 - newValue;
    }

    this.setState(prevState => ({
      scale: Object.assign({}, prevState.scale, { [id]: newValue }),
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.answered) {
      this.setState({
        alertMessage: (
          <Alert className="mt-4" color="danger">
            Please answer before continuing to the next part of the question
          </Alert>
        ),
      });
    } else {
      let isDataStored = false;

      const data = {
        scale: {
          'Mental Demand': this.state.scale.mental,
          'Physical Demand': this.state.scale.physical,
          'Temporal Demand': this.state.scale.temporal,
          Performance: this.state.scale.performance,
          Effort: this.state.scale.effort,
          'Frustration Level': this.state.scale.frustration,
        },
        experimentID: this.props.expID,
        participantID: this.props.partID,
      };

      isDataStored = ipcRenderer.sendSync('addData', data);

      if (isDataStored) {
        this.props.storeScaleValues(data);
        this.props.history.push('/part2');
      } else {
        this.setState({
          alertMessage: <Alert color="danger">No such experiment or participant!</Alert>,
        });
      }
    }
  }

  render() {
    return (
      <Container className="p-5">
        <Card className="my-5">
          <CardHeader>Workload</CardHeader>
          <CardBody>
            <p className="text-info">Please note that the following scale is a measure of how well
              you think you did on the task.
            </p>
            <hr />
            <Slider
              id="mental"
              title="Mental Demand"
              description="How mentally demanding was the task?"
              leftValue="Low"
              rightValue="High"
              handleChange={this.handleChange}
            />
            <hr />
            <Slider
              id="physical"
              title="Physical Demand"
              description="How physically demanding was the task?"
              leftValue="Low"
              rightValue="High"
              handleChange={this.handleChange}
            />
            <hr />
            <Slider
              id="temporal"
              title="Temporal Demand"
              description="How hurried or rushed was the pace of the task?"
              leftValue="Low"
              rightValue="High"
              handleChange={this.handleChange}
            />
            <hr />
            <Slider
              id="performance"
              title="Performance"
              description="How successful were you in accomplishing the task?"
              leftValue="Poor"
              rightValue="Good"
              handleChange={this.handleChange}
            />
            <hr />
            <Slider
              id="effort"
              title="Effort"
              description="How hard did you have to work to accomplish your level of performance?"
              leftValue="Low"
              rightValue="High"
              handleChange={this.handleChange}
            />
            <hr />
            <Slider
              id="frustration"
              title="Frustration Level"
              description="How insecure, discouraged, irritated, stressed, or annoyed were you?"
              leftValue="Low"
              rightValue="High"
              handleChange={this.handleChange}
            />
          </CardBody>
        </Card>
        <Container className="mt-5 text-right">
          <Button onClick={this.handleSubmit} color="success">Continue</Button>
        </Container>
        {this.state.alertMessage}
      </Container>
    );
  }
}

SubScale.propTypes = {
  expID: PropTypes.string.isRequired,
  partID: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  storeScaleValues: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  storeScaleValues: storeData.storeScaleValues,
}, dispatch);

const mapStateToProps = state => ({
  expID: state.questionnaire.experimentID,
  partID: state.questionnaire.participantID,
});

export default connect(mapStateToProps, mapDispatchToProps)(SubScale);
