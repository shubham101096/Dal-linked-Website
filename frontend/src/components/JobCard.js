/* MADE BY MAYANKKKUMAR PATEL */

import React from "react";
import "../styles/JobCard.css";
import appleLogo from "../images/Apple Music.png";

// Job card
function JobCard(props) {
    const { job } = props;
    return (
        <div className="job-card mx-4 my-4">
            <div className="row">
                <div className="col-2 col-sm-2 col-lg-4 col-md-4 m-2">
                    <img src={job.imageUrl} alt="company-logo" />
                </div>
                <div className="col col-sm-6 m-2 col-lg-6 col-md-4 mx-sm-auto mx-md-auto pl-sm-5 p-md-0">
                    <div className="job-title">
                        <p>{job.title}</p>
                    </div>
                    <div className="job-title">
                        <p>{job.companyName}</p>
                    </div>
                </div>
            </div>
            <div className="row mx-2 mx-lg-0">
                <div className="col-sm-4 col-xs-12 col-xl-3 col-lg-6 col-md-12 col-sm-12 me-lg-4">
                    <div className="mx-auto mx-md-auto white-badge">
                        <p className="my-auto my-md-auto">
                            {job.type}
                        </p>
                    </div>
                </div>
                <div className="col-sm-4 col-xs-12 col-xl-3 col-lg-6 col-md-12 col-sm-12 me-lg-4 ms-lg-1">
                    <div className="mx-auto mx-md-auto my-lg-0 my-2 white-badge">
                        <p className="my-auto m-sm-auto">
                            {job.location}
                        </p>
                    </div>
                </div>
                <div className="col-sm-4 col-xl-3 col-lg-6 col-md-12 col-sm-12 me-lg-4 ms-lg-1">
                    <div className="mx-auto mx-md-auto white-badge mt-md-2 mt-sm-2 mt-lg-0 mt-xl-0">
                        <p className="my-auto">
                            {`$${job.salary}`}
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