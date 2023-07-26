import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import EmployerProfileCard from '../components/EmployerProfileCard.js';
import JobListingsPage from './JobListingsPage';
import StudentListingsPage from './StudentListingsPage';
import JobDetail from '../components/JobDetail'
import JobCard from "../components/JobCard";
import { AuthContext } from "../context/AuthContext";
import { Card } from 'react-bootstrap';
import axios from 'axios';

const EmployerPage = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const { user } = useContext(AuthContext);
    const [employer, setEmployer] = useState(null);
    const [displayJobListings, setDisplayJobListings] = useState(true);

    const dropdownStyle = {
        backgroundColor: '#F0F0F0',
        color: "black",
        border: "none",
        borderRadius: "20px",
        padding: "0.7rem"
    };

    const jobs = [{
    //     "id": 0,
    //     "jobTitle": "iOS Developer",
    //     "companyName": "Apple",
    //     "location": "Cupertino",
    //     "jobType": "Full-Time",
    //     "positions": 15,
    //     "jobDescription": "We are seeking a skilled iOS Developer to join our team and work on cutting-edge mobile applications. As an iOS Developer, you will collaborate with cross-functional teams to design and develop innovative iOS applications that deliver exceptional user experiences. Your responsibilities will include coding, debugging, and optimizing applications, as well as collaborating with designers and product managers to ensure project success.",
    //     "requirements": [
    //         "Bachelor's degree in Computer Science or a related field",
    //         "Proven experience in iOS app development using Swift and Xcode",
    //         "Strong knowledge of iOS frameworks, libraries, and design patterns",
    //         "Familiarity with RESTful APIs to connect iOS applications to back-end services",
    //         "Experience with version control systems (e.g., Git)",
    //         "Solid understanding of the full mobile development life cycle",
    //         "Ability to work independently and in a team environment",
    //         "Excellent problem-solving and communication skills"
    //     ],
    //     "responsibilities": [
    //         "Design and build advanced applications for the iOS platform",
    //         "Collaborate with cross-functional teams to define, design, and ship new features",
    //         "Unit-test code for robustness, including edge cases, usability, and general reliability",
    //         "Work on bug fixing and improving application performance",
    //         "Continuously discover, evaluate, and implement new technologies to maximize development efficiency",
    //         "Stay up-to-date with the latest iOS development trends and best practices"
    //     ],
    //     "salary": "$80,000/Year",
    //     "applicationDeadline": "05 June 2023",
    //     "postedDate": "24 May 2023",
    //     "skills": [
    //         "Swift",
    //         "Xcode",
    //         "iOS",
    //         "APIs",
    //         "Git"
    //     ],
    //     "benefits": [
    //         "Competitive salary and benefits package",
    //         "Opportunity for career growth and advancement",
    //         "Flexible working hours and remote work options",
    //         "Collaborative and inclusive work environment",
    //         "Training and professional development programs",
    //         "Employee wellness programs",
    //         "Company-sponsored events and team-building activities",
    //         "Modern and well-equipped office spaces"
    //     ]
    }];
    const [selectedJob, setSelectedJob] = useState(jobs[0]);
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
