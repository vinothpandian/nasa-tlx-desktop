import React, { Component } from 'react';
import {
  Alert,
  Button,
  ButtonDropdown,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row
} from 'reactstrap';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import Navigation from '../Nav';
import DashboardTable from './DashboardTable';

const { dialog } = require('electron').remote;
const shortid = require('shortid');

class Dashboard extends Component {
  constructor(props) {
    super(props);

    let experimentID = 'Select';
    let openTable = false;

    this.experiments = ipcRenderer.sendSync('getExperimentList');

    if (this.experiments !== 'No data found') {
      experimentID = this.experiments[0];
      openTable = true;
    } else {
      alert('No user data found', 'Dashboard');
      this.experiments = [];
      this.props.history.push('/');
    }

    this.state = {
      dropdownOpen: false,
      experimentID,
      openTable
    };

    this.toggle = this.toggle.bind(this);
    this.dropDownClick = this.dropDownClick.bind(this);
    this.backupData = this.backupData.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  dropDownClick(event) {
    event.preventDefault();

    this.setState({
      experimentID: event.target.name,
      openTable: true
    });
  }

  backupData() {
    dialog.showSaveDialog({ filters: [{ name: 'JSON', extensions: ['json'] }] }, fileName => {
      if (fileName === undefined) {
        return;
      }
      const backupStatus = ipcRenderer.sendSync('backup', this.state.experimentID, fileName);

      if (backupStatus) {
        alert(`Backup to ${fileName} successful`, 'Backup status');
      } else {
        alert('Sorry! Please saving it in a different drive', 'Backup status');
      }
    });
  }

  backupAllData() {
    dialog.showSaveDialog({ filters: [{ name: 'JSON', extensions: ['json'] }] }, fileName => {
      if (fileName === undefined) {
        return;
      }
      const backupStatus = ipcRenderer.sendSync('backupAll', fileName);

      if (backupStatus) {
        alert(`Backup to ${fileName} successful`, 'Backup status');
      } else {
        alert('Sorry! Please saving it in a different drive', 'Backup status');
      }
    });
  }

  componentDidCatch() {
    alert(
      'Incomplete or corrupted data found, please backup the data and check for inconsistencies'
    );
    this.props.history.push('/');
  }

  render() {
    return (
      <div id="homeContainer">
        <Navigation home={false} />
        <Row className="p-5">
          <Col xs={12}>
            <h2 className="font-weight-normal">Dashboard</h2>
            <hr />
            <Row className="p-4 align-items-center">
              <Col xs="auto">
                <h4 className="font-weight-normal">Choose the Experiment Data to display</h4>
              </Col>
              <Col xs="auto">
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret color="primary">
                    {this.state.experimentID}
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.experiments.map(value => (
                      <DropdownItem
                        key={shortid.generate()}
                        name={value}
                        onClick={this.dropDownClick}
                      >
                        {value}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
                <Button color="success" className="ml-3" onClick={this.backupData}>
                  Backup this experiment data
                </Button>
                <Button color="success" className="ml-3" onClick={this.backupAllData}>
                  Backup all data
                </Button>
              </Col>
              <Col xs={12} className="mt-5">
                {this.state.openTable ? (
                  <DashboardTable expID={this.state.experimentID} />
                ) : (
                  <div />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.shape().isRequired
};

export default Dashboard;
