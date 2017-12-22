import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { storeData } from '../../actions';
import RadioButtonGroup from './RadioButtonGroup';

class DetailsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ageGroup: '',
      genderGroup: '',
      experienceGroup: '',
      alertMessage: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillMount() {
    if ((!this.props.expID || this.props.expID === '') && (!this.props.partID || this.props.partID === '')) {
      this.props.history.push('/');
    }
  }

  onSelect(name, value) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.ageGroup === '' || this.state.genderGroup === '' || this.state.experienceGroup === '') {
      this.setState({
        alertMessage: <Alert color="danger">Please enter all the details</Alert>,
      });
    } else {
      this.props.storeDetails(this.state);
      this.props.history.push('/part1');
    }
  }

  render() {
    return (
      <Row className="justify-content-center align-items-center h-100">
        <Col xs="auto">
          <Form onSubmit={this.handleSubmit}>
            <Card>
              <CardHeader>Please enter your details</CardHeader>
              <CardBody>
                <RadioButtonGroup
                  id="ageGroup"
                  title="Choose your age group"
                  onSelect={this.onSelect}
                  values={['20-22', '23-25', '26-28', '29-31', 'Other']}
                />
                <hr />
                <RadioButtonGroup
                  id="genderGroup"
                  title="Choose your gender"
                  onSelect={this.onSelect}
                  values={['Male', 'Female', 'Other']}
                />
                <hr />
                <RadioButtonGroup
                  id="experienceGroup"
                  title="Choose your experience in the task"
                  onSelect={this.onSelect}
                  values={['0-1 year', '2-4 years', '5-7 years', 'Other']}
                />
                {this.state.alertMessage}
              </CardBody>
              <CardFooter>
                <Button color="primary">Submit</Button>
              </CardFooter>
            </Card>
          </Form>
        </Col>
      </Row>
    );
  }
}

DetailsForm.propTypes = {
  expID: PropTypes.string.isRequired,
  partID: PropTypes.string.isRequired,
  storeDetails: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  expID: state.questionnaire.experimentID,
  partID: state.questionnaire.participantID,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  storeDetails: storeData.storeDetails,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailsForm);
