import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '/Users/mayankpandey/IdeaProjects/csci4177-5709-grp-4/frontend/src/components/ContactUs.css';
function ContactUs() {
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
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="email" placeholder="John Doe" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="john.doe@example.com" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter your message here" />
                  </Form.Group>
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
