import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Offcanvas from "react-bootstrap/Offcanvas";
import { Dropdown } from "react-bootstrap";
import "../styles/NavigationBar.css";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/App.css";


function NavigationBar() {

  const dropdownStyle = {
    backgroundColor: '#F0F0F0',
    color: "black",
    border: "none",
    borderRadius: "20px",
    padding: "0.7rem"
  };

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout();
  };

  const adminNavLinks = [
    { text: "Announcements", href: "/announcements" },
    { text: "Employers", href: "/activeEmp" },
    { text: "Job Sectors", href: "/jobSectors" },
    { text: "Requests", href: "/pendingEmpReq" },
  ];

  const studentNavLinks = [
    { text: "Announcements", href: "/announcements" },
    { text: "Jobs", href: "/joblistings" },
    { text: "Contact Us", href: "/contactUs" },
    { text: "FAQ", href: "/faq" },
  ];

  const employerNavLinks = [
    { text: "Create Job Post", href: "/CreateJobPost" },
  ];

  const userType = user ? user.userType : null;
  let navLinks = [];

  if (userType === 'admin') {
    navLinks = adminNavLinks;
  } else if (userType === 'student') {
    navLinks = studentNavLinks;
  } else if (userType === 'employer') {
    navLinks = [...studentNavLinks, ...employerNavLinks];

  }

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
                {navLinks.map((link) => (
                  <Nav.Link key={link.href} href={link.href} className="navigationBar">
                    {link.text}
                  </Nav.Link>
                ))}
                {
                  (user !== null && user.userType === "student") &&
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
                }
              </Nav>
              <Nav>
                {!user && (
                  <Nav.Link href="/login-signup" className="navigationBar">
                    SignIn / SignUp
                  </Nav.Link>
                )}
                {user && (
                  <Nav.Link onClick={handleClick} className="navigationBar">
                    Logout
                  </Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
