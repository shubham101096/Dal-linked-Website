import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal, Card } from 'react-bootstrap';
import placeholderImage from '../images/user-placeholder.jpg'; // Import the placeholder image
import '../styles/StudenProfile.css';

const StudentProfileDetails = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [skills, setSkills] = useState('');
    const [education, setEducation] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [jobSector, setJobSector] = useState('');
    const [workStyle, setWorkStyle] = useState('');
    const [about, setAbout] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
       // setProfilePicture(URL.createObjectURL(file));
        // maybe a form?
    };


    const handleResumeFileChange = (event) => {
        const file = event.target.files[0];
        setResumeFile(file);
    };

    const fetchProfilePicture = () => {
        // fetch the profile picture from the backend if available
        // if no image, then set profilePicture state to placeholder img
        // w setProfilePicture(placeholderImage);
    };

    //set profile picture when the component renders
    useEffect(() => {
        fetchProfilePicture();
    }, []);

    const handleDeleteAccount = () => {
        // account deletion request
        setShowDeleteModal(false); // Close the modal after deleting the account
    };

    const handleSaveChanges = (event) => {
        event.preventDefault();
        const data = {
            firstName,
            lastName,
            contactNumber,
            skills,
            education,
            workExperience,
            jobSector,
            workStyle,
            about,
        };
        console.log(data); // You can use the data to send to the backend
    };

    return (
        <Container fluid className="mt-5 py-3">
            <div className="my-3">
                <Card bg="light" className="p-4 rounded profile-card" style={{ minHeight: '700px' }}>
                    <Row>
                        <Col md={4}>
                            <div className="text-center">
                                {profilePicture ? (
                                    <img
                                        src={profilePicture}
                                        alt="Profile"
                                        className="img-fluid mt-3 rounded-circle"
                                        style={{ maxHeight: '200px', maxWidth: '200px' }}
                                    />
                                ) : (
                                    <img
                                        src={placeholderImage}
                                        alt="Placeholder"
                                        className="img-fluid mt-3 rounded-circle"
                                        style={{ maxHeight: '200px', maxWidth: '200px' }}
                                    />
                                )}
                                <Form.Group>
                                    <Form.Label>Upload Profile Picture</Form.Label>
                                    <Form.Control type="file" onChange={handleProfilePictureChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Upload Resume</Form.Label>
                                    <Form.Control type="file" onChange={handleResumeFileChange} />
                                </Form.Group>
                                <p></p>
                                <Form.Group>
                                    <Button variant="primary" type="submit" className="mt-3" onClick={handleSaveChanges}>
                                        Save Changes
                                    </Button>
                                </Form.Group>
                                <p></p><p></p><p></p>
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
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={contactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
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
                                        <option value="sector1">Sector 1</option>
                                        <option value="sector2">Sector 2</option>

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

            {/* MODAL TO SHOW WHEN ACCOUNT IS ABOUT TO GET DELETED */}

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAccount}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default StudentProfileDetails;
