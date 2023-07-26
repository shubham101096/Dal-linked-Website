import { useState, useEffect } from 'react';
import { ListGroup, Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { useAuthContext } from "../hooks/useAuthContext";
import axios from 'axios';

function PendingEmpReqPage() {
  const [employerRequests, setEmployerRequests] = useState([]);
  
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [curReq, setCurReq] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { user } = useAuthContext();

  const fetchEmpReg = async (userToken) => {
    try {
      const empPendingUrl = `${backendUrl}/employerReg/status/pending`;
      const response = await axios.get(empPendingUrl, {
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
          fetchEmpReg(userToken);
        } else {
          console.error('Error deleting sector:', response.status);
        }
        setShowApproveModal(false);
        setShowRejectModal(false);
    } catch (error) {
      console.error('Error fetching employers:', error);
    }
  };

  const handleApprove = (request) => {
    setCurReq(request);
    setShowApproveModal(true);
  };

  const handleReject = (request) => {
    setCurReq(request);
    setShowRejectModal(true);
  };

  const handleApproveConfirm = () => {
    updateEmpStatus(user.token, 'active');
  };

  const handleRejectConfirm = () => {
    updateEmpStatus(user.token, 'inactive');
  };

  useEffect(() => {
    if (user) {
      fetchEmpReg(user.token);

    }
  }, [user]);

  if (!user) {
      return <p>Please signin to access this page.</p>;
  }

  return (
    <Container>
      <h3 className="text-center mt-3 mb-3">Pending Employers' Requests</h3>
      <Row className="justify-content-center">
        <Col sm={12} md={6} lg={4}>
          <ListGroup>
            {employerRequests.map((request) => (
              <ListGroup.Item key={request.id} style={{ border: 'none' }}>
                <Card>
                  <div className="d-flex justify-content-center mt-2">
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
                      <strong>Employer Name: </strong>
                      {request.employerName}
                      <br />
                      <strong>Email: </strong>
                      {request.email}
                      <br />
                      <strong>Contact Number: </strong>
                      {request.contactNumber}
                    </Card.Text>
                    <Button style={{color:'green', backgroundColor:'rgba(200, 209, 214, 0.5)' }} onClick={() => handleApprove(request)}>
                      Approve
                    </Button>{' '}
                    <Button style={{color:'red', backgroundColor:'rgba(200, 209, 214, 0.5)' }} onClick={() => handleReject(request)}>
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
        <Modal.Body>Are you sure you want to reject <strong>{curReq?.employerName}'s</strong> request?</Modal.Body>
        <Modal.Footer>
          <Button style={{color:'grey', backgroundColor:'rgba(200, 209, 214, 0.5)' }} onClick={() => setShowRejectModal(false)}>
            No
          </Button>
          <Button style={{color:'red', backgroundColor:'rgba(200, 209, 214, 0.5)' }} onClick={handleRejectConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to approve <strong>{curReq?.employerName}'s</strong> request?</Modal.Body>
        <Modal.Footer>
          <Button style={{color:'green', backgroundColor:'rgba(200, 209, 214, 0.5)' }} onClick={() => setShowApproveModal(false)}>
            No
          </Button>
          <Button style={{color:'red', backgroundColor:'rgba(200, 209, 214, 0.5)' }} onClick={handleApproveConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PendingEmpReqPage;
