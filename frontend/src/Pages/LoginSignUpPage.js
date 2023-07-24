import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import employerImg from '../images/employer-card.jpg'
import adminImg from '../images/admin-card.jpg'
import studentImg from '../images/student-card.jpg'
import '../styles/UserAuth.css'

const cardStyle = {
    width: '18rem',
    height: '30rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const LoginSignup = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Card style={cardStyle} className='user-card'>
                        <Card.Body>
                            <Card.Title>Student</Card.Title>
                            <Card.Text>
                                <Link to="/registration-student">Register</Link> | <Link to="/login-student">Login</Link>
                            </Card.Text>
                        </Card.Body>
                        <Card.Img variant="bottom" src={studentImg} style={{ height: '100%', objectFit: 'cover' }} />
                    </Card>
                </Col>
                <Col md="auto">
                    <Card style={cardStyle} className='user-card'>
                        <Card.Body>
                            <Card.Title>Employer</Card.Title>
                            <Card.Text>
                                <Link to="/registration-employer">Register</Link> | <Link to="/login-employer">Login</Link>
                            </Card.Text>
                        </Card.Body>
                        <Card.Img variant="bottom" src={employerImg} style={{ height: '100%', objectFit: 'cover' }} />
                    </Card>
                </Col>
                <Col md="auto">
                    <Card style={cardStyle} className='user-card'>
                        <Card.Body>
                            <Card.Title>Admin</Card.Title>
                            <Card.Text>
                                <Link to="/login-admin">Login</Link>
                            </Card.Text>
                        </Card.Body>
                        <Card.Img variant="bottom" src={adminImg} style={{ height: '100%', objectFit: 'cover' }} />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginSignup;
