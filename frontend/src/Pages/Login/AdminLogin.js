/* MADE BY ADRIANA SANCHEZ GOMEZ */

import React, {useState} from 'react';
import '../../styles/UserAuth.css'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useLogin} from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

function LogInAdmin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password, 'admin')
        if (error === null) {
            navigate("/announcements");
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="form">
                <center><h3>ADMIN LOGIN</h3></center>
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
                </center>
            </form>
        </div>
    );
}

export default LogInAdmin;
