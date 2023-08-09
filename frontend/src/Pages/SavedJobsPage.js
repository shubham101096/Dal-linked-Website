/* MADE BY PIYUSH AKOLIYA */

import React from "react";
import '../styles/App.css';
import JobCard from '../components/JobCard.js';
import JobDetail from '../components/JobDetail.js';
import { Button, Container, Dropdown, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useMediaQuery } from 'react-responsive';
import { useAuthContext } from "../hooks/useAuthContext";

function SavedJobsPage() {
    const { user }= useAuthContext();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [savedJobList, setAppliedJobList] = useState([]);
    const [selectedJob, setSelectedJob] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showJobDetail, setShowJobDetail] = useState(false);

    const fetchSavedJobList = () => {
        setIsLoading(true);
        axios
            .get(`${backendUrl}/saveJobs/getByStudent/`, {
                headers: {
                    Authorization: "Bearer " + user.token
                }
                })
            .then((response) => {
                setAppliedJobList(response.data.jobs);
            })
            .catch((err) => {
                console.log("Error getting job list", err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        if(user) {
            fetchSavedJobList();
        } 
    }, [user]);

    useEffect(() => {
        setSelectedJob(savedJobList.length > 0 ? savedJobList[0].job : {});
      }, [savedJobList]);

    const handleJob = (job) => {
        setSelectedJob(job);
        if (isMobile) {
            setShowJobDetail(true);
            // navigate("/jobDetail", { state: { "job": job, "isApplied": isApplied } });
        }
    };

    if (!user) {
        return <p>Please signin to access this page.</p>;
    }

    return (
        <div>
            <Container>
                {
                    isLoading && <Spinner />
                }
                <div className="row vh-100">
                    {
                        (isMobile && showJobDetail)
                            ?
                            (
                                <div className="constainer vh-100">
                                    <JobDetail styleProp={{ position: "static", overflow: "visible" }} job={selectedJob} isEmployerPage={false} isListingsPage={false} isSavedPage={true} />
                                </div>
                            )
                            :
                            (<div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 job-list">
                                {(savedJobList.length === 0)
                                    ? (<div><h3>There are no applied jobs to show.</h3></div>)
                                    : (savedJobList.map((job) => (<div key={job._id} onClick={() => handleJob(job.job)}><JobCard job={job.job} /></div>)))
                                }
                            </div>)
                    }
                    {(!isMobile && savedJobList.length !== 0 && Object.keys(selectedJob).length !== 0)
                        &&
                        <div className="col-7 col-xl-6 col-lg-6 col-md-6">
                            <JobDetail job={selectedJob} isApplied={true} isEmployerPage={false} isListingsPage={false} isSavedPage={true} />
                        </div>
                    }
                </div>
            </Container>
        </div>
    );
}

export default SavedJobsPage;