import React, {useState} from 'react';
import '../../styles/UserAuth.css'
import { useStudentSignup } from "../../hooks/useStudentSignup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from "react-bootstrap/Modal";
import {useNavigate} from "react-router-dom";


function RegistrationFormStudent() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const {signup, error, isLoading, success} = useStudentSignup();
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleSubmit = async (e) => {

        e.preventDefault();

        await signup(email, password, firstName, lastName)

        // Modal not working yet
        /*
        if (success) {
            setShowModal(true);
            await delay(2000)
            navigate('/login-student');
        }*/
    };

    const closeModal = () => {
        // Close the modal and reset the form
        setShowModal(false);
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');

        navigate('/login-student');
    };

    return (
        <div className="registration">
            <form onSubmit={handleSubmit} className="form">
                <center><h3>Student Registration Form</h3></center>
                &nbsp; &nbsp; &nbsp;
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Dalhousie email (@dal.ca) "
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
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </Form.Group>
                <center>
                    <Button type="submit" className="btn btn-dark mx-3 px-5 py-2 mt-2" disabled={isLoading}>Register</Button>
                    {error && <div className="error">{error}</div> }
                    <p></p>
                    <div>
                        <a href="/login-student">Back to student login</a>
                    </div>
                </center>
            </form>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Successful registration! Redirecting to login page . . .
                </Modal.Body>
                <Modal.Footer>
                    &nbsp; &nbsp; &nbsp;
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default RegistrationFormStudent;
