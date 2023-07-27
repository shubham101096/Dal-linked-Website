/* MADE BY MAYANKKUMAR PATEL */

import React from "react";
import { Row, Col } from "react-bootstrap";
import "../styles/FAQ.css";
import Footer from "./../components/Footer";
function FAQPage() {
  const faqs = [
    {
      number: "01",
      question: "How can I create an account on DalLinked?",
      answer:
        "To create an account on DalLinked, please click on the 'Sign Up' button and provide your Dal email. Create a password and complete the sign-up process. Once your request is approved by the administrator, you will be able to log into our website.",
    },
    {
      number: "02",
      question: "How do I apply for a job?",
      answer:
        "To apply for a job, click on the job listing you are interested in and then click on the 'Apply' button.",
    },
    {
      number: "03",
      question: "How can I save a job?",
      answer:
        "To save a job for future reference, click on the job listing you want to save and then click on the 'Save' button.",
    },
    {
      number: "04",
      question: "How will I know if I am selected for a job?",
      answer:
        "If you are selected for a job, the employer will contact you directly to provide further details and discuss the next steps.",
    },
    {
      number: "05",
      question: "How can I receive notifications for new jobs?",
      answer:
        "To receive email notifications for new jobs, please ensure that you have added your job preferences to your profile. By doing so, you will be notified whenever a job matching your preferences is posted.",
    },
  ];

  return (
    <>
      <div className="container my-5 mx-auto">
        <h1 className="text-start">FAQs</h1>
        {faqs.map((faq) => (
          <div key={faq.number}>
            <FAQQuestion number={faq.number} question={faq.question} />
            <FAQAnswer answer={faq.answer} />
            <hr />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

function FAQQuestion(props) {
  const { question, number } = props;
  return (
    <Row className="mt-5 align-items-center">
      <Col xs={2} sm={2} md={1} lg={1}>
        <h3 className="q-number text-lg-center text-start">{number}</h3>
      </Col>
      <Col>
        <h5 className="text-start question">{question}</h5>
      </Col>
    </Row>
  );
}

function FAQAnswer(props) {
  const { answer } = props;
  return (
    <Row>
      <Col lg={1}></Col>
      <Col>
        <h5 className="text-start answer">{answer}</h5>
      </Col>
    </Row>
  );
}

export default FAQPage;
