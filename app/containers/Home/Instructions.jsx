import React from 'react';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';

function InstructionsModal() {
  return (
    <Row className="justify-content-center align-items-center p-5">
      <Col xs={10}>
        <Card className="p-4">
          <CardTitle>Instructions</CardTitle>
          <CardBody>
            <p>The following assessment is used to measure your personal opinion on how much
              workload was required of you during the task you just completed.
            </p>
            <p>Please rate all six workload measures by clicking a point on the scale that best
              represents your experience with the task you just completed.
            </p>
            <p>Consider each scale individually and select your responses carefully.</p>
            <p>Please note that the Performance scale is a measure of how well you think you
              did on the task with Poor performance on the left, and Good performance on
              the right.
            </p>
            <p>Your ratings will play an important role in the evaluation being conducted. Your
              active participation is essential to the success of this experiment, and is greatly
              appreciated.
            </p>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default InstructionsModal;
