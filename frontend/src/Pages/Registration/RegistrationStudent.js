/* MADE BY ADRIANA SANCHEZ GOMEZ */

import React, {useEffect, useState} from 'react';
import '../../styles/UserAuth.css'
import { useStudentSignup } from "../../hooks/useStudentSignup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import {Alert} from "react-bootstrap";


function RegistrationFormStudent() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const {signup, error, isLoading, success} = useStudentSignup();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password, firstName, lastName)
    };

    const handleSuccessfulRegistration = async () =>{
        setTimeout(() => {
            setEmail('')
            setPassword('')
            setFirstName('')
            setLastName('')
            setShowSuccessAlert(false);
            navigate('/login-student'); // redirects student to the login page
        }, 3000);
    }

    useEffect(() => {
        if (success) {
            handleSuccessfulRegistration();
        }
    }, [success]);


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
                    {success && (
                        <Alert variant="success" className="successAlert" onClose={() => setShowSuccessAlert(false)} dismissible>
                            Successfully registered!
                        </Alert>
                    )}
                    <p></p>
                    <div>
                        <a href="/login-student">Back to student login</a>
                    </div>
                </center>
            </form>
        </div>
    );
}

export default RegistrationFormStudent;
