import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Col } from 'reactstrap';

function InfoBlock(props) {
  const borderStyle = {
    border: 'rgba(0, 0, 0, 0.125) 1px solid',
  };

  return (
    <Col xs={5} className="border rounded" style={borderStyle}>
      <Card className="border-0 p-3">
        <CardTitle>
          {props.title}
        </CardTitle>
        <CardBody>
          <p>
            {props.definition}
          </p>
        </CardBody>
      </Card>
    </Col>
  );
}

InfoBlock.propTypes = {
  title: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
};

export default InfoBlock;
