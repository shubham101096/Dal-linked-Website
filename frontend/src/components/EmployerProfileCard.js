import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const EmployerProfileCard = () => {
    return (
        <Card style={{ width: '100%' }}>
            <Card.Img variant="top" src="https://randomuser.me/api/portraits/men/81.jpg" alt="Profile Picture" />
            <Card.Body>
                <Card.Title>John Doe</Card.Title>
                <Card.Text>
                    Age: 30 <br />
                    Location: New York <br />
                    Occupation: Software Engineer
                </Card.Text>
                <Button variant="danger">Delete Account</Button>
            </Card.Body>
        </Card>
    );
};

export default EmployerProfileCard;
