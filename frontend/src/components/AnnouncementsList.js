import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';

function formatDateString(dateStr) {
  const date = new Date(dateStr);

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
}

function AnnouncementsList({ announcements, userType, onDelete }) {
  return (
    <ListGroup className="text-left md-8">
      {announcements.map((announcement) => (
        <ListGroup.Item key={announcement._id} className="p-0 mb-3 border-0">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>{announcement.title}</h5>
              {userType === 'admin' && (
                <Button
                  style={{color:'red', backgroundColor:'rgba(200, 209, 214, 0.5)', borderRadius:'25px' }}
                  size="sm"
                  onClick={() => onDelete(announcement._id)}
                >
                  Delete
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                Posted on: {formatDateString(announcement.datePosted)}
              </Card.Subtitle>
              <Card.Text>{announcement.body}</Card.Text>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default AnnouncementsList;
