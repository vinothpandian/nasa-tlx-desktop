import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Col, Row } from 'reactstrap';

function DataDump(props) {
  const preStyle = {
    display: 'block',
    padding: '10px 30px',
    margin: '0',
  };

  return (
    <Row className=" justify-content-center align-items-stretch py-5 h-100">
      <Col xs="5" className="p-5 border rounded border-dark">
        <h4>Data From Redux</h4>
        <div>
          <pre style={preStyle}>
            {JSON.stringify(props.reduxData, null, 2)}
          </pre>
        </div>
      </Col>
      <Col xs="5" className="p-5 border rounded border-dark">
        <h4>Data From Database</h4>
        <div>
          <pre style={preStyle}>
            {JSON.stringify(props.lowdbData, null, 2)}
          </pre>
        </div>
      </Col>
      {/* todo add git link here */}
      <Alert className="m-5" color="danger">
        Please <strong>copy</strong> these data and <i>report this error in GitHub</i>
      </Alert>
    </Row>
  );
}

DataDump.propTypes = {
  reduxData: PropTypes.shape().isRequired,
  lowdbData: PropTypes.shape().isRequired,
};

export default DataDump;
