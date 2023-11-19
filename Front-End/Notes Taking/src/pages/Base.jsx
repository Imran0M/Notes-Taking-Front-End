import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

function Base({ children , title, accountName}) {
  const navigate = useNavigate()
  function logOut(){
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
      {['sm'].map((expand) => (
        <Navbar key={expand} expand={expand}  className="bg-body-secondary ">
          <Container fluid>
            <Navbar.Brand href="#">Notes Taking </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                 {accountName}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={() => { navigate('/dashboard') }}> Home </Nav.Link>
                  <Nav.Link onClick={() => { navigate('/addnotes') }}> Add Notes </Nav.Link>
                  <Button variant="secondary" onClick={logOut}>logout</Button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <h2>{title}</h2>
      <main>{children}</main>
    </div>
  )
}

export default Base