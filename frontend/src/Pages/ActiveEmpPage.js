import { useState, useEffect } from 'react';
import { ListGroup, Button, Container, Row, Col, Card, Modal, Form, Pagination } from 'react-bootstrap';
import { useAuthContext } from "../hooks/useAuthContext";
import axios from 'axios';

function ActiveEmpPage() {
  const [activeEmployers, setEmployerRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [curReq, setCurReq] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { user } = useAuthContext();

  const fetchActiveEmployers = async (userToken) => {
    try {
      const empActiveUrl = `${backendUrl}/employerReg/status/active`;
      const response = await axios.get(empActiveUrl, {
        headers: {
            Authorization: "Bearer " + userToken
        }
        });
      setEmployerRequests(response.data.employers);
    } catch (error) {
      console.error('Error fetching employers:', error);
    }
  };

  const updateEmpStatus = async (userToken, updatedStatus) => {
    try {
      const empStatusUpdateUrl = `${backendUrl}/employerReg/status/${curReq._id}`;
      const response = await axios.put(empStatusUpdateUrl,
        { status: updatedStatus, id: curReq.id },
        {
        headers: {
            Authorization: "Bearer " + userToken
        }
        });
        if (response.status === 200) {
          fetchActiveEmployers(userToken);
        } else {
          console.error('Error deleting sector:', response.status);
        }
        setShowApproveModal(false);
        setShowRevokeModal(false);
    } catch (error) {
      console.error('Error fetching  employers:', error);
    }
  };

  const handleRevoke = (request) => {
    setCurReq(request);
    setShowRevokeModal(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRevokeConfirm = () => {
    updateEmpStatus(user.token, 'inactive');
  };

  const filteredEmployers = () => {
    return activeEmployers.filter((employer) => {
      return employer.employerName.toUpperCase().includes(searchTerm.toUpperCase());
    });
  };

  const employersPerPage = 5;
  const totalPages = Math.ceil(
    filteredEmployers().length / employersPerPage
  );
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    setActivePage(1);
  }, [totalPages]);

  const indexOfLastEmployer = activePage * employersPerPage;
  const indexOfFirstEmployer =
    indexOfLastEmployer - employersPerPage;
  const currentEmployers = filteredEmployers().slice(
    indexOfFirstEmployer,
    indexOfLastEmployer
  );

  useEffect(() => {
    if (user) {
      fetchActiveEmployers(user.token);

    }
  }, [user]);

  if (!user) {
      return <p>Please signin to access this page.</p>;
  }

  return (
    <Container className='mt-3'>
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
              <ListGroup.Item key={employer.id} style={{ border: 'none' }}>
                <Card>
                  <div className="d-flex justify-content-center mt-2">
                    <Card.Img
                      variant="top"
                      src={employer.companyLogo}
                      alt={employer.companyName}
                      style={{ maxWidth: '30px', height: 'auto' }}
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
                    <Button variant="outline-danger" onClick={() => handleRevoke(employer)}>
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
      <Modal show={showRevokeModal} onHide={() => setShowRevokeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Revoke</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to revoke <strong>{curReq?.employerName}'s</strong> access?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRevokeModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleRevokeConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ActiveEmpPage;
