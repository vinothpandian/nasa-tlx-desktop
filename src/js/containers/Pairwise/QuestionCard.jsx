import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import QuestionPair from './QuestionPair';

function QuestionCard(props) {
  return (
    <Card className="w-75">
      <CardHeader>
        Question {props.qNo} of 15
      </CardHeader>
      <CardTitle>
        Of the two workload measures below, which one contributed the most to the task you just
        completed?
      </CardTitle>
      <CardBody>
        <QuestionPair
          options={
            [
              {
                option: 'Mental Demand',
                name: 'mental',
              },
              {
                option: 'Physical Demand',
                name: 'physical',
              },
            ]
          }
        />
      </CardBody>
    </Card>
  );
}


QuestionCard.propTypes = {
  qNo: PropTypes.number.isRequired,
};

export default QuestionCard;
