import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import RadioButton from './RadioButton';

const _ = require('lodash');

class RadioButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.values = {};
  }

  componentWillMount() {
    this.values = this.props.values.map(value => ({
      id: _.uniqueId(value),
      value
    }));
  }

  render() {
    return (
      <FormGroup>
        <Label for={this.props.id}>{this.props.title}</Label>
        <div id={this.props.id}>
          {this.values.map((item, index) => (
            <RadioButton
              key={item.id}
              name={this.props.id}
              onSelect={this.props.onSelect}
              id={this.props.id + index}
              value={item.value}
            />
          ))}
        </div>
      </FormGroup>
    );
  }
}

RadioButtonGroup.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default RadioButtonGroup;
