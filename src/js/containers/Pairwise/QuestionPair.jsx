import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';

class QuestionPair extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    this.props.handleClick(event.target.name);
  }

  render() {
    return (
      <Row className="align-items-center">
        <Col xs={12}>
          <Button
            className="w-75"
            color="primary"
            name={this.props.options[0].name}
            onClick={this.handleClick}
          >
            {this.props.options[0].option}
          </Button>
        </Col>
        <Col xs={12} className="align-self-center">
          <p className="lead">
            <span className="align-middle">or</span>
          </p>
        </Col>
        <Col xs={12}>
          <Button
            className="w-75"
            color="primary"
            name={this.props.options[1].name}
            onClick={this.handleClick}
          >
            {this.props.options[1].option}
          </Button>
        </Col>
      </Row>
    );
  }
}

QuestionPair.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default QuestionPair;
