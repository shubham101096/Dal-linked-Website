

import React, {useState} from 'react';
import '../../styles/UserAuth.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from "react-router-dom";
import {useEmployerSignup} from "../../hooks/useEmployerSignup";


function RegistrationFormEmployer() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyLogo, setCompanyLogo] = useState(null);
    const [websiteURL, setWebsiteURL] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const {signup, error, isLoading, success} = useEmployerSignup();

    const renderModalContent = () => {
        return (
            <Modal show={success} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Thank you for registering! Your request has been sent to the administrators.
                    You will receive an email with your registration status once a decision has been made.
                </Modal.Body>
                <Modal.Footer>
                    &nbsp; &nbsp; &nbsp;
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(employerName, companyName, email, contactNumber,
            password, companyLogo, websiteURL)
    };

    const closeModal = () => {
        setShowModal(false);
        setEmail('');
        setPassword('');
        setEmployerName('');
        setContactNumber('');
        setCompanyName('');
        setCompanyLogo(null);
        setWebsiteURL('');
        navigate('/login-employer');
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        setCompanyLogo(file);
    };

    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;
        const numericInput = input.replace(/\D/g, '');
        setContactNumber(numericInput);
    };


    return (
        <div className="registration">
            <form onSubmit={handleSubmit} className="form">
                <center>
                    <h3>Employer Registration Form</h3>
                </center>
                &nbsp; &nbsp; &nbsp;
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmployerName">
                    <Form.Label>Employer Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Employer Name"
                        value={employerName}
                        onChange={(e) => setEmployerName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContactNumber">
                    <Form.Label>Contact Number:</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Enter Contact Number"
                        value={contactNumber}
                        onChange={handlePhoneNumberChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCompanyInfo">
                    <Form.Label>Company Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLogo">
                    <Form.Label>Company Logo:</Form.Label>
                    <Form.Control type="file" onChange={handleLogoUpload} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formWebsiteUrl">
                    <Form.Label>Website URL:</Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Enter Website URL"
                        value={websiteURL}
                        onChange={(e) => setWebsiteURL(e.target.value)}
                        required
                    />
                </Form.Group>
                <center>
                    <Button type="submit" className="btn btn-dark mx-3 px-5 py-2 mt-2" disabled={isLoading}>
                        Register
                    </Button>
                    {error && <div className="error">{error}</div> }
                    <p></p>
                    <div>
                        <a href="/login-employer">Back to Login</a>
                    </div>
                </center>
            </form>
            {success && renderModalContent()}
        </div>
    );
}

export default RegistrationFormEmployer;
