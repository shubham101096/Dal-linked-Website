
/* MADE BY ADRIANA SANCHEZ GOMEZ */

import React, {useState, useEffect, useRef} from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Card,
  Alert,
} from "react-bootstrap";
import placeholderImage from "../images/user-placeholder.jpg";
import axios from "axios";
import "../styles/StudenProfile.css";
import Footer from "./../components/Footer";

import { useAuthContext } from "../hooks/useAuthContext";
import {useLogout} from "../hooks/useLogout";
import {useNavigate} from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const StudentProfileDetails = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [jobSector, setJobSector] = useState("");
  const [workStyle, setWorkStyle] = useState("");
  const [about, setAbout] = useState("");
  const [jobSectors, setJobSectors] = useState([]);
  const profilePictureInputRef = useRef(null);
  const resumeInputRef = useRef(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleProfilePictureChange = (event) => {
      const file = event.target.files[0];
      //setProfileImage(file);
      if(file) {
        saveProfilePicture(file);
      }
      profilePictureInputRef.current.value = '';
  };

  const handleResumeFileChange = (event) => {
    const file = event.target.files[0];
    // setResume(file);
    if(file){
      saveResume(file);
    }
    resumeInputRef.current.value = '';
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, '');
    setContact(numericInput);
  };

  // on initial component load
  useEffect(() => {
    if (user) {
      // get user profile data
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`${backendUrl}/studentProfile/`, {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          });
          const userData = response.data;

          setProfileImage(userData.profileImage || placeholderImage);
          setResume(userData.resume || '');
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setContact(!userData.contact ? "" : userData.contact);
          setSkills(!userData.skills ? "" : userData.skills);
          setEducation(!userData.education ? "" : userData.education);
          setWorkExperience(
            !userData.workExperience ? "" : userData.workExperience
          );
          setAbout(!userData.about ? "" : userData.about);
          setJobSector(!userData.jobSector ? "" : userData.jobSector);
          setWorkStyle(!userData.workStyle ? "" : userData.workStyle);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      const fetchJobSectors = async () => {
        try {
          const response = await axios.get(
            `${backendUrl}/studentProfile/job-sectors`,
            {
              headers: {
                Authorization: "Bearer " + user.token,
              },
            }
          );
          const sectors = response.data;
          setJobSectors(sectors);
        } catch (error) {
          console.error("Error fetching job sectors:", error);
        }
      };
      fetchUserProfile();
      fetchJobSectors();
    }
  }, [user]);

  if (!user) {
    return <p>Please sign-in to access this page.</p>;
  }

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
          `${backendUrl}/studentProfile/delete-account`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
      );
        logout();
        navigate('/');

    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      contact,
      skills,
      education,
      workExperience,
      jobSector,
      workStyle,
      about,
    };
    const jsonData = { ...data };
    await saveProfile(jsonData);

    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };

  const saveProfile = async (jsonData) => {
    try {
      const response = await axios.put(
        `${backendUrl}/studentProfile/update-details`,
        jsonData,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  const saveProfilePicture = async (img) => {
      const formData = new FormData();
      formData.append("profilePicture", img);
      try {
        const response = await axios.put(
          `${backendUrl}/studentProfile/profile-picture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + user.token,
            },
          }
        );
        console.log(response.data)
        console.log('profile picture uploaded')
        setProfileImage(response.data.profileImageUrl);
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }

  };

  const saveResume = async (resume) => {
      const formData = new FormData();
      formData.append("resume", resume);
      try {
        const response = await axios.put(
          `${backendUrl}/studentProfile/resume`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setResume(response.data.resumeUrl)
        console.log("Success uploading resume")
      } catch (error) {
        console.error("Error updating resume:", error);
      }
  };

  return (
    <>
      {" "}
      <Container fluid className="mt-5 py-3">
        {showSuccessAlert && (
          <Alert
            variant="success"
            onClose={() => setShowSuccessAlert(false)}
            dismissible
          >
            Changes saved successfully!
          </Alert>
        )}
        <div className="my-3">
          <Card
            bg="light"
            className="p-4 rounded profile-card"
            style={{ minHeight: "700px" }}
          >
            <Row>
              <Col md={4}>
                <div className="text-center">
                    <img
                      src={profileImage || placeholderImage}
                      alt="Placeholder"
                      className="img-fluid mt-3 rounded-circle"
                      style={{ maxHeight: "200px", maxWidth: "200px" }}
                    />
                  <Form.Group>
                    <Form.Label>Upload Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      ref={profilePictureInputRef}
                      onChange={handleProfilePictureChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Upload Resume</Form.Label>
                    <Form.Control
                      type="file"
                      ref={resumeInputRef}
                      onChange={handleResumeFileChange}
                    />
                  </Form.Group>
                  <p></p>
                  {resume && <p><a href={resume}>My Resume</a></p>}
                  <Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className="mt-3"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </Button>
                  </Form.Group>
                  <p></p>
                  <p></p>
                  <p></p>
                  <Form.Group>
                    <Button
                      variant="danger"
                      className="mt-3 ml-3"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Delete Account
                    </Button>
                  </Form.Group>
                </div>
              </Col>

              <Col md={4}>
                <Form>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="text"
                      value={contact}
                      onChange={handlePhoneNumberChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>About</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={7}
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={7}
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>

              <Col md={4}>
                <Form>
                  <Form.Group>
                    <Form.Label>Job Sector</Form.Label>
                    <Form.Control
                      as="select"
                      value={jobSector}
                      onChange={(e) => setJobSector(e.target.value)}
                    >
                      <option value="">Select Job Sector</option>
                      {jobSectors.map((sector) => (
                        <option key={sector._id} value={sector.name}>
                          {sector.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Work Style</Form.Label>
                    <Form.Control
                      as="select"
                      value={workStyle}
                      onChange={(e) => setWorkStyle(e.target.value)}
                    >
                      <option value="">Select Work Style</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                      <option value="Onsite">Onsite</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Education</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Work Experience</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={9}
                      value={workExperience}
                      onChange={(e) => setWorkExperience(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Card>
        </div>

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              No
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default StudentProfileDetails;
