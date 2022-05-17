import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import {
  NavLink
} from "react-router-dom";

const AppBar = () => {
  let activeStyle = {
    textDecoration: "underline",
  };


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <NavLink to="/" className='text-decoration-none'>Business</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav-ul">
              <Nav.Link>
                <NavLink  to="/" className="text-dark" style={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }>Create User</NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/user" className="text-dark" style={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }>Users</NavLink>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default AppBar