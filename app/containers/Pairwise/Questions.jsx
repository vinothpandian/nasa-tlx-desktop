import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import QuestionCard from './QuestionCard';
import InfoBlock from './InfoBlock';

const shortid = require('shortid');
const definitions = require('../../assets/datastore/definitions.json');

class Questions extends Component {
  constructor(props) {
    super(props);

    this.optionList = Object.entries(definitions).map(([key]) => ({
      id: shortid.generate(),
      name: key.split(' ')[0].toLowerCase(),
      option: key,
    }));

    this.getOption = ([x, y]) => [this.optionList[x], this.optionList[y]];
  }

  render() {
    const options = this.getOption(this.props.options);

    return (
      <Container className="p-xl-2">
        <Row className="justify-content-center align-items-center text-center h-100">
          <Col xs="9" xl="7" className="px-5 py-4">
            <QuestionCard
              qNo={this.props.choice}
              options={options}
              handleClick={this.props.handleClick}
            />
          </Col>
        </Row>
        <Row className="justify-content-around align-items-stretch">
          {
            options.map(({ option }) => (
              <InfoBlock
                key={shortid.generate()}
                title={option}
                definition={definitions[option]}
              />
            ))
          }
        </Row>
        {this.props.alertMessage}
      </Container>
    );
  }
}

Questions.propTypes = {
  choice: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleClick: PropTypes.func.isRequired,
  alertMessage: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.string.isRequired,
  ]).isRequired,
};

export default Questions;
