import React from 'react'
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap'
import {
  Link
} from "react-router-dom";

const AppBar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/" className='text-decoration-none'>Business</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/" className='text-decoration-none'>Create User</Link>
              </Nav.Link>
              <NavLink>
                <Link to="/user" className='text-decoration-none'>Users</Link>
              </NavLink>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default AppBar