import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import Navigation from '../../Nav';
import DetailsCard from './DetailsCard';
import DataCard from './DataCard';

const moment = require('moment');
const _ = require('lodash');

class RawData extends Component {
  constructor(props) {
    super(props);

    this.expID = props.match.params.expID;
    this.partID = props.match.params.partID;

    this.data = ipcRenderer.sendSync('getData', this.expID, this.partID);

    const keys = Object.keys(this.data);
    const idealKeys = [
      'id',
      'experimentID',
      'participantID',
      'age',
      'experience',
      'gender',
      'scale',
      'taskload',
      'weightedWorkload',
      'workload'
    ];

    let error = false;

    if (this.data === 'No data found') {
      alert('No data found');
      error = true;
      this.props.history.push('/');
    } else if (!_.isEqual(keys, idealKeys)) {
      alert(
        'Incomplete or corrupted data found, please backup the data and check for inconsistencies'
      );
      error = true;
      this.props.history.push('/dashboard');
    } else {
      this.chartData = Object.entries(this.data.weightedWorkload).map(([key, value]) => ({
        name: key,
        score: parseFloat((value / 15).toFixed(2))
      }));
    }

    this.state = {
      error
    };
  }

  render() {
    if (this.state.error) return <div>Error</div>;

    const data = this.data;

    return (
      <div id="homeContainer">
        <Navigation home={false} />
        <Row className="align-items-stretch p-5">
          <Col xs={12}>
            <h3 className="font-weight-normal">
              {`Raw data of Participant "${data.participantID}" in Experiment "${
                data.experimentID
              }"`}
            </h3>
            <h5 className="font-weight-light">
              Experiment performed at {moment(data.id).format('MMMM Do YYYY, h:mm:ss a')}
            </h5>
          </Col>
          <Col xs={6} className="mt-4">
            <Card className="h-100 pt-3 px-4">
              <CardTitle>Weighted rating</CardTitle>
              <CardBody>
                <h3 className="display-3">{data.taskload}</h3>
              </CardBody>
            </Card>
          </Col>
          <DetailsCard age={data.age} experience={data.experience} gender={data.gender} />

          <Col xs={12} className="mt-4 h-50">
            <Card>
              <CardBody>
                <Row className="justify-content-center align-items-stretch">
                  <Col xs={9} xl={7}>
                    <ResponsiveContainer width={'100%'} height={'100%'}>
                      <BarChart data={this.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="none">
                          <Label value="Importance Weight" offset={-10} position="bottom" />
                        </XAxis>
                        <YAxis
                          label={{ value: 'Rating', angle: -90, position: 'insideLeft' }}
                          domain={[0, 'dataMax + 10']}
                        />
                        <Tooltip />
                        <Bar dataKey="score" fill="#82ca9d">
                          <LabelList dataKey="name" position="top" />
                        </Bar>
                        <Legend align="left" verticalAlign="bottom" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Col>
                  <Col xs={3} xl={2}>
                    <ResponsiveContainer width={'100%'} height={400}>
                      <BarChart
                        data={[{ tag: 'Weighted Rating', 'Overall Workload': data.taskload }]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="none">
                          <Label value="Overall Workload" offset={-10} position="bottom" />
                        </XAxis>
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="Overall Workload" fill="#8884d8">
                          <LabelList dataKey="tag" position="top" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <DataCard title="Raw ratings" values={data.scale} />
          <DataCard
            title="Sources of Workload tally (number of times selected)"
            values={data.workload}
          />
          <DataCard title="Adjusted Rating (Weight x Raw)" values={data.weightedWorkload} />
        </Row>
      </div>
    );
  }
}

RawData.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
};

export default RawData;
