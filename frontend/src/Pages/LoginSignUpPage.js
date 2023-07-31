
/* MADE BY ADRIANA SANCHEZ GOMEZ */

import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import employerImg from "../images/employer-card.jpg";
import adminImg from "../images/admin-card.jpg";
import studentImg from "../images/student-card.jpg";
import "../styles/UserAuth.css";
import Footer from "./../components/Footer";

const cardStyle = {
  width: "100%", // Adjust the width to 100% for responsiveness
  height: "50rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const LoginSignup = () => {
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }} // Adjust minHeight to avoid issues with smaller viewports
      >
        <Row className="justify-content-center">
          {" "}
          {/* Center the row */}
          <Col md="auto" lg={4}>
            {" "}
            {/* Set the column size for different viewports */}
            <Card style={cardStyle} className="user-card">
              <Card.Body>
                <Card.Title>Student</Card.Title>
                <Card.Text>
                  <Link to="/registration-student">Register</Link> |{" "}
                  <Link to="/login-student">Login</Link>
                </Card.Text>
              </Card.Body>
              <Card.Img
                variant="bottom"
                src={studentImg}
                style={{ height: "100%", objectFit: "cover" }}
              />
            </Card>
          </Col>
          <Col md="auto" lg={4}>
            <Card style={cardStyle} className="user-card">
              <Card.Body>
                <Card.Title>Employer</Card.Title>
                <Card.Text>
                  <Link to="/registration-employer">Register</Link> |{" "}
                  <Link to="/login-employer">Login</Link>
                </Card.Text>
              </Card.Body>
              <Card.Img
                variant="bottom"
                src={employerImg}
                style={{ height: "100%", objectFit: "cover" }}
              />
            </Card>
          </Col>
          <Col md="auto" lg={4}>
            <Card style={cardStyle} className="user-card">
              <Card.Body>
                <Card.Title>Admin</Card.Title>
                <Card.Text>
                  <Link to="/login-admin">Login</Link>
                </Card.Text>
              </Card.Body>
              <Card.Img
                variant="bottom"
                src={adminImg}
                style={{ height: "100%", objectFit: "cover" }}
              />
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default LoginSignup;
