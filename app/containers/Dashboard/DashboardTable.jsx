import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import {
  Bar,
  BarChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis,
  YAxis
} from 'recharts';
import { Col, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

const shortid = require('shortid');
const moment = require('moment');

class DashboardTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      experimentsData: [],
      chartData: [],
      average: 0,
      tableData: [],
    };

    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData(this.props.expID);
  }

  componentWillReceiveProps(nextProps) {
    this.updateData(nextProps.expID);
  }

  updateData(expID) {
    const experimentsData = ipcRenderer.sendSync('getExperiment', expID);
    const chartData = [];

    const average = (experimentsData.reduce((acc, experiment) => {
      const taskload = experiment.taskload || 0;
      chartData.push({
        name: experiment.participantID,
        taskload,
      });
      return acc + taskload;
    }, 0) / experimentsData.length).toFixed(2);

    const tableData = experimentsData.map((row, index) => (
      <tr key={shortid.generate()}>
        <td>{index + 1}</td>
        <th scope="row">{row.participantID}</th>
        <td>{row.taskload || 'Data missing'}</td>
        <td>{row.age}</td>
        <td>{row.gender}</td>
        <td>{row.experience}</td>
        <td>{moment(row.id).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td>
          <Link
            to={`/rawdata/${row.experimentID}/${row.participantID}`}
            className="btn btn-sm btn-info"
          >
            View Raw Data
          </Link>
        </td>
      </tr>
    ));

    tableData.push(
      <tr key={shortid.generate()} className="averageRow">
        <th />
        <th scope="col">Average</th>
        <th colSpan={6} scope="col">{average}</th>
      </tr>
    );

    this.setState({
      experimentsData,
      chartData,
      average,
      tableData,
    });
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <h3>{`Experiment : ${this.props.expID}`}</h3>
        </Col>
        <Col xs={12} className="mt-4">
          <Table>
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">Participant ID</th>
                <th scope="col">Weighted Rating</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
                <th scope="col">Experience</th>
                <th scope="col">Date and Time</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {this.state.tableData}
            </tbody>
          </Table>
          <hr />
        </Col>

        <h1 className="mt-3">Taskload chart of participants</h1>
        <Row className="justify-content-center align-items-center w-100 mt-5 h-100">

          <Col xs={12}>
            <ResponsiveContainer width={'100%'} height={400}>
              <BarChart data={this.state.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{ value: 'Participants', position: 'bottom' }} dataKey="name" />
                <YAxis
                  label={{ value: 'taskload', angle: -90, position: 'insideLeft' }}
                  domain={[0, 100]}
                />
                <Tooltip />
                <Legend align="left" verticalAlign="bottom" />
                <Bar dataKey="taskload" fill="#8884d8" />
                <ReferenceLine
                  y={parseFloat(this.state.average)}
                  stroke="red"
                  strokeDasharray="3 3"
                  label={{ value: `Average: ${this.state.average}`, position: 'insideBottom' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Row>
    );
  }
}

DashboardTable.propTypes = {
  expID: PropTypes.string.isRequired,
};

export default DashboardTable;
