import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import React, { useState } from 'react';
import './ContactUs.css';


function ContactUs() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: name,
      email: email,
      message: message
    };

    axios.post('https://backend-5x1b.onrender.com/contactUs', formData)
      .then(response => {
        console.log('Email sent: ', response.data);
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
  };


  return (

      <div className="d-flex justify-content-center" >
          <Card style={{ width: '30rem' }} >
            <div className="contact-body1">

            <Card.Body>
                <div className="d-flex justify-content-center">
                  <h1 style={{ color: '#EAE3D2' }}>CONTACT US</h1>
                </div>
            </Card.Body>
            </div>
            <div className="contact-body2">
            <Card.Body>
              <Card.Text>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="textarea"
                        value={name}
                        placeholder="John Doe"
                        onChange={(e) => setName(e.target.value)}
                    />                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder="john.doe@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={message}
                        rows={3}
                        placeholder="Enter your message here"
                        onChange={(e) => setMessage(e.target.value)}
                    />                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button type="submit" style={{ backgroundColor: '#607EAA', color: 'white', border: 'none' }}>Submit</Button>{' '}
                  </div>

                </Form>
              </Card.Text>
            </Card.Body>
            </div>

          </Card>
      </div>

  );
}

export default ContactUs;
