import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line
} from "recharts";
import { getCandidates } from "../services/CandidateService";
import { getVacancies } from "../services/VacancyService";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#33AA99"];
const STATUS_COLORS = { NEW: "#0088FE", INTERVIEW: "#00C49F", HIRED: "#FFBB28", REJECTED: "#FF8042" };

const TLPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [candidatesRes, vacanciesRes] = await Promise.all([getCandidates(), getVacancies()]);
        setCandidates(candidatesRes.data || candidatesRes);
        setVacancies(vacanciesRes.data || vacanciesRes);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-5" />;

  const statusData = Object.entries(
    candidates.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const positionData = Object.entries(
    candidates.reduce((acc, c) => {
      acc[c.position] = (acc[c.position] || 0) + 1;
      return acc;
    }, {})
  ).map(([position, count]) => ({ position, count }));

  const hiredRejectedData = [
    { name: "HIRED", value: candidates.filter(c => c.status === "HIRED").length },
    { name: "REJECTED", value: candidates.filter(c => c.status === "REJECTED").length }
  ];

  const dateCounts = candidates.reduce((acc, c) => {
    const date = new Date(c.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const lineData = Object.entries(dateCounts).map(([date, count]) => ({ date, count }));

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <div className="container-fluid flex-grow-1 p-4 overflow-auto">
        <h2 className="text-center mb-4">Team Lead Dashboard</h2>

        <Row className="mb-4">
          <Col lg={6}>
            <Card className="mb-4 shadow-sm h-100">
              <Card.Header>Candidate Status Distribution</Card.Header>
              <Card.Body className="d-flex justify-content-center align-items-center">
                <PieChart width={400} height={300}>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="mb-4 shadow-sm h-100">
              <Card.Header>Candidates by Position</Card.Header>
              <Card.Body className="d-flex justify-content-center align-items-center">
                <BarChart width={400} height={300} data={positionData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="position" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={6}>
            <Card className="mb-4 shadow-sm h-100">
              <Card.Header>HIRED vs REJECTED</Card.Header>
              <Card.Body className="d-flex justify-content-center align-items-center">
                <PieChart width={400} height={300}>
                  <Pie data={hiredRejectedData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} label>
                    {hiredRejectedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="mb-4 shadow-sm h-100">
              <Card.Header>Candidates Added Over Time</Card.Header>
              <Card.Body className="d-flex justify-content-center align-items-center">
                <LineChart width={400} height={300} data={lineData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TLPage;
