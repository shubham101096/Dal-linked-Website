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
      <Navbar key="md" className="navigationBar" expand="md">
        <Container fluid>
          <Navbar.Brand href="/" className="navigationBar">
            Dal Linked
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Options
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Nav.Link href="/" className="navigationBar">
                  Home
                </Nav.Link>
                <Nav.Link href="/joblistings" className="navigationBar">
                  Job Listings
                </Nav.Link>
                <Nav.Link href="/contactUs" className="navigationBar">
                  Contact Us
                </Nav.Link>
                <Nav.Link href="/faq" className="navigationBar">
                  FAQ
                </Nav.Link>
                <Nav.Link href="/mainStoryPage" className="navigationBar">
                  SuccessStories
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
