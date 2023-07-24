import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import '../styles/Announcements.css';

function NewAnnouncementForm({ onSubmit }) {
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementBody, setNewAnnouncementBody] = useState('');
  const [error, setError] = useState('');
  const [confirmPost, setConfirmPost] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

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

    setConfirmPost(true);
  };

  const handlePostConfirmation = () => {
    onSubmit(newAnnouncementTitle, newAnnouncementBody);
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
          <Button variant="primary" type="submit">
            Post
          </Button>
        )}
        {confirmPost && (
          <Button variant="danger" onClick={handlePostConfirmation}>
            Confirm
          </Button>
        )}
      </div>
    </Form>
  );
}

export default NewAnnouncementForm;
