import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeData } from '../../actions';
import Questions from './Questions';
import ThankYou from './ThankYou';

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
      this.props.storeWorkloadValues(this.state.workload);
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
      !this.state.completed
        ?
          <Questions
            choice={this.state.choice}
            options={this.choices[this.state.choice]}
            handleClick={this.handleClick}
          />
        :
          <ThankYou />
    );
  }
}

Pairwise.propTypes = {
  expID: PropTypes.string.isRequired,
  partID: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  storeWorkloadValues: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  expID: state.questionnaire.experimentID,
  partID: state.questionnaire.participantID,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  storeWorkloadValues: storeData.storeWorkloadValues,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pairwise);
