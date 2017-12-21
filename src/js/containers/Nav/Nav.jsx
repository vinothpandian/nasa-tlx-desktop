import React, { Component } from 'react';
import { Button, Form, Navbar, NavbarBrand } from 'reactstrap';
import InstructionsModal from './Modals/InstructionsModal';
import DefinitionsModal from './Modals/DefinitionsModal';

const question = require('../../../assets/question.svg');
const info = require('../../../assets/info.svg');
const nasaLogo = require('../../../assets/NasaLogo.png');

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instructions: false,
      definitions: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(id) {
    this.setState({
      [id]: !this.state[id],
    });
  }


  render() {
    return (
      <Navbar color="dark" dark>
        <NavbarBrand href="/">
          <img className="mr-3" src={nasaLogo} alt="Logo" height="30" />
                    Nasa TLX
        </NavbarBrand>
        <Form inline>
          <Button
            onClick={() => {
              this.toggle('definitions');
            }}
            className="mr-3"
            color="info"
          >
                        Definitions
            <img className="ml-2" src={question} alt="?" height="16" />
          </Button>
          <Button
            onClick={() => {
              this.toggle('instructions');
            }}
            color="success"
          >
                        Instructions
            <img className="ml-2" src={info} alt="?" height="16" />
          </Button>
        </Form>
        <DefinitionsModal
          modal={this.state.definitions}
          toggle={() => {
            this.toggle('definitions');
          }}
        />
        <InstructionsModal
          modal={this.state.instructions}
          toggle={() => {
            this.toggle('instructions');
          }}
        />
      </Navbar>
    );
  }
}

export default Nav;
