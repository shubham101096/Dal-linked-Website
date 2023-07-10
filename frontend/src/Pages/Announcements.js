import { useState } from 'react';
import { Container, Card, Button, ListGroup, Pagination, Modal, Row, Col } from 'react-bootstrap';
import '../styles/Announcements.css'

function AnnouncementPage() {
    const [announcements, setAnnouncements] = useState([
        {
          id: 1,
          title: 'Workshop on Web Development',
          date: '2023-06-20',
          body: 'Join us for an interactive workshop on web development where you will learn the fundamentals of HTML, CSS, and JavaScript. Gain hands-on experience in building responsive websites and web applications. Date: 2023-06-20, Time: 9:00 AM - 12:00 PM, Location: Room A, Main Building.',
        },
        {
          id: 2,
          title: 'Recruitment Drive for Software Engineers',
          date: '2023-06-25',
          body: 'We are organizing a recruitment drive exclusively for software engineers. Companies from various industries will be present to hire talented individuals. Showcase your skills and land your dream job! Date: 2023-06-25, Time: 10:00 AM - 4:00 PM, Location: Conference Hall, 2nd Floor.',
        },
        {
          id: 3,
          title: 'Career Counseling Session',
          date: '2023-06-30',
          body: 'Looking for guidance in your career journey? Attend our career counseling session where experienced professionals will provide personalized advice based on your interests, skills, and goals. Date: 2023-06-30, Time: 2:00 PM - 4:00 PM, Location: Seminar Room B, Student Center.',
        },
        {
          id: 4,
          title: 'Guest Lecture by Industry Expert',
          date: '2023-07-05',
          body: 'Don\'t miss the opportunity to learn from a renowned industry expert who will share valuable insights and experiences. Gain practical knowledge and get inspired by their success stories. Date: 2023-07-05, Time: 6:00 PM - 8:00 PM, Location: Auditorium, Academic Building.',
        },
        {
          id: 5,
          title: 'Internship Opportunities at Top Companies',
          date: '2023-07-10',
          body: 'Explore exciting internship opportunities at top companies in your desired industry. Gain practical experience, build your professional network, and boost your chances of securing a full-time position. Date: 2023-07-10, Time: 9:00 AM - 5:00 PM, Location: Career Services Office.',
        },
        {
          id: 6,
          title: 'Workshop on Entrepreneurship',
          date: '2023-07-15',
          body: 'Dream of starting your own business? Attend our workshop on entrepreneurship and learn from successful entrepreneurs who will share their insights, strategies, and tips for launching a successful venture. Date: 2023-07-15, Time: 2:00 PM - 5:00 PM, Location: Startup Hub, Innovation Center.',
        },
        {
          id: 7,
          title: 'Career Fair 2023',
          date: '2023-07-20',
          body: 'Connect with leading employers at our Career Fair 2023. Explore job opportunities, network with industry professionals, and participate in on-site interviews. Don\'t miss out on this chance to kick-start your career! Date: 2023-07-20, Time: 10:00 AM - 6:00 PM, Location: Exhibition Hall, Convention Center.',
        },
        {
          id: 8,
          title: 'Seminar on Artificial Intelligence',
          date: '2023-07-25',
          body: 'Discover the latest advancements and applications of Artificial Intelligence (AI) at our seminar. Learn about machine learning, deep learning, and AI-driven technologies shaping various industries. Date: 2023-07-25, Time: 1:00 PM - 3:00 PM, Location: Lecture Hall C, Engineering Building.',
        },
        {
          id: 9,
          title: 'Study Abroad Opportunities',
          date: '2023-07-30',
          body: 'Considering studying abroad? Attend our information session to explore study abroad opportunities, scholarships, and cultural exchange programs. Expand your horizons and gain a global perspective. Date: 2023-07-30, Time: 3:00 PM - 5:00 PM, Location: Seminar Room A, International Office.',
        },
        {
          id: 10,
          title: 'Webinar: Career Tips for Fresh Graduates',
          date: '2023-08-05',
          body: 'Are you about to graduate? Join our webinar for essential career tips, guidance on job searching, resume building, and interview techniques. Gain the confidence and skills needed for a successful transition into the professional world. Date: 2023-08-05, Time: 10:00 AM - 12:00 PM, Location: Online Webinar.',
        },
        {
          id: 11,
          title: 'Coding Competition',
          date: '2023-08-10',
          body: 'Put your coding skills to the test in our coding competition. Compete with fellow programmers, solve challenging problems, and win exciting prizes. Sharpen your coding abilities and demonstrate your expertise. Date: 2023-08-10, Time: 9:00 AM - 6:00 PM, Location: Computer Lab 3, Science Building.',
        },
        {
          id: 12,
          title: 'Guest Lecture on Digital Marketing',
          date: '2023-08-15',
          body: 'Join us for a guest lecture on the latest trends in digital marketing. Learn about social media marketing, search engine optimization (SEO), content strategy, and analytics to enhance your marketing skills. Date: 2023-08-15, Time: 2:00 PM - 4:00 PM, Location: Lecture Hall A, Business School.',
        },
        {
          id: 14,
          title: 'Seminar: Latest Trends in Data Science',
          date: '2023-08-25',
          body: 'Stay up-to-date with the latest trends in data science. Attend our seminar to explore emerging technologies, data analytics techniques, and real-world applications that are shaping the future of data-driven industries. Date: 2023-08-25, Time: 3:00 PM - 5:00 PM, Location: Data Science Lab, Research Center.',
        },
        {
          id: 15,
          title: 'Networking Event for IT Professionals',
          date: '2023-08-30',
          body: 'Network and connect with fellow IT professionals at our exclusive networking event. Expand your professional circle, exchange industry insights, and explore collaboration opportunities. Date: 2023-08, Location: Computer Lab 3, Science Building.'
        }]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

  const handleDelete = (id) => {
    const announcement = announcements.find((announcement) => announcement.id === id);
    setAnnouncementToDelete(announcement);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = () => {
    const updatedAnnouncements = announcements.filter((announcement) => announcement.id !== announcementToDelete.id);
    setAnnouncements(updatedAnnouncements);
    setShowDeleteModal(false);
  };

  const announcementsPerPage = 5;
  const totalPages = Math.ceil(announcements.length / announcementsPerPage);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastAnnouncement = activePage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  return (
    <Container>
      <h1 className="text-center mt-4 mb-5">Announcements</h1>
      <Row className="justify-content-center">
        <Col sm={12} md={10} lg={8}>
            <ListGroup className="text-left md-8">
                {currentAnnouncements.map((announcement) => (
                <ListGroup.Item key={announcement.id} className="p-0 mb-3 border-0">
                    <Card>
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <h5>{announcement.title}</h5>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(announcement.id)}>
                        Delete
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">20-10-2023</Card.Subtitle>
                        <Card.Text>{announcement.body}</Card.Text>
                    </Card.Body>
                    </Card>
                </ListGroup.Item>
                ))}
            </ListGroup>
        </Col>
      </Row>
      {announcements.length > announcementsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === activePage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{announcementToDelete?.title}" announcement?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmation}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AnnouncementPage;
