import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader } from 'reactstrap';
import QuestionPair from './QuestionPair';

function QuestionCard(props) {
  return (
    <Card>
      <CardHeader>
        <h5>
          Question {props.qNo + 1} of 15
        </h5>
      </CardHeader>
      <div className="p-5">
        <h5>
          Of the two workload measures below, which one contributed the most to the task you
          just completed?
        </h5>
        <CardBody>
          <QuestionPair
            options={props.options}
            handleClick={props.handleClick}
          />
        </CardBody>
      </div>
    </Card>
  );
}

QuestionCard.propTypes = {
  qNo: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default QuestionCard;
