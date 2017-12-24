import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ipcRenderer } from 'electron';
import { Alert } from 'reactstrap';
import { storeData } from '../../actions';
import Questions from './Questions';

const _ = require('lodash');

class Pairwise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choice: 0,
      workload: {
        mental: 0,
        physical: 0,
        temporal: 0,
        performance: 0,
        effort: 0,
        frustration: 0,
      },
      completed: false,
      alertMessage: '',
    };

    this.choices = _.shuffle(_.range(6).reduce(
      (acc, x, i, arr) => acc.concat(_.range(i + 1, arr.length).map(y => [x, y]))
      , [],
    ));

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    if ((!this.props.expID || this.props.expID === '') && (!this.props.partID || this.props.partID === '')) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate() {
    if (this.state.completed === true) {
      let isDataStored = false;

      const data = {
        workload: {
          'Mental Demand': this.state.workload.mental,
          'Physical Demand': this.state.workload.physical,
          'Temporal Demand': this.state.workload.temporal,
          Performance: this.state.workload.performance,
          Effort: this.state.workload.effort,
          'Frustration Level': this.state.workload.frustration,
        },
        experimentID: this.props.expID,
        participantID: this.props.partID,
      };

      const scale = this.props.scale;
      const workload = data.workload;

      let taskload = 0;
      const weightedWorkload = Object.keys(scale).reduce((acc, key) => {
        const value = scale[key] * workload[key];
        taskload += value / 15;
        return Object.assign({}, acc, { [key]: value });
      }, {});

      const calculatedData = {
        weightedWorkload,
        taskload: parseFloat(taskload.toFixed(2)),
      };

      const dataToSend = Object.assign({}, data, calculatedData);

      isDataStored = ipcRenderer.sendSync('addData', dataToSend);

      if (isDataStored) {
        this.props.storeWorkloadValues(dataToSend);
        this.props.history.push('/end');
      } else if (this.state.alertMessage === '') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          alertMessage: <Alert className="m-4" color="danger">No such experiment or participant!</Alert>,
        });
      }
    }
  }

  handleClick(name) {
    this.setState((prevState) => {
      if (prevState.choice + 1 === 15) {
        return {
          workload: Object.assign({}, prevState.workload, { [name]: prevState.workload[name] + 1 }),
          completed: true,
        };
      }

      return {
        workload: Object.assign({}, prevState.workload, { [name]: prevState.workload[name] + 1 }),
        choice: prevState.choice + 1,
      };
    });
  }

  render() {
    return (
      <Questions
        choice={this.state.choice}
        options={this.choices[this.state.choice]}
        handleClick={this.handleClick}
        alertMessage={this.state.alertMessage}
      />
    );
  }
}

Pairwise.propTypes = {
  expID: PropTypes.string.isRequired,
  partID: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  storeWorkloadValues: PropTypes.func.isRequired,
  scale: PropTypes.objectOf(PropTypes.number).isRequired,
};

const mapStateToProps = state => ({
  expID: state.questionnaire.experimentID,
  partID: state.questionnaire.participantID,
  scale: state.questionnaire.scale,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  storeWorkloadValues: storeData.storeWorkloadValues,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pairwise);
