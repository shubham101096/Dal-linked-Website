import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import EmployerProfileCard from '../components/EmployerProfileCard.js';
import JobListingsPage from './JobListingsPage';
import StudentListingsPage from './StudentListingsPage';

const EmployerPage = () => {
    const [displayJobListings, setDisplayJobListings] = useState(true);

    const handleToggleDisplay = (display) => {
        setDisplayJobListings(display);
    };

    return (
        <Container className="employer-page">
            <Row>
                <Col xs={12} md={4}>
                    <EmployerProfileCard />
                    <div className="button-container">
                        <Button
                            variant="primary"
                            onClick={() => handleToggleDisplay(false)}
                            className="toggle-button"
                        >
                            Show Students
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => handleToggleDisplay(true)}
                            className="toggle-button"
                        >
                            Show Jobs
                        </Button>
                        <Button href="/CreateJobPost" className="create-job-post-button">
                            Create Job Post
                        </Button>
                    </div>
                </Col>
                <Col xs={12} md={8}>
                    {displayJobListings ? (
                        <JobListingsPage employerId={0} />
                    ) : (
                        <StudentListingsPage />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default EmployerPage;
