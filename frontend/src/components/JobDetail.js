import React, { useState } from "react";
import "../styles/JobDetail.css";
import "../styles/JobCard.css";
import appleLogo from "../images/Apple Music.png";
import bookmark from "../images/bookmark.png";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Spinner } from "react-bootstrap";

function JobDetail(props) {
    const { job } = props;
    const [isLoading, setIsLoading] = useState(false);

    const handleApply = () => {
        const currentDate = new Date();
        const appliedJob = {
            "studentId": "ab12",
            "jobId": "64ac6179fc730dbd37562a7a",
            "appliedDate": currentDate,
            "status": "Applied",
            "job": job
        }
        applyJob(appliedJob);
        toast.success("You have successfully applied");
    }

    const applyJob = (job) => {
        setIsLoading(true);
        axios
            .post("http://localhost:3003/appliedJobs/save", job)
            .catch((err) => {
                console.log("Error applying job", err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <div className="my-4">
            <div className="job-detail mt-5">
                <div className="row">
                    <div className="col-2 col-xl-2 col-lg-4 col-md-4 col-sm-4 m-2">
                        <img src={appleLogo} alt="" />
                    </div>
                    <div className="col col-lg-4 col-md-4 my-2 job-title">
                        {/* <div className="col"> */}
                        <p>{job.title}</p>
                        {/* </div> */}
                        {/* <div className="col"> */}
                        <p>{job.companyName}</p>
                        {/* </div> */}
                    </div>
                    {isLoading ?
                        (
                            <div className="col-2 col-xl-2 col-lg-4 col-md-4 col-sm-4 m-3">
                                <Spinner />
                            </div>
                        )
                        :
                        (
                            <div onClick={handleApply} className="col-2 col-xl-2 col-lg-4 col-md-4 col-sm-4 m-3">
                                <div className="blue-badge">
                                    <p className="my-auto">
                                        Apply
                                    </p>
                                </div>
                            </div>
                        )
                    }
                    <div className="col-2 col-xl-2 col-lg-4 col-md-4 col-sm-4 m-3">
                        <div className="save-badge">
                            {/* https://icons8.com/icons/set/bookmark */}
                            <img src={bookmark} className="my-auto" alt="" />
                        </div>
                    </div>
                </div>
                <div className="row mx-md-6 px-md-5 mx-sm-5">
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mx-lg-4 m-3">
                        <div className="detail-badge">
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
                        <div className="detail-badge detail-badge-2">
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
                        <div className="detail-badge detail-badge-3">
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
                        <div className="detail-badge detail-badge-4">
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
                    <p>Benifits:</p>
                </div>
                <div className="row mx-2">
                    {/* <ul className="requirements">
                    {job.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
                    </ul> */}
                    <p className="requirements">
                        {job.benifits}
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default JobDetail;