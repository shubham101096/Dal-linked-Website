/* MADE BY SHUBHAM MISHRA */

import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import '../styles/Announcements.css';

function NewAnnouncementForm({ onSubmit }) {
  // State variables to manage form inputs and messages
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementBody, setNewAnnouncementBody] = useState('');
  const [error, setError] = useState('');
  const [confirmPost, setConfirmPost] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for title length and empty fields
    if (newAnnouncementTitle.length > 50) {
      setError('Title should not exceed 50 characters');
      return;
    }

    if (newAnnouncementTitle.trim() === '') {
      setError('Title is required');
      return;
    }

    if (newAnnouncementBody.trim() === '') {
      setError('Body is required');
      return;
    }

    // If validation passes, show post confirmation button
    setConfirmPost(true);
  };

  // Function to handle post confirmation
  const handlePostConfirmation = () => {
    // Call the provided onSubmit function to post the announcement
    onSubmit(newAnnouncementTitle, newAnnouncementBody);

    // Clear form inputs and error message
    setNewAnnouncementTitle('');
    setNewAnnouncementBody('');
    setError('');
    setConfirmPost(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="newAnnouncementTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={newAnnouncementTitle}
          onChange={(e) => setNewAnnouncementTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="newAnnouncementBody">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter body"
          value={newAnnouncementBody}
          onChange={(e) => setNewAnnouncementBody(e.target.value)}
        />
      </Form.Group>
      <div className="d-flex justify-content-end mt-2">
        {!confirmPost && (
          <Button style={{color:'green', backgroundColor:'rgba(200, 209, 214, 0.5)', borderRadius:'25px' }} type="submit">
            Post
          </Button>
        )}
        {confirmPost && (
          <Button style={{color:'red', backgroundColor:'rgba(200, 209, 214, 0.5)', borderRadius:'25px' }} onClick={handlePostConfirmation}>
            Confirm
          </Button>
        )}
      </div>
    </Form>
  );
}

// Export the NewAnnouncementForm component
export default NewAnnouncementForm;
