/* MADE BY MAYANK PANDEY */

/* This React component represents the employer dashboard page, where employers can view their profile details,
   manage job listings, and interact with student applicants. It includes job and applicant listings with pagination,
   the ability to view job details, and a confirmation modal for account deletion. */

import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import StudentListingsPage from './StudentListingsPage';
import JobDetail from '../components/JobDetail';
import JobCard from "../components/JobCard";
import { AuthContext } from "../context/AuthContext";
import { Card } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import '../styles/EmployerPage.css';
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
    const [activePage, setActivePage] = useState(1);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showJobDetail, setShowJobDetail] = useState(false);
    const closeJobDetails = () => {
        console.log("closeJobDetails called")
        setShowJobDetail(false);
    }

    const handleJob = (job) => {
        setSelectedJob(job);
        setShowJobDetail(true);
    };
    const [showModal, setShowModal] = useState(false);

    const handleDeleteAccount = async () => {
        setShowModal(true);
    };

    const confirmDeleteAccount = async () => {
        try {
            const response = await axios.delete(`${backendUrl}/employerReg/email/${user.email}`);
            if (response.status === 200) {
                window.location.href = "/";
            }
        } catch (error) {
            console.error('Error deleting account', error);
        }
        setShowModal(false);
    };

    const cancelDeleteAccount = () => {
        setShowModal(false);
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

    const jobsPerPage = 3;
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const indexOfLastJob = activePage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    useEffect(() => {
        setActivePage(1); // Reset page when the total number of pages changes
    }, [totalPages]);

    return (
        <Container className="p-3 employer-page">
            <Row>
                <Col xs={12} md={4}>
                    {/* <EmployerProfileCard /> */}
                    <Card style={{ width: '100%', backgroundColor: '#F0F0F0' }}>
                        {employer ? (
                            <>
                                <Card.Img
                                    variant="top"
                                    src={employer.companyLogo || "https://s3.amazonaws.com/www-inside-design/uploads/2019/05/woolmarkimagelogo-1024x576.png"}
                                />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '20px', color: '#000000', fontFamily: 'Arial' }}>
                                        {employer.employerName}
                                    </Card.Title>
                                    <Card.Text style={{ fontSize: '16px', color: '#000000', fontFamily: 'Arial' }}>
                                        Company Name: {employer.companyName} <br />
                                        Email: {employer.email} <br />
                                        Contact Number: {employer.contactNumber} <br />
                                        Status: {employer.status} <br />
                                        Website: <a href={employer.websiteURL}>{employer.websiteURL}</a>
                                    </Card.Text>
                                    <Button variant="danger" className="mt-3" onClick={handleDeleteAccount}>Delete Account</Button>

                                    <Modal show={showModal} onHide={cancelDeleteAccount}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Confirm Account Deletion</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Are you sure you want to delete your account? This action cannot be undone.
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={cancelDeleteAccount}>
                                                Cancel
                                            </Button>
                                            <Button variant="danger" onClick={confirmDeleteAccount}>
                                                Delete Account
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
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
                {/* <Col md={1}></Col> */}

                <Col xs={8} md={7}>
                    <Col>
                        <Col className="right-col">
                            {showJobDetail ? (
                                <div>
                                    {/* <Button variant="primary" onClick={handleBack} className="toggle-button">Back to Job Listings</Button> */}
                                    <JobDetail job={selectedJob} isEmployerPage={true} closeJobDetail={closeJobDetails} />
                                </div>
                            ) : (
                                <div>
                                    <div className="row m-2">
                                    </div>
                                    <Col xs={12} md={8}>
                                        {displayJobListings ? (
                                            <div>
                                                {currentJobs.length === 0 ? (<div><h3>No jobs available currently.</h3></div>) : (currentJobs.map((job) => (<div key={job.id} onClick={() => handleJob(job)}><JobCard job={job} /></div>)))}
                                                {/* Pagination */}
                                                {jobs.length > jobsPerPage && (
                                                    <div className="d-flex justify-content-center mt-4">
                                                        <Pagination>
                                                            {Array.from({ length: totalPages }, (_, index) => (
                                                                <Pagination.Item
                                                                    key={index + 1}
                                                                    active={index + 1 === activePage}
                                                                    onClick={() => handlePageChange(index + 1)}
                                                                >
                                                                    {index + 1}
                                                                </Pagination.Item>
                                                            ))}
                                                        </Pagination>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <StudentListingsPage employerId={employer._id} />
                                        )}
                                    </Col>
                                </div>
                            )}
                        </Col>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};
export default EmployerPage;