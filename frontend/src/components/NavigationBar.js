import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Dropdown } from "react-bootstrap";
import "../styles/NavigationBar.css";
// import { useNavigate } from "react-router-dom";

function NavigationBar() {
  // const navigate = useNavigate();
  const dropdownStyle = {
    backgroundColor: '#F0F0F0',
    color: "black",
    border: "none",
    borderRadius: "20px",
    padding: "0.7rem"
  };

  // const jobCategories = ["All Jobs", "Applied Jobs", "Saved Jobs"];

  // const handleJobCategory = (event) => {
  //   const jobcategory = event.target.name;
  //   navigate("/jobListings");
  // }

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
                <Navbar.Text>
                  <Dropdown className="text-start">
                    <Dropdown.Toggle style={{ backgroundColor: "inherit", border: "none", padding: "0" }}>
                      Jobs
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={dropdownStyle}>
                      <Dropdown.Item as="button" className="filter-dropdown">
                        <a href="/jobListings">All Jobs</a>
                      </Dropdown.Item>
                      <Dropdown.Item as="button" className="filter-dropdown">
                        <a href="/appliedJobs">Applied Jobs</a>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Navbar.Text>
                {/* <NavDropdown title="Jobs">
                <Dropdown.Menu style={dropdownStyle}>
                      {jobCategories.map((jobSector) => (
                        <Dropdown.Item as="button" className="filter-dropdown">{jobSector}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                </NavDropdown> */}
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
