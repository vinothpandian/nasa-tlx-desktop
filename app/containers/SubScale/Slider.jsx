import React, { Component } from 'react';
import ReactSlider from 'rc-slider';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';

const _ = require('lodash');

class Slider extends Component {
  constructor(props) {
    super(props);

    this.marks = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.marks = _.range(11).reduce((acc, curr) => {
      if (curr === 0) {
        acc[0] = this.props.leftValue;
      } else if (curr === 5) {
        acc[50] = 'Neutral';
      } else if (curr === 10) {
        acc[100] = this.props.rightValue;
      } else {
        acc[curr * 10] = '';
      }
      return acc;
    }, {});
  }

  handleChange(value) {
    this.props.handleChange(this.props.id, value);
  }

  render() {
    return (
      <Row className="mt-4 align-items-center justify-content-center">
        <Col xs={4}>
          <h5>{this.props.title}</h5>
          <p>{this.props.description}</p>
        </Col>
        <Col xs={8} className="p-3">
          <ReactSlider
            min={0}
            max={100}
            step={10}
            defaultValue={50}
            marks={this.marks}
            included={false}
            onChange={this.handleChange}
          />
        </Col>
      </Row>
    );
  }
}

Slider.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  leftValue: PropTypes.string.isRequired,
  rightValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Slider;
