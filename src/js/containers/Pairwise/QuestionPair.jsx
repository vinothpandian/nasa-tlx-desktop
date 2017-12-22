import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';

function QuestionPair(props) {
  return (
    <Row>
      <Col>
        <Button
          color="primary"
          name={props.options[0].name}
        >
          {props.options[0].option}
        </Button>
      </Col>
      <Col>
        <p className="lead">or</p>
      </Col>
      <Col>
        <Button
          color="primary"
          name={props.options[1].name}
        >
          {props.options[1].option}
        </Button>
      </Col>
    </Row>
  );
}

QuestionPair.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuestionPair;
