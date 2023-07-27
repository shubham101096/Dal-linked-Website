/* MADE BY MAYANKKUMAR PATEL */

import '../styles/App.css';
import JobCard from '../components/JobCard.js';
import { Button, Container, Dropdown, Spinner } from 'react-bootstrap';
import JobDetail from '../components/JobDetail.js';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useMediaQuery } from 'react-responsive';
import { useAuthContext } from "../hooks/useAuthContext";

function JobListingsPage() {
  const { user } = useAuthContext();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [userData, setUserData] = useState({});
  // const isMobile = window.innerWidth <= 768;
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  // const jobs = [{
  //   "id": 0,
  //   "jobTitle": "iOS Developer",
  //   "companyName": "Apple",
  //   "location": "Cupertino",
  //   "jobType": "Full-Time",
  //   "positions": 15,
  //   "jobDescription": "We are seeking a skilled iOS Developer to join our team and work on cutting-edge mobile applications. As an iOS Developer, you will collaborate with cross-functional teams to design and develop innovative iOS applications that deliver exceptional user experiences. Your responsibilities will include coding, debugging, and optimizing applications, as well as collaborating with designers and product managers to ensure project success.",
  //   "requirements": [
  //     "Bachelor's degree in Computer Science or a related field",
  //     "Proven experience in iOS app development using Swift and Xcode",
  //     "Strong knowledge of iOS frameworks, libraries, and design patterns",
  //     "Familiarity with RESTful APIs to connect iOS applications to back-end services",
  //     "Experience with version control systems (e.g., Git)",
  //     "Solid understanding of the full mobile development life cycle",
  //     "Ability to work independently and in a team environment",
  //     "Excellent problem-solving and communication skills"
  //   ],
  //   "responsibilities": [
  //     "Design and build advanced applications for the iOS platform",
  //     "Collaborate with cross-functional teams to define, design, and ship new features",
  //     "Unit-test code for robustness, including edge cases, usability, and general reliability",
  //     "Work on bug fixing and improving application performance",
  //     "Continuously discover, evaluate, and implement new technologies to maximize development efficiency",
  //     "Stay up-to-date with the latest iOS development trends and best practices"
  //   ],
  //   "salary": "$80,000/Year",
  //   "applicationDeadline": "05 June 2023",
  //   "postedDate": "24 May 2023",
  //   "skills": [
  //     "Swift",
  //     "Xcode",
  //     "iOS",
  //     "APIs",
  //     "Git"
  //   ],
  //   "benefits": [
  //     "Competitive salary and benefits package",
  //     "Opportunity for career growth and advancement",
  //     "Flexible working hours and remote work options",
  //     "Collaborative and inclusive work environment",
  //     "Training and professional development programs",
  //     "Employee wellness programs",
  //     "Company-sponsored events and team-building activities",
  //     "Modern and well-equipped office spaces"
  //   ]
  // },
  // {
  //   "id": 1,
  //   "jobTitle": "Flutter Developer",
  //   "companyName": "Google",
  //   "location": "LA",
  //   "jobType": "Full-Time",
  //   "positions": 15,
  //   "jobDescription": "We are seeking a skilled iOS Developer to join our team and work on cutting-edge mobile applications. As an iOS Developer, you will collaborate with cross-functional teams to design and develop innovative iOS applications that deliver exceptional user experiences. Your responsibilities will include coding, debugging, and optimizing applications, as well as collaborating with designers and product managers to ensure project success.",
  //   "requirements": [
  //     "Bachelor's degree in Computer Science or a related field",
  //     "Proven experience in iOS app development using Swift and Xcode",
  //     "Strong knowledge of iOS frameworks, libraries, and design patterns",
  //     "Familiarity with RESTful APIs to connect iOS applications to back-end services",
  //     "Experience with version control systems (e.g., Git)",
  //     "Solid understanding of the full mobile development life cycle",
  //     "Ability to work independently and in a team environment",
  //     "Excellent problem-solving and communication skills"
  //   ],
  //   "responsibilities": [
  //     "Design and build advanced applications for the iOS platform",
  //     "Collaborate with cross-functional teams to define, design, and ship new features",
  //     "Unit-test code for robustness, including edge cases, usability, and general reliability",
  //     "Work on bug fixing and improving application performance",
  //     "Continuously discover, evaluate, and implement new technologies to maximize development efficiency",
  //     "Stay up-to-date with the latest iOS development trends and best practices"
  //   ],
  //   "salary": "$80,000/Year",
  //   "applicationDeadline": "05 June 2023",
  //   "postedDate": "24 May 2023",
  //   "skills": [
  //     "Flutter",
  //     "Dart",
  //     "iOS",
  //     "APIs",
  //     "Git"
  //   ],
  //   "benefits": [
  //     "Competitive salary and benefits package",
  //     "Opportunity for career growth and advancement",
  //     "Flexible working hours and remote work options",
  //     "Collaborative and inclusive work environment"
  //   ]
  // },
  // {
  //   "id": 2,
  //   "jobTitle": "iOS Developer",
  //   "companyName": "Broken Dreams",
  //   "location": "Cupertino",
  //   "jobType": "Full-Time",
  //   "positions": 15,
  //   "jobDescription": "We are seeking a skilled iOS Developer to join our team and work on cutting-edge mobile applications. As an iOS Developer, you will collaborate with cross-functional teams to design and develop innovative iOS applications that deliver exceptional user experiences. Your responsibilities will include coding, debugging, and optimizing applications, as well as collaborating with designers and product managers to ensure project success.",
  //   "requirements": [
  //     "Bachelor's degree in Computer Science or a related field",
  //     "Proven experience in iOS app development using Swift and Xcode",
  //     "Strong knowledge of iOS frameworks, libraries, and design patterns",
  //     "Familiarity with RESTful APIs to connect iOS applications to back-end services",
  //     "Experience with version control systems (e.g., Git)",
  //     "Solid understanding of the full mobile development life cycle",
  //     "Ability to work independently and in a team environment",
  //     "Excellent problem-solving and communication skills"
  //   ],
  //   "responsibilities": [
  //     "Design and build advanced applications for the iOS platform",
  //     "Collaborate with cross-functional teams to define, design, and ship new features",
  //     "Unit-test code for robustness, including edge cases, usability, and general reliability",
  //     "Work on bug fixing and improving application performance",
  //     "Continuously discover, evaluate, and implement new technologies to maximize development efficiency",
  //     "Stay up-to-date with the latest iOS development trends and best practices"
  //   ],
  //   "salary": "$80,000/Year",
  //   "applicationDeadline": "05 June 2023",
  //   "postedDate": "24 May 2023",
  //   "skills": [
  //     "Swift",
  //     "Xcode",
  //     "iOS",
  //     "APIs",
  //     "Git"
  //   ],
  //   "benefits": [
  //     "Competitive salary and benefits package",
  //     "Opportunity for career growth and advancement",
  //     "Flexible working hours and remote work options",
  //     "Collaborative and inclusive work environment",
  //     "Training and professional development programs",
  //     "Employee wellness programs",
  //     "Company-sponsored events and team-building activities",
  //     "Modern and well-equipped office spaces"
  //   ]
  // },
  // {
  //   "id": 3,
  //   "jobTitle": "iOS Developer",
  //   "companyName": "Apple",
  //   "location": "Cupertino",
  //   "jobType": "Full-Time",
  //   "positions": 15,
  //   "jobDescription": "We are seeking a skilled iOS Developer to join our team and work on cutting-edge mobile applications. As an iOS Developer, you will collaborate with cross-functional teams to design and develop innovative iOS applications that deliver exceptional user experiences. Your responsibilities will include coding, debugging, and optimizing applications, as well as collaborating with designers and product managers to ensure project success.",
  //   "requirements": [
  //     "Bachelor's degree in Computer Science or a related field",
  //     "Proven experience in iOS app development using Swift and Xcode",
  //     "Strong knowledge of iOS frameworks, libraries, and design patterns",
  //     "Familiarity with RESTful APIs to connect iOS applications to back-end services",
  //     "Experience with version control systems (e.g., Git)",
  //     "Solid understanding of the full mobile development life cycle",
  //     "Ability to work independently and in a team environment",
  //     "Excellent problem-solving and communication skills"
  //   ],
  //   "responsibilities": [
  //     "Design and build advanced applications for the iOS platform",
  //     "Collaborate with cross-functional teams to define, design, and ship new features",
  //     "Unit-test code for robustness, including edge cases, usability, and general reliability",
  //     "Work on bug fixing and improving application performance",
  //     "Continuously discover, evaluate, and implement new technologies to maximize development efficiency",
  //     "Stay up-to-date with the latest iOS development trends and best practices"
  //   ],
  //   "salary": "$80,000/Year",
  //   "applicationDeadline": "05 June 2023",
  //   "postedDate": "24 May 2023",
  //   "skills": [
  //     "Swift",
  //     "Xcode",
  //     "iOS",
  //     "APIs",
  //     "Git"
  //   ],
  //   "benefits": [
  //     "Competitive salary and benefits package",
  //     "Opportunity for career growth and advancement",
  //     "Flexible working hours and remote work options",
  //     "Collaborative and inclusive work environment",
  //     "Training and professional development programs",
  //     "Employee wellness programs",
  //     "Company-sponsored events and team-building activities",
  //     "Modern and well-equipped office spaces"
  //   ]
  // },
  // ];
  const [jobList, setJobList] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [jobSectors, setJobSectors] = useState(["IT", "Computer", "EC", "Civil"]);
  const [filteredJobList, setFilteredJobList] = useState([]);
  const jobTypes = ["Full-Time", "Part-Time", "CO-OP"];
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [appliedJobList, setAppliedJobList] = useState([]);
  const [savedJobList, setSavedJobList] = useState([]);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleJob = (job) => {
    setSelectedJob(job);
    if (isMobile) {
      setShowJobDetail(true);
      // navigate("/jobDetail", { state: { "job": job, "isApplied": isApplied } });
    }
  };

  const dropdownStyle = {
    backgroundColor: '#F0F0F0',
    color: "black",
    border: "none",
    borderRadius: "20px",
    padding: "0.7rem"
  };

  const fetchJobList = () => {
    setIsLoading(true);
    axios
      .get(`${backendUrl}/jobs/`, {
        headers: {
            Authorization: "Bearer " + user.token
        }
        })
      .then((response) => {
        setJobList(response.data.jobs);
      })
      .catch((err) => {
        console.log("Error getting job list", err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const fetchAppliedJobList = () => {
    setIsLoading(true);
    // const studentId = "ab12"
    axios
      .get(`${backendUrl}/appliedJobs/getByStudent`, {
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

  const fetchSavedJobList = () => {
    setIsLoading(true);
    // const studentId = "ab12"
    axios
      .get(`${backendUrl}/saveJobs/getByStudent/`, {
        headers: {
            Authorization: "Bearer " + user.token
        }
        })
      .then((response) => {
        setSavedJobList(response.data.jobs);
      })
      .catch((err) => {
        console.log("Error getting job list", err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const fetchJobSectors = () => {
    setIsLoading(true);
    axios
      .get(`${backendUrl}/jobSectors/`, {
        headers: {
            Authorization: "Bearer " + user.token
        }
        })
      .then((response) => {
        setJobSectors(response.data);
      })
      .catch((err) => {
        console.log("Error getting job sectors", err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    if(user) {
      fetchJobList();
      fetchAppliedJobList();
      fetchJobSectors();
      fetchSavedJobList();
    }
  }, [user]);

  useEffect(() => {
    setSelectedJob(jobList.length > 0 ? jobList[0] : {});
  }, [jobList]);

  useEffect(() => {
    const exists = appliedJobList.findIndex((job) => job.jobId === selectedJob._id);
    if (exists !== -1) {
      setIsApplied(true);
    } else {
      setIsApplied(false);
    }
  }, [selectedJob, appliedJobList]);

  useEffect(() => {
    const exists = savedJobList.findIndex((job) => job.jobId === selectedJob._id);
    if (exists !== -1) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [selectedJob, savedJobList]);

  useEffect(() => {
    if (selectedFilter !== "") {
      if (selectedFilter === "postedDate" || selectedFilter === "endDate") {
        if (selectedFilter === "postedDate") {
          const sortedJobList = jobList.slice().sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
          setFilteredJobList(sortedJobList);
        } else {
          const sortedJobList = jobList.slice().sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
          setFilteredJobList(sortedJobList);
        }
      } else {
        const filteredJobs = jobList.filter(job => (job.jobSector === selectedFilter || job.type === selectedFilter));
        setFilteredJobList(filteredJobs);
      }
    }
  }, [selectedFilter, jobList]);

  const handleFilterByJobSector = (event) => {
    setSelectedFilter(event.target.name);
  }

  const handleFilterByJobType = (event) => {
    setSelectedFilter(event.target.name);
  }

  const handleSortBy = (event) => {
    setSelectedFilter(event.target.name);
  }

  const handleRemoveFilter = () => {
    setSelectedFilter("");
  }

  const closeJobdetailForMobile = () => {
    setShowJobDetail(false);
  }

  const addToAppliedJobs = (job) => {
    setAppliedJobList(currentJobList => [...currentJobList, job]);
  }

  const addToSavedJobs = (job) => {
    setSavedJobList(currentJobList => [...currentJobList, job]);
  }

  if (!user) {
    return <p>Please signin to access this page.</p>;
  }

  return (
    <div>
      <Container>
        {
          (!isMobile ? true : !showJobDetail)
          &&
          <div className="row m-2">
            <div className="col-lg-1 col-sm-1 col-md-2 col-3 pl-1">
              <Dropdown className="text-start">
                <Dropdown.Toggle style={dropdownStyle}>
                  Filter
                </Dropdown.Toggle>
                <Dropdown.Menu style={dropdownStyle}>
                  <Dropdown.Header>Job Sectors</Dropdown.Header>
                  {jobSectors.map((jobSector) => (
                    <Dropdown.Item as="button" key={jobSector._id} className="filter-dropdown" name={jobSector.name} onClick={handleFilterByJobSector}>{jobSector.name}</Dropdown.Item>
                  ))}
                  <Dropdown.Header>Job Type</Dropdown.Header>
                  {jobTypes.map((jobType) => (
                    <Dropdown.Item as="button" key={jobType} className="filter-dropdown" name={jobType} onClick={handleFilterByJobType}>{jobType}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-lg-1 col-sm-1 col-md-2 col-3 drop-downs">
              <Dropdown className="text-start">
                <Dropdown.Toggle style={dropdownStyle}>
                  Sort by
                </Dropdown.Toggle>
                <Dropdown.Menu style={dropdownStyle}>
                  <Dropdown.Item as="button" className="filter-dropdown" name="postedDate" onClick={handleSortBy}>Posted Date</Dropdown.Item>
                  <Dropdown.Item as="button" className="filter-dropdown" name="endDate" onClick={handleSortBy}>Deadline Date</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {
              selectedFilter !== ""
              &&
              <div className="col-lg-3 col-sm-1 col-md-12 text-md-start my-md-2 my-lg-0 col-6 pl-1">
                <Button style={dropdownStyle} onClick={handleRemoveFilter}>
                  {(selectedFilter === "postedDate" || selectedFilter === "endDate") ? "Remove Sort By" : "Remove Filter"}
                </Button>
              </div>
            }
          </div>
        }
        {
          isLoading && <Spinner />
        }
        <div className="row">
          {
            (isMobile && showJobDetail)
              ?
              (
                <div className="constainer vh-100">
                  <JobDetail styleProp={{ position: "static", overflow: "visible" }} job={selectedJob} isApplied={isApplied} isSaved={isSaved} addToAppliedJobs={addToAppliedJobs} addToSavedJobs={addToSavedJobs} closeJobDetail={closeJobdetailForMobile} isEmployerPage={false} isListingsPage={true} />
                </div>
              )
              :
              (<div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 job-list">
                {(jobList.length === 0)
                  ? (<div><h3>No jobs are available currently.</h3></div>)
                  : (filteredJobList.length === 0 && selectedFilter !== "")
                    ? (
                      <div className="vw-100">
                        <div>
                          <h3 className="vh-100 text-center">No jobs are available currently that matches filter.</h3>
                        </div>
                      </div>
                    )
                    : (filteredJobList.length > 0 && selectedFilter !== "")
                      ? filteredJobList.map((job) => (<div key={job._id} onClick={() => handleJob(job)}><JobCard job={job} /></div>))
                      : (jobList.map((job) => (<div key={job._id} onClick={() => handleJob(job)}><JobCard job={job} /></div>)))
                }
              </div>)
          }
          {(!isMobile && jobList.length !== 0 && Object.keys(selectedJob).length !== 0 && (selectedFilter !== "" ? filteredJobList.length !== 0 : true))
            &&
            <div className="col-7 col-xl-6 col-lg-6 col-md-6">
              <JobDetail job={selectedJob} isApplied={isApplied} isSaved={isSaved} addToAppliedJobs={addToAppliedJobs} addToSavedJobs={addToSavedJobs} isEmployerPage={false} isListingsPage={true} />
            </div>
          }
        </div>
      </Container>
    </div>
  );
}

export default JobListingsPage;