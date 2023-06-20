import React from "react";
import "../styles/JobCard.css";
import appleLogo from "../resources/Apple Music.png";

function JobCard(props) {
    const { job } = props;
    return (
        <div className="job-card mx-4 my-4">
            <div className="row">
                <div className="col-2 col-lg-4 col-md-4 m-2">
                    <img src={appleLogo} alt="" />
                </div>
                <div className="col m-2 col-lg-6 col-md-4 job-title">
                    {/* <div className="col"> */}
                    <p>{job.jobTitle}</p>
                    {/* </div> */}
                    {/* <div className="col"> */}
                    <p>{job.companyName}</p>
                    {/* </div> */}
                </div>
            </div>
            <div className="row mx-2">
                <div className="col-4 col-xl-3 col-lg-6 col-md-6 col-sm-12 me-lg-3 m-sm-2">
                    <div className="white-badge">
                        <p className="my-auto">
                            {job.jobType}
                        </p>
                    </div>
                </div>
                <div className="col-4 col-xl-3 col-lg-6 col-md-6 col-sm-12 me-lg-3 m-sm-2">
                    <div className="white-badge">
                        <p className="my-auto">
                            {job.location}
                        </p>
                    </div>
                </div>
                <div className="col-4 col-xl-3 col-lg-6 col-md-6 col-sm-12 me-lg-3 m-sm-2">
                    <div className="white-badge mt-sm-2 mt-md-2 mt-lg-0 mt-xl-0">
                        <p className="my-auto">
                            {job.salary}
                        </p>
                    </div>
                </div>
            </div>
            <div className="row job-desc mx-2 mt-4">
                <p>
                    We are seeking a skilled iOS Developer to join our team
                    and work on cutting-edge mobile applications. As an iOS Developer, you will ...
                </p>
            </div>
        </div>
    )
}

export default JobCard;