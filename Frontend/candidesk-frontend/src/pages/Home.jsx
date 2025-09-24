import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import carousel1 from '../assets/carousel1.jpg';
import carousel2 from '../assets/carousel2.jpg';
import carousel3 from '../assets/carousel3.jpg';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-4">
        <h1 className="display-4">Welcome to Candidesk</h1>
        <p className="lead">Simplifying the HR process for candidates, vacancies, interviews, and tasks.</p>
        <Button variant="light" size="lg" href="#features">Explore Features</Button>
      </div>

      <Container className="my-5">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={carousel1} alt="Candidate Management" />
            <Carousel.Caption>
              <h3>Candidate Management</h3>
              <p>Track and manage candidates efficiently.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={carousel2} alt="Vacancy Management" />
            <Carousel.Caption>
              <h3>Vacancy Management</h3>
              <p>Create and monitor job vacancies in one place.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={carousel3} alt="Interview Scheduling" />
            <Carousel.Caption>
              <h3>Interview Scheduling</h3>
              <p>Plan and track interviews seamlessly.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      <Container id="features" className="my-5">
        <h2 className="text-center mb-4">✨ Features</h2>
        <Row>
          <Col md={4} className="mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <h5>🔐 Authentication & Authorization</h5>
              <p>User registration, login, and role-based access control.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <h5>👥 Candidate Management</h5>
              <p>Add, edit, track candidates and attach CVs.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <h5>📄 Vacancy Management</h5>
              <p>Create, edit, and assign candidates to vacancies.</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <h5>📅 Interview Scheduling</h5>
              <p>Plan interviews, assign interviewers, track statuses.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <h5>✅ Tasks & Reminders</h5>
              <p>Create and link tasks to candidates or vacancies.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="p-4 border rounded shadow-sm h-100">
              <h5>📊 Analytics & Dashboard</h5>
              <p>Get insights, charts, and HR efficiency reports.</p>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="bg-light text-center py-5">
        <h3>Ready to streamline your HR process?</h3>
        <Button variant="primary" size="lg" href="/login">Get Started</Button>
      </div>
    </div>
  );
};

export default Home;
