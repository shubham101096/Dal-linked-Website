import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';

function AnnouncementsList({ announcements, onDelete }) {
  return (
    <ListGroup className="text-left md-8">
      {announcements.map((announcement) => (
        <ListGroup.Item key={announcement._id} className="p-0 mb-3 border-0">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>{announcement.title}</h5>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(announcement._id)}
              >
                Delete
              </Button>
            </Card.Header>
            <Card.Body>
              <Card.Text>{announcement.body}</Card.Text>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default AnnouncementsList;
