import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Alert, Button, Form, FormGroup, Input, InputGroup, InputGroupButton,
  Label,
} from 'reactstrap';
import { storeData } from '../../actions';
import { ipcRenderer } from 'electron';

const shortid = require('shortid');

class MainForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expID: '',
      partID: '',
      alertMessage: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.generateRandom = this.generateRandom.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();

    if (this.state.expID !== '' && this.state.partID !== '') {
      let isDataStored = false;

      const payload = {
        id: Date.now(),
        expID: this.state.expID,
        partID: this.state.partID,
      };

      isDataStored = ipcRenderer.sendSync('addParticipant', payload);

      if (isDataStored) {
        this.props.storeExpData(payload);
        this.props.formSubmitted();
      } else {
        this.setState({
          alertMessage: <Alert color="danger">Participant ID already exists!</Alert>,
        });
      }
    } else {
      this.setState({
        alertMessage: <Alert color="warning">Please fill experiment and participant ID</Alert>,
      });
    }
  }

  onInputChange(event) {
    event.preventDefault();

    const { name } = event.target;

    this.setState({
      [name]: event.target.value,
    });
  }

  generateRandom(event) {
    event.preventDefault();

    this.setState({
      partID: shortid.generate().toUpperCase(),
    });
  }

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <FormGroup>
          <Label>Experiment ID</Label>
          <Input name="expID" onChange={this.onInputChange} value={this.state.expID} />
        </FormGroup>
        <FormGroup>
          <Label>Participant ID</Label>
          <InputGroup>
            <Input name="partID" onChange={this.onInputChange} value={this.state.partID} />
            <InputGroupButton>
              <Button onClick={this.generateRandom} color="info">Random</Button>
            </InputGroupButton>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Button className="mt-4" color="success">Submit</Button>
        </FormGroup>
        {this.state.alertMessage}
      </Form>
    );
  }
}

MainForm.propTypes = {
  storeExpData: PropTypes.func.isRequired,
  formSubmitted: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  storeExpData: storeData.storeExpData,
}, dispatch);

export default connect(null, mapDispatchToProps)(MainForm);
