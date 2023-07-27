/* MADE BY MAYANK PANDEY */

import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "../styles/StudentListingsPage.css";
import Footer from "./../components/Footer";
import axios from 'axios';

function StudentListingsPage({ employerId }) {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/employeeJobs/getApplicantsByEmployeeid/${employerId}`);
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching students', error);
      }
    };
    fetchStudents();
  }, [employerId]);


  return (
    <>
      <Container>
        {students.map((student, idx) => (
          <Card key={idx} className="mb-4">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <Card.Title>Student ID: {student.studentId}</Card.Title>
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
