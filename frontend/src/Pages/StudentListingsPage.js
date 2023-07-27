import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "../styles/StudentListingsPage.css";
import Footer from "./../components/Footer";
function StudentListingsPage() {
  const students = [
    {
      id: 1,
      name: "John Doe",
      mobileNumber: "+1234567890",
      about: "I am a motivated and enthusiastic student...",
      skills: ["HTML", "CSS", "JavaScript"],
      workExperience: "Intern at XYZ Company",
      education: "Bachelor's Degree in Computer Science",
      resume: "Link to Resume",
      jobPreference: "Web Developer",
      workStyle: "Hybrid",
      jobSector: "IT",
      appliedFor: "Job A",
      profilePhoto: "https://randomuser.me/api/portraits/men/81.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      mobileNumber: "+9876543210",
      about: "I am a dedicated and detail-oriented student...",
      skills: ["Python", "Data Analysis", "SQL"],
      workExperience: "Research Assistant at ABC University",
      education: "Master's Degree in Data Science",
      resume: "Link to Resume",
      jobPreference: "Data Analyst",
      workStyle: "Remote",
      jobSector: "Data Science",
      appliedFor: "Job B",
      profilePhoto: "https://randomuser.me/api/portraits/men/81.jpg",
    },
    // Add more student objects as needed
  ];

  return (
    <>
      <Container>
        {students.map((student, idx) => (
          <Card key={idx} className="mb-4">
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Card.Img
                    variant="top"
                    src={student.profilePhoto}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </Col>
                <Col md={8}>
                  <Card.Title>{student.name}</Card.Title>
                  <Card.Text>
                    <strong>Skills:</strong> {student.skills.join(", ")}
                    <br />
                    <strong>Work Experience:</strong> {student.workExperience}
                    <br />
                    <strong>Education:</strong> {student.education}
                    <br />
                    <strong>Applied For:</strong> {student.appliedFor}
                  </Card.Text>
                  <Button variant="primary" className="me-2">
                    Actions
                  </Button>
                  <Button variant="secondary">Resume</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>
      <Footer />
    </>
  );
}

export default StudentListingsPage;
