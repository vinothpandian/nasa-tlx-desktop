import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from 'reactstrap';

class RadioButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.focusTextInput = this.focusTextInput.bind(this);
    this.selectOtherButton = this.selectOtherButton.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(event) {
    event.preventDefault();

    this.props.onSelect(this.props.name, event.target.value);

    this.setState({
      value: event.target.value
    });
  }

  focusTextInput() {
    this.textInput.focus();
    this.props.onSelect(this.props.name, this.state.value);
  }

  selectOtherButton(event) {
    this.radioButton.checked = true;
    this.props.onSelect(this.props.name, event.target.value);
  }

  handleClick(event) {
    this.props.onSelect(this.props.name, event.target.value);
  }

  render() {
    if (this.props.value.toLowerCase() === 'other') {
      return (
        <FormGroup check inline>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Input
                  addon
                  type="radio"
                  name={this.props.name}
                  value={this.state.value}
                  innerRef={input => {
                    this.radioButton = input;
                  }}
                  onChange={this.focusTextInput}
                  onClick={this.focusTextInput}
                />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="text"
              placeholder="Other"
              value={this.state.value}
              onFocus={this.selectOtherButton}
              onChange={this.onTextChange}
              innerRef={input => {
                this.textInput = input;
              }}
            />
          </InputGroup>
        </FormGroup>
      );
    }

    return (
      <FormGroup check inline className="mr-5">
        <Label check>
          <Input
            type="radio"
            name={this.props.name}
            value={this.props.value}
            onChange={this.handleClick}
            onClick={this.handleClick}
          />
          {this.props.value}
        </Label>
      </FormGroup>
    );
  }
}

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default RadioButton;
