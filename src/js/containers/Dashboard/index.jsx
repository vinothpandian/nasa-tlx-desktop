import React from 'react';
import { Col, Row } from 'reactstrap';

function Dashboard() {
  return (
    <Row className="justify-content-center align-items-center h-100">
      <Col xs="auto">
        <h1 className="display-1">
          Dashboard
        </h1>
      </Col>
    </Row>
  );
}


Dashboard.propTypes = {};

export default Dashboard;
