import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Col } from 'reactstrap';

function InfoBlock(props) {
  const borderStyle = {
    border: 'rgba(0, 0, 0, 0.125) 1px solid',
  };

  return (
    <Col xs={5} className="infoblock border rounded p-xl-2" style={borderStyle}>
      <Card className="border-0 p-2 p-xl-3">
        <CardTitle className="pt-2 pb-0 p-xl-3">
          {props.title}
        </CardTitle>
        <CardBody className="p-2 p-xl-3">
          {props.definition}
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
