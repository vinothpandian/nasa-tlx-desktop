import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import RadioButton from './RadioButton';

const shortid = 'shortid';

function RadioButtonGroup() {
  return (
    <FormGroup>
      <Label htmlFor={this.props.id}>{this.props.title}</Label>
      <div id={this.props.id}>
        {
          this.props.values.map((value, index) => (
            <RadioButton
              key={shortid.generate()}
              name={this.props.id}
              onSelect={this.props.onSelect}
              selected={this.props.selected}
              id={this.props.id + index}
              value={value}
            />
          ))
        }
      </div>
    </FormGroup>
  );
}


export default RadioButtonGroup;
