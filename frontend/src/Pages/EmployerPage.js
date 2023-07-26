import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import StudentListingsPage from './StudentListingsPage';
import JobDetail from '../components/JobDetail';
import JobCard from "../components/JobCard";
import { AuthContext } from "../context/AuthContext";
import { Card } from 'react-bootstrap';
import axios from 'axios';

const EmployerPage = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { user } = useContext(AuthContext);
    const [employer, setEmployer] = useState(null);
    const [displayJobListings, setDisplayJobListings] = useState(true);
    const [jobs, setJobs] = useState([]);
    const dropdownStyle = {
        backgroundColor: '#F0F0F0',
        color: "black",
        border: "none",
        borderRadius: "20px",
        padding: "0.7rem"
    };

    const [selectedJob, setSelectedJob] = useState(null);
    const [showJobDetail, setShowJobDetail] = useState(false);

    const handleJob = (job) => {
        setSelectedJob(job);
        setShowJobDetail(true);
    };
    const handleToggleDisplay = (showJobListings) => {
        setDisplayJobListings(showJobListings);
        if (showJobDetail) {
            setShowJobDetail(false);
        }
    };
    const handleBack = () => {
        setShowJobDetail(false);
    }
    useEffect(() => {
        const getEmployerDetails = async () => {
            try {
                const response = await axios.get(`${backendUrl}/employerReg/email/${user.email}`);
                setEmployer(response.data.employer);

                const jobsResponse = await axios.get(`${backendUrl}/jobs/getByEmployerId/${response.data.employer._id}`);
                setJobs(jobsResponse.data.job);
                setSelectedJob(jobsResponse.data.job[0]);
            } catch (error) {
                console.error('Error getting employer details', error);
            }
        };
        getEmployerDetails();
    }, [user]);
    console.log("user:", user);
    console.log("emp:", employer)

    return (
        <Container className="employer-page">
            <Row>
                <Col xs={12} md={4}>
                    {/* <EmployerProfileCard /> */}

                    <Card style={{ width: '100%', backgroundColor: '#F0F0F0' }}>
                        {employer ? (
                            <>
                                <Card.Img
                                    variant="top"
                                    src={"https://s3.amazonaws.com/www-inside-design/uploads/2019/05/woolmarkimagelogo-1024x576.png" || "default-photo-url"}
                                />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '20px', color: '#333' }}>
                                        {employer.employerName}
                                    </Card.Title>
                                    <Card.Text style={{ fontSize: '16px', color: '#555' }}>
                                        Company Name: {employer.companyName} <br />
                                        Email: {employer.email} <br />
                                        Contact Number: {employer.contactNumber} <br />
                                        Status: {employer.status} <br />
                                        Website: <a href={employer.websiteURL}>{employer.websiteURL}</a>
                                    </Card.Text>
                                    <Button variant="danger" className="mt-3">Delete Account</Button>
                                </Card.Body>
                            </>
                        ) : (
                            'Loading...'
                        )}
                    </Card>



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
                    </div>
                </Col>
                <Col>
                    {showJobDetail ? (
                        <div>
                            <Button variant="primary" onClick={handleBack} className="toggle-button">Back to Job Listings</Button>
                            <JobDetail job={selectedJob} />
                        </div>
                    ) : (
                        <div>
                            <div className="row m-2">
                                <div className="col-1 pl-1">
                                    <Dropdown className="text-start">
                                        <Dropdown.Toggle style={dropdownStyle}>
                                            Filter
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Job sector</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="col-1 pl-1 drop-downs">
                                    <Dropdown className="text-start">
                                        <Dropdown.Toggle style={dropdownStyle}>
                                            Sort by
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Job sector</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <Col xs={12} md={8}>
                                {displayJobListings ? (
                                    <div>
                                        {jobs.length === 0 ? (<div><h3>No jobs available currently.</h3></div>) : (jobs.map((job) => (<div key={job.id} onClick={() => handleJob(job)}><JobCard job={job} /></div>)))}
                                    </div>
                                ) : (
                                    <StudentListingsPage />
                                )}
                            </Col>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );

};

export default EmployerPage;
