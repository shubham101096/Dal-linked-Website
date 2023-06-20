import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../styles/NavigationBar.css";
function NavigationBar() {
  return (
    <div className="navBarDiv">
      <Navbar key="sm" className="navigationBar" expand="sm">
        <Container fluid>
          <Navbar.Brand href="/" className="navigationBar">
            Dal Linked
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Options
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
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
              <Nav>
                <Nav.Link href="/" className="navigationBar">
                  SignIn / SignUp
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
