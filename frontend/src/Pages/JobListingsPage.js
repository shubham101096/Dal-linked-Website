import '../styles/App.css';
import JobCard from '../components/JobCard.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import JobDetail from '../components/JobDetail.js';
import { useState } from 'react';
// import FAQ from './components/FAQ';

function JobListingsPage() {
  const isMobile = window.innerWidth <= 768;
  const jobs = [{
    "id": 0,
    "jobTitle": "iOS Developer",
    "companyName": "Apple",
    "location": "Cupertino",
    "jobType": "Full-Time",
    "positions": 15,
    "jobDescription": "We are seeking a skilled iOS Developer to join our team and work on cutting-edge mobile applications. As an iOS Developer, you will collaborate with cross-functional teams to design and develop innovative iOS applications that deliver exceptional user experiences. Your responsibilities will include coding, debugging, and optimizing applications, as well as collaborating with designers and product managers to ensure project success.",
    "requirements": [
      "Bachelor's degree in Computer Science or a related field",
      "Proven experience in iOS app development using Swift and Xcode",
      "Strong knowledge of iOS frameworks, libraries, and design patterns",
      "Familiarity with RESTful APIs to connect iOS applications to back-end services",
      "Experience with version control systems (e.g., Git)",
      "Solid understanding of the full mobile development life cycle",
      "Ability to work independently and in a team environment",
      "Excellent problem-solving and communication skills"
    ],
    "responsibilities": [
      "Design and build advanced applications for the iOS platform",
      "Collaborate with cross-functional teams to define, design, and ship new features",
      "Unit-test code for robustness, including edge cases, usability, and general reliability",
      "Work on bug fixing and improving application performance",
      "Continuously discover, evaluate, and implement new technologies to maximize development efficiency",
      "Stay up-to-date with the latest iOS development trends and best practices"
    ],
    "salary": "$80,000/Year",
    "applicationDeadline": "05 June 2023",
    "postedDate": "24 May 2023",
    "skills": [
      "Swift",
      "Xcode",
      "iOS",
      "APIs",
      "Git"
    ],
    "benefits": [
      "Competitive salary and benefits package",
      "Opportunity for career growth and advancement",
      "Flexible working hours and remote work options",
      "Collaborative and inclusive work environment",
      "Training and professional development programs",
      "Employee wellness programs",
      "Company-sponsored events and team-building activities",
      "Modern and well-equipped office spaces"
    ]
  },
  {
    "id": 1,
    "jobTitle": "Flutter Developer",
    "companyName": "Google",
    "location": "LA",
    "jobType": "Full-Time",
    "positions": 15,
    "jobDescription": "We are seeking a skilled iOS Developer to join our team and work on cutting-edge mobile applications. As an iOS Developer, you will collaborate with cross-functional teams to design and develop innovative iOS applications that deliver exceptional user experiences. Your responsibilities will include coding, debugging, and optimizing applications, as well as collaborating with designers and product managers to ensure project success.",
    "requirements": [
      "Bachelor's degree in Computer Science or a related field",
      "Proven experience in iOS app development using Swift and Xcode",
      "Strong knowledge of iOS frameworks, libraries, and design patterns",
      "Familiarity with RESTful APIs to connect iOS applications to back-end services",
      "Experience with version control systems (e.g., Git)",
      "Solid understanding of the full mobile development life cycle",
      "Ability to work independently and in a team environment",
      "Excellent problem-solving and communication skills"
    ],
    "responsibilities": [
      "Design and build advanced applications for the iOS platform",
      "Collaborate with cross-functional teams to define, design, and ship new features",
      "Unit-test code for robustness, including edge cases, usability, and general reliability",
      "Work on bug fixing and improving application performance",
      "Continuously discover, evaluate, and implement new technologies to maximize development efficiency",
      "Stay up-to-date with the latest iOS development trends and best practices"
    ],
    "salary": "$80,000/Year",
    "applicationDeadline": "05 June 2023",
    "postedDate": "24 May 2023",
    "skills": [
      "Flutter",
      "Dart",
      "iOS",
      "APIs",
      "Git"
    ],
    "benefits": [
      "Competitive salary and benefits package",
      "Opportunity for career growth and advancement",
      "Flexible working hours and remote work options",
      "Collaborative and inclusive work environment"
    ]
  },
  {
    "id": 2,
    "jobTitle": "iOS Developer",
    "companyName": "Broken Dreams",
    "location": "Cupertino",
    "jobType": "Full-Time",
    "positions": 15,
    "jobDescription": "We are seeking a skilled iOS Developer to join our team and work on cutting-edge mobile applications. As an iOS Developer, you will collaborate with cross-functional teams to design and develop innovative iOS applications that deliver exceptional user experiences. Your responsibilities will include coding, debugging, and optimizing applications, as well as collaborating with designers and product managers to ensure project success.",
    "requirements": [
      "Bachelor's degree in Computer Science or a related field",
      "Proven experience in iOS app development using Swift and Xcode",
      "Strong knowledge of iOS frameworks, libraries, and design patterns",
      "Familiarity with RESTful APIs to connect iOS applications to back-end services",
      "Experience with version control systems (e.g., Git)",
      "Solid understanding of the full mobile development life cycle",
      "Ability to work independently and in a team environment",
      "Excellent problem-solving and communication skills"
    ],
    "responsibilities": [
      "Design and build advanced applications for the iOS platform",
      "Collaborate with cross-functional teams to define, design, and ship new features",
      "Unit-test code for robustness, including edge cases, usability, and general reliability",
      "Work on bug fixing and improving application performance",
      "Continuously discover, evaluate, and implement new technologies to maximize development efficiency",
      "Stay up-to-date with the latest iOS development trends and best practices"
    ],
    "salary": "$80,000/Year",
    "applicationDeadline": "05 June 2023",
    "postedDate": "24 May 2023",
    "skills": [
      "Swift",
      "Xcode",
      "iOS",
      "APIs",
      "Git"
    ],
    "benefits": [
      "Competitive salary and benefits package",
      "Opportunity for career growth and advancement",
      "Flexible working hours and remote work options",
      "Collaborative and inclusive work environment",
      "Training and professional development programs",
      "Employee wellness programs",
      "Company-sponsored events and team-building activities",
      "Modern and well-equipped office spaces"
    ]
  },
  {
    "id": 3,
    "jobTitle": "iOS Developer",
    "companyName": "Apple",
    "location": "Cupertino",
    "jobType": "Full-Time",
    "positions": 15,
    "jobDescription": "We are seeking a skilled iOS Developer to join our team and work on cutting-edge mobile applications. As an iOS Developer, you will collaborate with cross-functional teams to design and develop innovative iOS applications that deliver exceptional user experiences. Your responsibilities will include coding, debugging, and optimizing applications, as well as collaborating with designers and product managers to ensure project success.",
    "requirements": [
      "Bachelor's degree in Computer Science or a related field",
      "Proven experience in iOS app development using Swift and Xcode",
      "Strong knowledge of iOS frameworks, libraries, and design patterns",
      "Familiarity with RESTful APIs to connect iOS applications to back-end services",
      "Experience with version control systems (e.g., Git)",
      "Solid understanding of the full mobile development life cycle",
      "Ability to work independently and in a team environment",
      "Excellent problem-solving and communication skills"
    ],
    "responsibilities": [
      "Design and build advanced applications for the iOS platform",
      "Collaborate with cross-functional teams to define, design, and ship new features",
      "Unit-test code for robustness, including edge cases, usability, and general reliability",
      "Work on bug fixing and improving application performance",
      "Continuously discover, evaluate, and implement new technologies to maximize development efficiency",
      "Stay up-to-date with the latest iOS development trends and best practices"
    ],
    "salary": "$80,000/Year",
    "applicationDeadline": "05 June 2023",
    "postedDate": "24 May 2023",
    "skills": [
      "Swift",
      "Xcode",
      "iOS",
      "APIs",
      "Git"
    ],
    "benefits": [
      "Competitive salary and benefits package",
      "Opportunity for career growth and advancement",
      "Flexible working hours and remote work options",
      "Collaborative and inclusive work environment",
      "Training and professional development programs",
      "Employee wellness programs",
      "Company-sponsored events and team-building activities",
      "Modern and well-equipped office spaces"
    ]
  },
  ];
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  const handleJob = (job) => {
    setSelectedJob(job);
  };

  return (
    <div>
      {/* <Navbar bg="light" expand="md" sticky="top">
        <Container>
          <Navbar.Brand className="b" href="home">DalLinked</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-auto">
              <Nav.Link className="mx-2">Home</Nav.Link>
              <Nav.Link className="mx-2">Job Listings</Nav.Link>
              <Nav.Link className="mx-2">Applied Jobs</Nav.Link>
              <Nav.Link className="mx-2">Saved Jobs</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown className="mx-2" title="Sarah" id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <Container>
        <div className="row">
          <div className="col-5 col-xl-4 col-lg-4 col-md-5">
            {jobs.length === 0 ? (<div><h3>No jobs available currently.</h3></div>) : (jobs.map((job) => (<div key={job.id} onClick={() => handleJob(job)}><JobCard job={job} /></div>)))}
          </div>
          {(!isMobile && jobs.length !== 0) && <div className="col-7 col-xl-6 col-lg-6 col-md-6">
            <JobDetail job={selectedJob} />
          </div>}
        </div>
      </Container>
      {/* <FAQ /> */}
    </div>
  );
}

export default JobListingsPage;
