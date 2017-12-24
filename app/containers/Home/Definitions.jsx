import React from 'react';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import definitions from '../../assets/datastore/definitions.json';

const shortid = require('shortid');

function DefinitionsModal() {
  const definitionData = [];

  Object.entries(definitions).forEach(([key, value]) => {
    definitionData.push(<dt key={shortid.generate()} className="col-3 mt-4">{key}</dt>);
    definitionData.push(<dd key={shortid.generate()} className="col-9 mt-4">{value}</dd>);
  });

  return (
    <Row className="justify-content-center align-items-center p-5">
      <Col xs={10}>
        <Card className="p-4">
          <CardTitle>Definitions</CardTitle>
          <CardBody>
            <dl className="row">
              {definitionData}
            </dl>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default DefinitionsModal;
