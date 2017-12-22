import React from 'react';
import { Alert, Col, Row } from 'reactstrap';

function ThankYou() {
  return (
    <Row className="justify-content-center align-items-center h-100">
      <Col xs="auto">
        <h4 className="display-3">
          Thank you for your submission
        </h4>
        <Alert className="text-center mt-5" color="success">
          Please inform that you have completed the NASA-TLX questionnaire successfully
        </Alert>
      </Col>
    </Row>
  );
}

export default ThankYou;
