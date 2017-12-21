import React from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import { Col, Row } from 'reactstrap';

function PageNotFound() {
  return (
    <Row className="justify-content-center align-items-center h-100">
      <Col xs="auto" className="text-center">
        <h1 className="display-1">404</h1>
        <p className="lead">We could not find the page..</p>
        <p className="text-danger">
          Sorry, but the page you are looking for was either not found or does not exist.
          Try refreshing the page or click the button below to go back to the Homepage.
        </p>
        <NavLink exact className="btn btn-lg btn-primary" to="/">Home</NavLink>
      </Col>
    </Row>
  );
}

export default PageNotFound;
