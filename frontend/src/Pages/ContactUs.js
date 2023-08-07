/* MADE BY SHUBHAM MISHRA AND MAYANK PANDEY */

import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import "../styles/ContactUs.css";
import Footer from "./../components/Footer";

function ContactUs() {
  // State variables to manage form input and submission status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create formData object
    const formData = {
      name: name,
      email: email,
      message: message,
    };

    // Start loading state
    setIsLoading(true);

    // Send POST request to server
    axios
      .post("https://backend-5x1b.onrender.com/contactUs", formData)
      .then((response) => {
        console.log("Email sent:", response.data);
        setIsSubmitted(true);

        // Clear form input
        setName("");
        setEmail("");
        setMessage("");

        // Hide success alert after 10 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 10000);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      })
      .finally(() => {
        // End loading state
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="contact-us-container">
        {/* Display success alert if message is submitted */}
        {isSubmitted && (
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Success!</h4>
            <p>
              Your message has been sent! Our team will be in contact with you
              soon.
            </p>
          </div>
        )}
        <div className="container my-5 mx-auto">
          <div className="d-flex justify-content-center">
            <Card style={{ width: "30rem" }}>
              {/* Contact Form Header */}
              <div className="contact-body1">
                <Card.Body>
                  <div className="d-flex justify-content-center">
                    <h1 style={{ color: "#EAE3D2" }}>CONTACT US</h1>
                  </div>
                </Card.Body>
              </div>
              <Card.Body>
                <Card.Text>
                  <Form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <Form.Group className="mb-3" controlId="nameInput">
                      <Form.Label className="d-flex justify-content-left">
                        Name: <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        placeholder="John Doe"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    {/* Email Input */}
                    <Form.Group className="mb-3" controlId="emailInput">
                      <Form.Label className="d-flex justify-content-left">
                        Email address: <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        placeholder="john.doe@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <div className="d-flex justify-content-left">
                        <small id="emailHelp" className="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small>
                      </div>
                    </Form.Group>
                    {/* Message Input */}
                    <Form.Group className="mb-3" controlId="messageInput">
                      <Form.Label className="d-flex justify-content-left">
                        Message: <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        value={message}
                        rows={3}
                        placeholder="Enter your message here"
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </Form.Group>
                    {/* Submit Button */}
                    <div className="d-flex justify-content-center">
                      <Button
                        type="submit"
                        style={{
                          backgroundColor: "#2c74b3",
                          color: "white",
                          border: "none",
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            />{" "}
                            Submitting...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>{" "}
                    </div>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
