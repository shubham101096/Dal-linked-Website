/* MADE BY SHUBHAM MISHRA */

import { useState, useEffect } from "react";
import {ListGroup, Button, Col, Row, Form, Container, Modal, Alert} from "react-bootstrap";
import axios from "axios";
import "../styles/JobSectors.css";
import { useAuthContext } from "../hooks/useAuthContext";
import Footer from "./../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function JobSectorsPage() {
  // State variables for managing various UI states
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSector, setNewSector] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sectorToDelete, setSectorToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sectorToEdit, setSectorToEdit] = useState(null);
  const [editedSectorName, setEditedSectorName] = useState("");
  const [jobSectors, setJobSectors] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  // Backend URL and job sectors URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const jobSectorsUrl = `${backendUrl}/jobSectors`;

  // Function to fetch job sectors from the server
  const fetchJobSectors = async (userToken) => {
    try {
      const response = await axios.get(jobSectorsUrl, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });
      setJobSectors(response.data);
    } catch (error) {
      console.error("Error fetching job sectors:", error);
    }
  };

  // Function to delete a job sector
  const deleteJobSector = async (_id) => {
    try {
      const response = await axios.delete(`${jobSectorsUrl}/${_id}`);
      if (response.status === 200) {
        fetchJobSectors(user.token);
        setShowDeleteModal(false);
        toast.success("Job sector deleted successfully.");
      } else {
        toast.success("Error in deleting job sector.");
        console.error("Error deleting sector:", response.status);
      }
    } catch (error) {
      toast.success("Error in deleting job sector.");
      console.error("Error deleting sector:", error);
    }
  };

  // Function to update a job sector
  const updateJobSector = async (_id, name) => {
    try {
      const response = await axios.put(`${jobSectorsUrl}/${_id}`, {
        name,
      });

      if (response.status === 200) {
        fetchJobSectors(user.token);
        setShowEditModal(false);
        setSectorToEdit(null);
        setEditedSectorName("");
        toast.success("Job sector updated successfully.");
      } else {
        toast.success("Error in updating job sector.");
        console.error("Error updating sector:", response.status);
      }
    } catch (error) {
      toast.success("Error in updating job sector.");
      console.error("Error updating sector:", error);
    }
  };

  // Function to handle new job sector submission
  const handleNewJobSectorSubmit = async (name) => {
    try {
      const existingSector = jobSectors.find(
        (sector) => sector.name.toLowerCase() === name.toLowerCase()
      );
      if (name.trim() === "") {
        setError("Job Sector name is required.");
        return;
      } else if (existingSector) {
        setError("Job Sector already exists.");
        return;
      }

      const response = await axios.post(jobSectorsUrl, {
        name,
      });
      if (response.status === 200) {
        fetchJobSectors(user.token);
        setShowAddModal(false);
        setNewSector("");
        setError("");
        toast.success("Job sector created successfully.");
      } else {
        toast.success("Error in creating job sector.");
        console.error("Error creating job sector:", response.status);
      }
    } catch (error) {
      toast.success("Error in creating job sector.");
      console.error("Error creating job sector:", error);
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
    setNewSector("");
    setError("");
  };

  const handleAddModalCancel = () => {
    setShowAddModal(false);
    setNewSector("");
    setError("");
  };

  // Effect to fetch job sectors when the user context changes
  useEffect(() => {
    if (user) {
      fetchJobSectors(user.token);
    }
  }, [user]);

  // Return UI components based on user authentication
  if (!user) {
    return <p>Please signin to access this page.</p>;
  }

  return (
    <>
      <Container className="mb-3 mt-3">
        <h3 className="text-center">Job Sectors</h3>
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
                  <Button
                    style={{
                      color: "green",
                      backgroundColor: "rgba(200, 209, 214, 0.5)",
                      borderRadius: "25px",
                    }}
                    onClick={handleAddClick}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </Form>
            <ListGroup>
              {filteredJobSectors().map((sector, index) => (
                <ListGroup.Item key={index} className="d-flex align-items-left">
                  <span className="me-auto text-left">{sector.name}</span>
                  <Button
                    style={{
                      color: "blue",
                      backgroundColor: "rgba(200, 209, 214, 0.5)",
                      borderRadius: "25px",
                    }}
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(sector)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{
                      color: "red",
                      backgroundColor: "rgba(200, 209, 214, 0.5)",
                      borderRadius: "25px",
                    }}
                    size="sm"
                    onClick={() => handleRemoveClick(sector)}
                  >
                    Delete
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
            {error && (
              <Alert variant="danger" className="mt-2">
                {error}
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{
                color: "grey",
                backgroundColor: "rgba(200, 209, 214, 0.5)",
                borderRadius: "25px",
              }}
              onClick={handleAddModalCancel}
            >
              Cancel
            </Button>
            <Button
              style={{
                color: "green",
                backgroundColor: "rgba(200, 209, 214, 0.5)",
                borderRadius: "25px",
              }}
              onClick={handleSaveClick}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        {
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete the job sector "
              {sectorToDelete?.name}"?
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{
                  color: "grey",
                  backgroundColor: "rgba(200, 209, 214, 0.5)",
                  borderRadius: "25px",
                }}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                style={{
                  color: "red",
                  backgroundColor: "rgba(200, 209, 214, 0.5)",
                  borderRadius: "25px",
                }}
                onClick={handleDeleteConfirm}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        }
        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          centered
        >
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
            <Button
              style={{
                color: "grey",
                backgroundColor: "rgba(200, 209, 214, 0.5)",
                borderRadius: "25px",
              }}
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button
              style={{
                color: "blue",
                backgroundColor: "rgba(200, 209, 214, 0.5)",
                borderRadius: "25px",
              }}
              onClick={handleEditSave}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      {/* Toast Container for notifications */}
      <ToastContainer />
      <Footer />
    </>
  );
}

export default JobSectorsPage;
