import React, { useEffect, useState } from "react";
import { Card, Table, Spinner, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { getCandidates, updateCandidate } from "../services/CandidateService";
import { getVacancies } from "../services/VacancyService";

const HrPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [externalCandidates, setExternalCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");

  const [candidateStatusFilter, setCandidateStatusFilter] = useState("");
  const [candidatePositionFilter, setCandidatePositionFilter] = useState("");
  const [vacancyTitleFilter, setVacancyTitleFilter] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [candidatesRes, vacanciesRes] = await Promise.all([
          getCandidates(),
          getVacancies(),
        ]);

        const candidatesData = candidatesRes.data || candidatesRes;
        const vacanciesData = vacanciesRes.data || vacanciesRes;

        const externalMock = [
          { id: 101, name: "Olena Koval", source: "LinkedIn", position: "Java Developer" },
          { id: 102, name: "Andrii Petrov", source: "Work.ua", position: "QA Engineer" },
          { id: 103, name: "Iryna Horbunova", source: "Djinni", position: "Project Manager" },
        ];

        setCandidates(candidatesData);
        setVacancies(vacanciesData);
        setExternalCandidates(externalMock);
      } catch (error) {
        console.error("Error loading HR data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRowClick = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    if (type === "candidate") setUpdatedStatus(item.status);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  const handleSaveStatus = async () => {
    if (!selectedItem || modalType !== "candidate") return;
    if (!updatedStatus) {
      alert("Please select a valid status!");
      return;
    }

    try {
      const updated = { ...selectedItem, status: updatedStatus };
      await updateCandidate(selectedItem.id, updated);

      setCandidates((prev) =>
        prev.map((c) =>
          c.id === selectedItem.id ? { ...c, status: updatedStatus } : c
        )
      );

      handleCloseModal();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update candidate status");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  const filteredCandidates = candidates.filter((c) => {
    const matchesStatus = candidateStatusFilter ? c.status === candidateStatusFilter : true;
    const matchesPosition = candidatePositionFilter
      ? c.position?.toLowerCase().includes(candidatePositionFilter.toLowerCase())
      : true;
    return matchesStatus && matchesPosition;
  });

  const filteredVacancies = vacancies.filter((v) =>
    vacancyTitleFilter
      ? v.title?.toLowerCase().includes(vacancyTitleFilter.toLowerCase())
      : true
  );

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center mb-4">HR Management Dashboard</h2>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <h5 className="text-primary fw-bold mb-3">Filter Candidates</h5>
              <Form.Group className="mb-2">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={candidateStatusFilter}
                  onChange={(e) => setCandidateStatusFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="NEW">NEW</option>
                  <option value="INTERVIEW">INTERVIEW</option>
                  <option value="HIRED">HIRED</option>
                  <option value="REJECTED">REJECTED</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by position..."
                  value={candidatePositionFilter}
                  onChange={(e) => setCandidatePositionFilter(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <h5 className="text-success fw-bold mb-3">Filter Vacancies</h5>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by title..."
                  value={vacancyTitleFilter}
                  onChange={(e) => setVacancyTitleFilter(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4} className="d-flex align-items-center justify-content-center">
              <div className="text-muted text-center">
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setCandidateStatusFilter("");
                    setCandidatePositionFilter("");
                    setVacancyTitleFilter("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="row">
        <div className="col-md-4 mb-3">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white fw-bold text-center">
              Candidates
            </Card.Header>
            <Card.Body>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Position</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((c) => (
                      <tr
                        key={c.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRowClick(c, "candidate")}
                      >
                        <td>{c.id}</td>
                        <td>{c.firstName} {c.lastName}</td>
                        <td>{c.position}</td>
                        <td>{c.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center text-muted">
                        No results
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4 mb-3">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-success text-white fw-bold text-center">
              Vacancies
            </Card.Header>
            <Card.Body>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Requirements</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVacancies.length > 0 ? (
                    filteredVacancies.map((v) => (
                      <tr
                        key={v.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRowClick(v, "vacancy")}
                      >
                        <td>{v.id}</td>
                        <td>{v.title}</td>
                        <td>{v.requirements ? v.requirements.slice(0, 30) + "..." : "—"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center text-muted">
                        No results
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4 mb-3">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-info text-white fw-bold text-center">
              Outer candidates (API)
            </Card.Header>
            <Card.Body>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {externalCandidates.map((ex) => (
                    <tr
                      key={ex.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRowClick(ex, "external")}
                    >
                      <td>{ex.id}</td>
                      <td>{ex.name}</td>
                      <td>{ex.position}</td>
                      <td>{ex.source}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      <Modal show={!!selectedItem} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "candidate" && "Candidate Details"}
            {modalType === "vacancy" && "Vacancy Details"}
            {modalType === "external" && "External Candidate"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && modalType === "candidate" && (
            <>
              <p><strong>ID:</strong> {selectedItem.id}</p>
              <p><strong>Full Name:</strong> {selectedItem.firstName} {selectedItem.lastName}</p>
              <p><strong>Position:</strong> {selectedItem.position}</p>
              <p><strong>Email:</strong> {selectedItem.email}</p>
              <p><strong>Phone:</strong> {selectedItem.phone}</p>

              <Form.Group className="mb-3 mt-3">
                <Form.Label><strong>Status:</strong></Form.Label>
                <Form.Select
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                >
                  <option value="NEW">NEW</option>
                  <option value="INTERVIEW">INTERVIEW</option>
                  <option value="HIRED">HIRED</option>
                  <option value="REJECTED">REJECTED</option>
                </Form.Select>
              </Form.Group>

              <p>
                <strong>CV Link:</strong>{" "}
                <a href={selectedItem.cvLink} target="_blank" rel="noreferrer">
                  Open CV
                </a>
              </p>
              <p><strong>Created At:</strong> {new Date(selectedItem.createdAt).toLocaleString()}</p>
            </>
          )}

          {selectedItem && modalType === "vacancy" && (
            <>
              <p><strong>ID:</strong> {selectedItem.id}</p>
              <p><strong>Title:</strong> {selectedItem.title}</p>
              <p><strong>Description:</strong> {selectedItem.description}</p>
              <p><strong>Requirements:</strong> {selectedItem.requirements}</p>
              <p><strong>Created By:</strong> {selectedItem.createdByLogin || selectedItem.createdById}</p>
            </>
          )}

          {selectedItem && modalType === "external" && (
            <>
              <p><strong>ID:</strong> {selectedItem.id}</p>
              <p><strong>Name:</strong> {selectedItem.name}</p>
              <p><strong>Position:</strong> {selectedItem.position}</p>
              <p><strong>Source:</strong> {selectedItem.source}</p>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {modalType === "candidate" && (
            <Button variant="success" onClick={handleSaveStatus}>
              Save changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HrPage;
