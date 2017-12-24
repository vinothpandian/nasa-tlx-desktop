import React, { Component } from 'react';
import { Card, CardBody, Col, Table } from 'reactstrap';
import PropTypes from 'prop-types';

function DetailsCard(props) {
  return (
    <Col xs={6} className="mt-4">
      <Card>
        <CardBody className="py-0">
          <Table>
            <thead>
              <tr>
                <th scope="row">Details</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="col">Age</th>
                <td>{props.age}</td>
              </tr>
              <tr>
                <th scope="col">Gender</th>
                <td>{props.gender}</td>
              </tr>
              <tr>
                <th scope="col">Experience</th>
                <td>{props.experience}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
}

DetailsCard.propTypes = {
  age: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
};

export default DetailsCard;
