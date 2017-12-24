import React from 'react';
import { Form, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const nasaLogo = require('../../assets/NasaLogo.png');

function Navigation(props) {
  return (
    <Navbar className="justify-content-start" color="dark">
      <NavbarBrand tag={Link} className="nav-link" to="/">
        <img className="mr-3" src={nasaLogo} alt="Logo" height="30" />
        Nasa TLX
      </NavbarBrand>
      <Nav>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
      </Nav>
      {
        props.home
          ?
            <div className="ml-auto text-white">
              <Nav>
                <Link className="btn btn-success mr-2" to="/definitions">Definitions</Link>
                <Link className="btn btn-info mr-2" to="/instructions">Instructions</Link>
              </Nav>
            </div>
          :
            <div />
      }
    </Navbar>
  );
}

Navigation.propTypes = {
  home: PropTypes.bool.isRequired,
};

export default Navigation;
