import React from 'react';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar expand='lg' bg='dark' variant='dark'>
      <LinkContainer to='/'>
        <Navbar.Brand>Asset Manager</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse>
        <Nav className='mr-auto'>
          <LinkContainer to='/about'>
            <Nav.Link>
              <i className='fas fa-info-circle'></i> About
            </Nav.Link>
          </LinkContainer>
          <NavDropdown title='Manage'>
            <LinkContainer to='/assets'>
              <NavDropdown.Item>
                <i className='fas fa-circle mr-2'></i> Assets
              </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to='/categories'>
              <NavDropdown.Item>
                <i className='fas fa-globe mr-2'></i> Categories
              </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to='/locations'>
              <NavDropdown.Item>
                <i className='fas fa-compass mr-2'></i> Locations
              </NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>
        <Nav>
          <LinkContainer to='/login'>
            <Nav.Link>
              Sign In <i className='fas fa-sign-in-alt'></i>
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
