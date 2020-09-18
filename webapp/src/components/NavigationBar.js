import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar className="navbar navbar-icon-top navbar-expand-lg navbar-light bg-primary">
      <Navbar.Brand href="/">Guru Charcha Feedback Form</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      { /* <Form>
        <FormControl type="label" placeholder="Search" className=""/>
      </Form> */ }
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/home?date=09/13/2020&loc=DEN"><span className="fa fa-fw fa-home" /><span>Home</span></Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/about"><span className="fas fa-info-circle" /><span>About</span></Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)