import { useState } from 'react';
import { ListGroup, Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';

function PendingEmployerList() {
  const [employerRequests, setEmployerRequests] = useState([
    {
      id: 1,
      companyName: 'Google',
      companyLogo: 'https://img.icons8.com/color/48/google-logo.png',
      employerName: 'John Doe',
      employerEmail: 'johndoe@example.com',
    },
    {
      id: 2,
      companyName: 'Mitsubishi',
      companyLogo: 'https://img.icons8.com/color/48/mitsubishi.png',
      employerName: 'Jane Smith',
      employerEmail: 'janesmith@example.com',
    },
    {
      id: 3,
      companyName: 'Netflix',
      companyLogo: 'https://img.icons8.com/color/48/netflix.png',
      employerName: 'David Johnson',
      employerEmail: 'davidjohnson@example.com',
    },
    {
      id: 4,
      companyName: 'Spotify',
      companyLogo: 'https://img.icons8.com/color/48/spotify--v1.png',
      employerName: 'Sarah Wilson',
      employerEmail: 'sarahwilson@example.com',
    },
    {
      id: 5,
      companyName: 'Coca Cola',
      companyLogo: 'https://img.icons8.com/color/48/coca-cola.png',
      employerName: 'Michael Brown',
      employerEmail: 'michaelbrown@example.com',
    },
    {
      id: 6,
      companyName: 'Company F',
      companyLogo: 'https://img.icons8.com/color/48/google-logo.png',
      employerName: 'Emily Davis',
      employerEmail: 'emilydavis@example.com',
    },
    {
      id: 7,
      companyName: 'Company G',
      companyLogo: 'https://img.icons8.com/color/48/google-logo.png',
      employerName: 'Daniel Anderson',
      employerEmail: 'danielanderson@example.com',
    },
    {
      id: 8,
      companyName: 'Company H',
      companyLogo: 'https://img.icons8.com/color/48/google-logo.png',
      employerName: 'Olivia Wilson',
      employerEmail: 'oliviawilson@example.com',
    },
    {
      id: 9,
      companyName: 'Company I',
      companyLogo: 'https://img.icons8.com/color/48/google-logo.png',
      employerName: 'William Taylor',
      employerEmail: 'williamtaylor@example.com',
    },
    {
      id: 10,
      companyName: 'Company J',
      companyLogo: 'https://img.icons8.com/color/48/google-logo.png',
      employerName: 'Sophia Martinez',
      employerEmail: 'sophiamartinez@example.com',
    },
  ]);
  
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [curReq, setCurReq] = useState('');


  const handleApprove = (request) => {
    setCurReq(request);
    setShowApproveModal(true);
  };

  const handleReject = (request) => {
    setCurReq(request);
    setShowRejectModal(true);
  };

  const handleApproveConfirm = () => {
    const EmployerRequests = employerRequests.filter((request) => request.id !== curReq.id);
    setEmployerRequests(EmployerRequests);
    setShowApproveModal(false);
  };

  const handleRejectConfirm = () => {
    const EmployerRequests = employerRequests.filter((request) => request.id !== curReq.id);
    setEmployerRequests(EmployerRequests);
    setShowRejectModal(false);
  };

  return (
    <Container>
      <h1 className="text-center">Pending Employer Requests</h1>
      <Row className="justify-content-center">
        <Col sm={12} md={6} lg={4}>
          <ListGroup>
            {employerRequests.map((request) => (
              <ListGroup.Item key={request.id} style={{ border: 'none' }}>
                <Card>
                  <div className="d-flex justify-content-center">
                    <Card.Img
                      variant="top"
                      src={request.companyLogo}
                      alt={request.companyName}
                      style={{ maxWidth: '30px', height: 'auto' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{request.companyName}</Card.Title>
                    <Card.Text>
                      <strong>Employer: </strong>
                      {request.employerName}
                      <br />
                      <strong>Email: </strong>
                      {request.employerEmail}
                    </Card.Text>
                    <Button variant="outline-success" onClick={() => handleApprove(request)}>
                      Approve
                    </Button>{' '}
                    <Button variant="outline-danger" onClick={() => handleReject(request)}>
                      Reject
                    </Button>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Rejection</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to reject "{curReq.employerName}" request?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleRejectConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to approve "{curReq.employerName}" request?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApproveModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleApproveConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PendingEmployerList;
