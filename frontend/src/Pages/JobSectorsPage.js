import { useState, useEffect } from 'react';
import { ListGroup, Button, Col, Row, Form, Container, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

function JobSectorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSector, setNewSector] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sectorToDelete, setSectorToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sectorToEdit, setSectorToEdit] = useState(null);
  const [editedSectorName, setEditedSectorName] = useState('');
  const [jobSectors, setJobSectors] = useState([]);
  const [error, setError] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const jobSectorsUrl = `${backendUrl}/jobSectors`;

  useEffect(() => {
    fetchJobSectors();
  }, []);

  const fetchJobSectors = async () => {
    try {
      const response = await axios.get(jobSectorsUrl);
      setJobSectors(response.data);
    } catch (error) {
      console.error('Error fetching job sectors:', error);
    }
  };

  const deleteJobSector = async (_id) => {
    try {
      const response = await axios.delete(`${jobSectorsUrl}/${_id}`);
      if (response.status === 200) {
        fetchJobSectors();
        setShowDeleteModal(false);
      } else {
        console.error('Error deleting sector:', response.status);
      }
    } catch (error) {
      console.error('Error deleting sector:', error);
    }
  };

  const updateJobSector = async (_id, name) => {
    try {
      const response = await axios.put(`${jobSectorsUrl}/${_id}`, {
        name,
      });

      if (response.status === 200) {
        fetchJobSectors();
        setShowEditModal(false);
        setSectorToEdit(null);
        setEditedSectorName('');
      } else {
        console.error('Error updating sector:', response.status);
      }
    } catch (error) {
      console.error('Error updating sector:', error);
    }
  };

  const handleNewJobSectorSubmit = async (name) => {
    try {
      const existingSector = jobSectors.find((sector) => sector.name.toLowerCase() === name.toLowerCase());
      if (name.trim() === '') {
        setError('Job Sector name is required.');
        return;
      } else if (existingSector) {
        setError('Job Sector already exists.');
        return;
      }

      const response = await axios.post(jobSectorsUrl, {
        name,
      });
      if (response.status === 200) {
        fetchJobSectors();
        setShowAddModal(false);
        setNewSector('');
        setError('');
      } else {
        console.error('Error creating job sector:', response.status);
      }
    } catch (error) {
      console.error('Error creating job sector:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleSaveClick = () => {
    handleNewJobSectorSubmit(newSector);
  };

  const handleRemoveClick = (sector) => {
    setSectorToDelete(sector);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    deleteJobSector(sectorToDelete._id);
  };

  const handleEditClick = (sector) => {
    setSectorToEdit(sector);
    setEditedSectorName(sector.name);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    updateJobSector(sectorToEdit._id, editedSectorName);
  };

  const filteredJobSectors = () => {
    return jobSectors.filter((sector) => {
      return sector.name.toUpperCase().includes(searchTerm.toUpperCase());
    });
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewSector('');
    setError('');
  };

  const handleAddModalCancel = () => {
    setShowAddModal(false);
    setNewSector('');
    setError('');
  };

  return (
    <Container className="mb-3">
      <h1 className="text-center">Job Sectors</h1>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Form className="mb-3">
            <div className="d-flex justify-content-between align-items-center p-0 mb-3">
              <div className="d-flex flex-grow-1 me-2">
                <Form.Control
                  type="text"
                  placeholder="Search job sectors"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="text-end">
                <Button variant="outline-success" onClick={handleAddClick}>
                  Add
                </Button>
              </div>
            </div>
          </Form>
          <ListGroup>
            {filteredJobSectors().map((sector, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center">
                <span className="me-auto">{sector.name}</span>
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
      <Modal show={showAddModal} onHide={handleAddModalClose} centered>
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
          {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddModalCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the job sector "{sectorToDelete?.name}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job Sector</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter edited job sector"
            value={editedSectorName}
            onChange={(e) => setEditedSectorName(e.target.value)}
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
