import { useState } from 'react';
import { ListGroup, Button, Col, Row, Form, Container, Modal } from 'react-bootstrap';

function JobSectorsPage() {
  const initialJobSectors = [
    'Education and Teaching',
    'Administration and Management',
    'Research and Development',
    'Information Technology',
    'Career Services',
    'Student Services',
    'Finance and Accounting',
    'Marketing and Communications',
    'Library and Information Services',
    'Health and Wellness',
    'Engineering and Manufacturing',
    'Consulting and Professional Services',
    'Healthcare and Pharmaceuticals',
    'Hospitality and Tourism',
    'Media and Entertainment',
    'Non-profit and Social Services',
    'Public Relations and Communications',
    'Sales and Business Development',
    'Supply Chain and Logistics',
    'Government and Public Administration',
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSector, setNewSector] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sectorToDelete, setSectorToDelete] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [sectorToEdit, setSectorToEdit] = useState('');
  const [editedSector, setEditedSector] = useState('');
  const [jobSectors, setJobSectors] = useState(initialJobSectors);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleSaveClick = () => {
    if (newSector.trim() !== '') {
      setJobSectors([...jobSectors, newSector.trim()]);
    }
    setShowAddModal(false);
    setNewSector('');
  };

  const handleRemoveClick = (sector) => {
    setSectorToDelete(sector);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const updatedJobSectors = jobSectors.filter((sector) => sector !== sectorToDelete);
    setJobSectors(updatedJobSectors);
    setShowDeleteModal(false);
  };

  const handleEditClick = (sector) => {
    setSectorToEdit(sector);
    setEditedSector(sector);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    if (editedSector.trim() !== '') {
      const updatedJobSectors = jobSectors.map((sector) =>
        sector === sectorToEdit ? editedSector.trim() : sector
      );
      setJobSectors(updatedJobSectors);
    }
    setShowEditModal(false);
    setSectorToEdit('');
    setEditedSector('');
  };

  const filteredJobSectors = jobSectors.filter((sector) =>
    sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1 className="text-center">Job Sectors</h1>
      <Row className="justify-content-center">
        <Col md={6} lg={6}>
          <Form className="mb-3">
            <Row className="align-items-center">
              <Col xs={8} sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Search job sectors"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Col>
              <Col xs={4} sm={4} className="text-end">
                <Button variant="outline-success" onClick={handleAddClick}>
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
          <ListGroup>
            {filteredJobSectors.map((sector, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center">
                <span className="me-auto">{sector}</span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(sector)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemoveClick(sector)}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Job Sector</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter new job sector"
            value={newSector}
            onChange={(e) => setNewSector(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the job sector "{sectorToDelete}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job Sector</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter edited job sector"
            value={editedSector}
            onChange={(e) => setEditedSector(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default JobSectorsPage;
