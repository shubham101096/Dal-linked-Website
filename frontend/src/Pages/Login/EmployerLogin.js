/* MADE BY ADRIANA SANCHEZ GOMEZ */

import React, {useState} from 'react';
import '../../styles/UserAuth.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useLogin} from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";


function LogInEmployer() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password, 'employer')
        if (error === null) {
            navigate("/EmployerPage");
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="form">
                <center><h3>EMPLOYER LOGIN</h3></center>
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
                <center>
                    <Button type="submit" className="btn btn-dark mx-3 px-5 py-2 mt-2" disabled={isLoading}>Login</Button>
                    {error && <div className="error">{error}</div> }
                    <p></p>
                    <div className="registrationURLs">
                        <div>
                            <a href="/registration-employer">Register as an Employer</a>
                        </div>
                    </div>
                </center>
            </form>
        </div>
    );
}

export default LogInEmployer;
