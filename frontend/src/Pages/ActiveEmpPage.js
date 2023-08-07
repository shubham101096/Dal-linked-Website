/* MADE BY SHUBHAM MISHRA */

import { useState, useEffect } from "react";
import { ListGroup, Button, Container, Row, Col, Card, Modal, Form, Pagination } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import Footer from "./../components/Footer.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ActiveEmpPage() {
  // State variables to manage active employers and other UI elements
  const [activeEmployers, setEmployerRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [curReq, setCurReq] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { user } = useAuthContext();

  // Function to fetch the list of active employers
  const fetchActiveEmployers = async (userToken) => {
    try {
      const empActiveUrl = `${backendUrl}/employerReg/status/active`;
      const response = await axios.get(empActiveUrl, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });
      setEmployerRequests(response.data.employers);
    } catch (error) {
      console.error("Error fetching employers:", error);
    }
  };

  // Function to update the status of an employer request
  const updateEmpStatus = async (userToken, updatedStatus) => {
    try {
      const empStatusUpdateUrl = `${backendUrl}/employerReg/status/${curReq._id}`;
      const response = await axios.put(
        empStatusUpdateUrl,
        { status: updatedStatus, id: curReq.id },
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      if (response.status === 200) {
        fetchActiveEmployers(userToken);
        toast.success("Employer access revoked successfully.");
      } else {
        toast.error("Error in revoking employer access.");
        console.error("Error in revoking employer access:", response.status);
      }
      setShowRevokeModal(false);
    } catch (error) {
      toast.error("Error in revoking employer access.");
      console.error("Error in revoking employer access:", error);
    }
  };

  // Function to handle revoke action
  const handleRevoke = (request) => {
    setCurReq(request);
    setShowRevokeModal(true);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRevokeConfirm = () => {
    updateEmpStatus(user.token, "inactive");
  };

  // Function to filter the active employers based on the search term
  const filteredEmployers = () => {
    return activeEmployers.filter((employer) => {
      return employer.employerName
        .toUpperCase()
        .includes(searchTerm.toUpperCase());
    });
  };

  // Pagination setup
  const employersPerPage = 5;
  const totalPages = Math.ceil(filteredEmployers().length / employersPerPage);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    setActivePage(1);
  }, [totalPages]);

  const indexOfLastEmployer = activePage * employersPerPage;
  const indexOfFirstEmployer = indexOfLastEmployer - employersPerPage;
  const currentEmployers = filteredEmployers().slice(
    indexOfFirstEmployer,
    indexOfLastEmployer
  );

  // Fetch active employers when the user information changes
  useEffect(() => {
    if (user) {
      fetchActiveEmployers(user.token);
    }
  }, [user]);

  // Return UI components based on user authentication
  if (!user) {
    return <p>Please signin to access this page.</p>;
  }

  return (
    <>
      <Container className="mt-3">
        <h3 className="text-center">Currently Active Employers</h3>
        <Row className="justify-content-center">
          <Col sm={12} md={6} lg={4}>
            <Form className="mb-3">
              <div className="d-flex justify-content-between align-items-center p-0 mb-2 mt-2">
                <div className="d-flex flex-grow-1 me-2">
                  <Form.Control
                    type="text"
                    placeholder="Search employers by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </Form>
            <ListGroup>
              {currentEmployers.map((employer) => (
                <ListGroup.Item key={employer.id} style={{ border: "none" }}>
                  <Card>
                    <div className="d-flex justify-content-center mt-2">
                      <Card.Img
                        variant="top"
                        src={employer.companyLogo}
                        alt={employer.companyName}
                        style={{ maxWidth: "30px", height: "auto" }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{employer.companyName}</Card.Title>
                      <Card.Text>
                        <strong>Employer Name: </strong>
                        {employer.employerName}
                        <br />
                        <strong>Email: </strong>
                        {employer.email}
                        <br />
                        <strong>Contact Number: </strong>
                        {employer.contactNumber}
                      </Card.Text>
                      <Button
                        style={{
                          color: "red",
                          backgroundColor: "rgba(200, 209, 214, 0.5)",
                          borderRadius: "25px",
                        }}
                        onClick={() => handleRevoke(employer)}
                      >
                        Revoke access
                      </Button>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        {filteredEmployers().length > employersPerPage && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === activePage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        )}
        {/* Revoke Modal */}
        <Modal
          show={showRevokeModal}
          onHide={() => setShowRevokeModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Revoke</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to revoke{" "}
            <strong>{curReq?.employerName}'s</strong> access?
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{
                color: "grey",
                backgroundColor: "rgba(200, 209, 214, 0.5)",
                borderRadius: "25px",
              }}
              onClick={() => setShowRevokeModal(false)}
            >
              No
            </Button>
            <Button
              style={{
                color: "red",
                backgroundColor: "rgba(200, 209, 214, 0.5)",
                borderRadius: "25px",
              }}
              onClick={handleRevokeConfirm}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      {/* Toast Container for notifications */}
      <ToastContainer />
      {/* Footer component */}
      <Footer />
    </>
  );
}

export default ActiveEmpPage;
