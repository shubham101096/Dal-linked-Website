/* MADE BY MAYANKKKUMAR PATEL */
import React, { useEffect, useState } from "react";
import "../styles/JobDetail.css";
import "../styles/JobCard.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkBordered } from '@fortawesome/free-regular-svg-icons';
import { useAuthContext } from "../hooks/useAuthContext";

function JobDetail(props) {
    const { user } = useAuthContext();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    // const location = useLocation();
    const { job, isApplied, isSaved, addToAppliedJobs, addToSavedJobs, isEmployerPage, isListingsPage } = props;
    const styleProp = isMobile ? props.styleProp : {};
    const closeJobDetail = (isMobile || isEmployerPage) && props.closeJobDetail;
    const [isLoading, setIsLoading] = useState(false);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const handleApply = () => {
        const currentDate = new Date();
        const appliedJob = {
            "jobId": job._id,
            "appliedDate": currentDate,
            "status": "Applied",
            "job": job
        }
        applyJob(appliedJob);
    }

    const handleSave = () => {
        const currentDate = new Date();
        const savedJob = {
            "jobId": job._id,
            "savedDate": currentDate,
            "status": "Saved",
            "job": job
        }
        saveJob(savedJob);
    }

    const applyJob = (job) => {
        setIsLoading(true);
        if (user) {
            axios
                .post(`${backendUrl}/appliedJobs/save`, job, {
                    headers: {
                        Authorization: "Bearer " + user.token
                    }
                })
                .then(() => {
                    addToAppliedJobs(job);
                    toast.success("You have successfully applied");
                })
                .catch((err) => {
                    console.log("Error applying job", err);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }

    const saveJob = (job) => {
        setIsLoading(true);
        if (user) {
            axios
                .post(`${backendUrl}/saveJobs/save`, job, {
                    headers: {
                        Authorization: "Bearer " + user.token
                    }
                })
                .then(() => {
                    addToSavedJobs(job);
                    toast.success("Job saved");
                })
                .catch((err) => {
                    console.log("Error saving job", err);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }

    const handleCloseJobDetail = () => {
        closeJobDetail();
    }

    if (!user) {
        return <p>Please signin to access this page.</p>;
    }

    return (
        <div className="my-4">
            <div style={styleProp} className="job-detail mt-5">
                <div className="row">
                    <div className="col-2 col-xl-2 col-lg-4 col-md-4 col-sm-4 m-3">
                        <img src={job.imageUrl} alt="company-logo" />
                    </div>
                    <div className="col-6 col-lg-4 col-md-4 mx-auto my-2 job-title">
                        {/* <div className="col"> */}
                        <p>{job.title}</p>
                        {/* </div> */}
                        {/* <div className="col"> */}
                        <p>{job.companyName}</p>
                        {/* </div> */}
                    </div>
                    {isMobile &&
                        <div className="save-badge" onClick={handleCloseJobDetail}>
                            <FontAwesomeIcon icon={faTimes} style={{ margin: "auto", fontSize: "20px" }} />
                        </div>
                    }
                    {
                        (isListingsPage) &&
                        (
                            isLoading ?
                                (
                                    <div className="col-2 col-xl-2 col-lg-4 col-md-4 col-sm-4 m-3">
                                        <Spinner />
                                    </div>
                                )
                                :
                                (
                                    isApplied ?
                                        <div className="col-6 col-xl-2 col-lg-4 col-md-4 col-sm-4 m-3">
                                            <div className="applied-badge">
                                                <p className="my-auto">
                                                    Applied
                                                </p>
                                            </div>
                                        </div>
                                        :
                                        <div onClick={handleApply} className="col-6 col-xl-2 col-lg-4 col-md-4 col-sm-4 m-3">
                                            <div className="blue-badge">
                                                <p className="my-auto">
                                                    Apply
                                                </p>
                                            </div>
                                        </div>
                                )
                        )
                    }
                    {
                        (isListingsPage) &&
                        (
                            isLoading ?
                                (
                                    <div className="col-2 col-xl-2 col-lg-4 col-md-4 col-sm-4 m-3">
                                        <Spinner />
                                    </div>
                                )
                                :
                                (
                                    isSaved
                                        ?
                                        <div onClick={handleSave} className="col-2 col-xl-2 col-lg-4 col-md-4 col-sm-4 m-3">
                                            <div className="save-badge">
                                                {/* https://icons8.com/icons/set/bookmark */}
                                                <FontAwesomeIcon icon={faBookmark} style={{ margin: "auto", fontSize: "20px" }} />
                                            </div>
                                        </div>
                                        :
                                        <div onClick={handleSave} className="col-2 col-xl-2 col-lg-4 col-md-4 col-sm-4 m-3">
                                            <div className="save-badge">
                                                {/* https://icons8.com/icons/set/bookmark */}
                                                <FontAwesomeIcon icon={faBookmarkBordered} style={{ margin: "auto", fontSize: "20px" }} />
                                            </div>
                                        </div>
                                )
                        )
                    }
                    {
                        (isEmployerPage && !isMobile) &&
                        <div className="save-badge" onClick={handleCloseJobDetail}>
                            <FontAwesomeIcon icon={faTimes} style={{ margin: "auto", fontSize: "20px" }} />
                        </div>
                    }
                </div>
                <div className="row mx-md-6 px-md-5 mx-sm-5">
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mx-lg-4 m-3">
                        <div className="detail-badge mx-auto">
                            <div className="col">
                                <p className="my-auto">
                                    Job-type
                                </p>
                                <p className="my-auto">
                                    {job.type}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mx-lg-4 m-3">
                        <div className="detail-badge detail-badge-2 mx-auto">
                            <div className="col">
                                <p className="my-auto">
                                    Job Location
                                </p>
                                <p className="my-auto">
                                    {job.location}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mx-lg-4 m-3">
                        <div className="detail-badge detail-badge-3 mx-auto">
                            <div className="col">
                                <p className="my-auto">
                                    Salary
                                </p>
                                <p className="my-auto">
                                    {`$${job.salary}`}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mx-lg-4 m-3">
                        <div className="detail-badge detail-badge-4 mx-auto">
                            <div className="col">
                                <p className="my-auto">
                                    No. of Positions
                                </p>
                                <p className="my-auto">
                                    {job.noOfPositions}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mx-2 p-0">
                    <div className="col-4"><p>Company name:</p></div>
                    <div className="col-3"><p>{job.companyName}</p></div>
                </div>
                <div className="row mx-2">
                    <p>Job Description:</p>
                </div>
                <div className="row mx-2">
                    <p className="description">
                        {job.description}
                    </p>
                </div>
                <div className="row mx-2">
                    <p>Requirements:</p>
                </div>
                <div className="row mx-2">
                    {/* <ul className="requirements">
                        {job.requirements.map((req) => <li key={req}>{req}</li>)}
                        <li>Bachelor's degree in Computer Science or a related field</li>
                        <li>Proven experience in iOS app development using Swift and Xcode</li>
                        <li>Strong knowledge of iOS frameworks, libraries, and design patterns</li>
                        <li>Familiarity with RESTful APIs to connect iOS applications to back-end services</li>
                        <li>Experience with version control systems (e.g., Git)</li>
                        <li>Solid understanding of the full mobile development life cycle</li>
                        <li>Excellent problem-solving and communication skills</li>
                    </ul> */}
                    <p className="requirements">
                        {job.requirement}
                    </p>
                </div>
                <div className="row mx-2">
                    <p>Skills:</p>
                </div>
                <div className="row mx-2 mb-4">
                    {job.skills.map((skill) => (
                        <div className="col my-2" key={skill._id}>
                            <div className="white-badge">
                                <p className="my-auto">{skill.skillName}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row mx-2 p-0">
                    <div className="col-4"><p>Posted date:</p></div>
                    <div className="col-3"><p>{job.postedDate.substring(0, 10)}</p></div>
                </div>
                <div className="row mx-2 p-0">
                    <div className="col-4"><p>Deadline:</p></div>
                    <div className="col-3"><p>{job.endDate.substring(0, 10)}</p></div>
                </div>
                <div className="row mx-2">
                    <p>Benefits:</p>
                </div>
                <div className="row mx-2">
                    {/* <ul className="requirements">
                    {job.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
                    </ul> */}
                    <p className="requirements">
                        {job.benefits}
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default JobDetail;