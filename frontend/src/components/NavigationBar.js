// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import "../styles/NavigationBar.css";

function NavigationBar() {
  return (
    <Navbar className="navigationBar" bg="#2C74B3" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" className="navigationBar">
          Dal Linked
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{
              maxHeight: "100px",
            }}
            navbarScroll
          >
            <Nav.Link href="/" className="navigationBar">
              Home
            </Nav.Link>
            <Nav.Link href="/contactUs" className="navigationBar">
              Contact Us
            </Nav.Link>
            <Nav.Link href="/faq" className="navigationBar">
              FAQ
            </Nav.Link>
          </Nav>
          <Nav.Link href="#">SignIn / SignUp</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
