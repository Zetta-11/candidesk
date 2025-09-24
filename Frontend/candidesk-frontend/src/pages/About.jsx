import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import about from '../assets/about-img.jpg';

const About = () => {
  return (
    <div>
      
      <div className="bg-info text-white text-center py-5">
        <h1 className="display-4">About Candidesk</h1>
        <p className="lead">
          Candidesk is a web-based HR management system designed to simplify recruitment.
        </p>
      </div>

      
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src={about} 
              alt="About Candidesk"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={6}>
            <h2>Our Mission</h2>
            <p>
              Candidesk helps companies manage candidates, vacancies, interviews, and tasks in one
              convenient place. With role-based access and analytics, HR managers can focus on
              making better hiring decisions.
            </p>
          </Col>
        </Row>
      </Container>

      
      <Container className="my-5">
        <h2 className="text-center mb-4">🏗️ Tech Stack</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Backend</Card.Title>
                <Card.Text>Java 17, Spring Boot, Spring Security, Hibernate</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Frontend</Card.Title>
                <Card.Text>React, Bootstrap, Axios</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Database</Card.Title>
                <Card.Text>MySQL</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      
      <div className="bg-light text-center py-5">
        <h3>👨‍💻 Author: Klim Menkov</h3>
        <p>
          📧 klim.menkov@ukr.net <br />
          🌐{" "}
          <a
            href="https://www.linkedin.com/in/klim-menkov-18a995215/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
