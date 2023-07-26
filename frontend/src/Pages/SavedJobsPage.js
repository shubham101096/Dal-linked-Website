import "../styles/App.css";
import JobCard from "../components/JobCard.js";
import { Container, Dropdown } from "react-bootstrap";
import JobDetail from "../components/JobDetail.js";
import { useState, useEffect } from "react";
// import FAQ from './components/FAQ';
import axios from "axios";
function SavedJobsPage() {
  const isMobile = window.innerWidth <= 768;
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});

  const handleJob = (job) => {
    setSelectedJob(job);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3003/saveJobs/getByStudent/student123")
      .then((res) => {
        console.log(res.data.jobs);
        setJobs(res.data.jobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const jobgetter = () => {};

  const dropdownStyle = {
    backgroundColor: "#F0F0F0",
    color: "black",
    border: "none",
    borderRadius: "20px",
    padding: "0.7rem",
  };

  return (
    <div>
      <Container>
        <div className="row m-2">
          <div className="col-1 pl-1">
            <Dropdown className="text-start">
              <Dropdown.Toggle style={dropdownStyle}>Filter</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Job sector</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-1 pl-1 drop-downs">
            <Dropdown className="text-start">
              <Dropdown.Toggle style={dropdownStyle}>Sort by</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Job sector</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="row">
          <div className="col-5 col-xl-4 col-lg-4 col-md-5">
            {jobs.length === 0 ? (
              <div>
                <h3>No jobs available currently.</h3>
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job.id} onClick={() => handleJob(job.job)}>
                  <JobCard job={job.job} />
                </div>
              ))
            )}
          </div>
          {!isMobile && jobs.length !== 0 && (
            <div className="col-7 col-xl-6 col-lg-6 col-md-6">
              <JobDetail job={selectedJob} />
            </div>
          )}
        </div>
      </Container>
      {/* <FAQ /> */}
    </div>
  );
}

export default SavedJobsPage;
