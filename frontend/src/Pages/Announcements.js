import { useState, useEffect } from 'react';
import { Container, Card, Button, ListGroup, Pagination, Modal, Row, Col } from 'react-bootstrap';
import '../styles/Announcements.css';

function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('http://localhost:3003/announcements'); // Replace with your backend API endpoint
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleDelete = (id) => {
    const announcement = announcements.find((announcement) => announcement.id === id);
    setAnnouncementToDelete(announcement);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = () => {
    const updatedAnnouncements = announcements.filter((announcement) => announcement.id !== announcementToDelete.id);
    setAnnouncements(updatedAnnouncements);
    setShowDeleteModal(false);
  };

  const announcementsPerPage = 5;
  const totalPages = Math.ceil(announcements.length / announcementsPerPage);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastAnnouncement = activePage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  return (
    <Container>
      <h1 className="text-center mt-4 mb-5">Announcements</h1>
      <Row className="justify-content-center">
        <Col sm={12} md={10} lg={8}>
          <ListGroup className="text-left md-8">
            {currentAnnouncements.map((announcement) => (
              <ListGroup.Item key={announcement.id} className="p-0 mb-3 border-0">
                <Card>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5>{announcement.title}</h5>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(announcement.id)}>
                      Delete
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{announcement.body}</Card.Text>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      {announcements.length > announcementsPerPage && (
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{announcementToDelete?.title}" announcement?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmation}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AnnouncementPage;
