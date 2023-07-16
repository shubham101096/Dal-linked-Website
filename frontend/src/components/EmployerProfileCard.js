import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const EmployerProfileCard = () => {
    return (
        <Container>
            <Row>
                <Col xs={12} md={4}>
                    <Card style={{ width: '18rem' }}>
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
                </Col>
            </Row>
        </Container>
    );
};
export default EmployerProfileCard;
