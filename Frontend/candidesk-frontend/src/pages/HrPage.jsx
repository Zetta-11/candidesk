import React, { useEffect, useState } from "react";
import { Card, Table, Spinner, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { getCandidates, updateCandidate } from "../services/CandidateService";
import { getVacancies } from "../services/VacancyService";
import { searchWorkUaCandidates } from "../services/ExternalCandidateService";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchSkills, setSearchSkills] = useState("");
  const [externalLoading, setExternalLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [candidatesRes, vacanciesRes] = await Promise.all([
          getCandidates(),
          getVacancies(),
        ]);

        setCandidates(candidatesRes.data || candidatesRes);
        setVacancies(vacanciesRes.data || vacanciesRes);
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
    try {
      const updated = { ...selectedItem, status: updatedStatus };
      await updateCandidate(selectedItem.id, updated);
      setCandidates((prev) =>
        prev.map((c) => (c.id === selectedItem.id ? updated : c))
      );
      handleCloseModal();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update candidate status");
    }
  };


  const handleSearchExternal = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() && !searchSkills.trim()) {
      alert("Введіть назву вакансії або навички для пошуку.");
      return;
    }
    setExternalLoading(true);
    try {
      const results = await searchWorkUaCandidates({
        query: searchQuery,
        page: 1,
      });
      setExternalCandidates(results.map((r, i) => ({ id: i + 1, ...r, source: "Work.ua" })));
    } catch (err) {
      console.error("External search error:", err);
      alert("Помилка під час пошуку кандидатів на Work.ua");
    } finally {
      setExternalLoading(false);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
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
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="row">
        {/* ==== LOCAL CANDIDATES ==== */}
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
                    <th>Name</th>
                    <th>Position</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.length ? (
                    candidates.map((c) => (
                      <tr key={c.id} onClick={() => handleRowClick(c, "candidate")} style={{ cursor: "pointer" }}>
                        <td>{c.id}</td>
                        <td>{c.firstName} {c.lastName}</td>
                        <td>{c.position}</td>
                        <td>{c.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} className="text-center text-muted">No results</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>

        {/* ==== VACANCIES ==== */}
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
                  {vacancies.length ? (
                    vacancies.map((v) => (
                      <tr key={v.id} onClick={() => handleRowClick(v, "vacancy")} style={{ cursor: "pointer" }}>
                        <td>{v.id}</td>
                        <td>{v.title}</td>
                        <td>{v.requirements ? v.requirements.slice(0, 30) + "..." : "—"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={3} className="text-center text-muted">No results</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>

        {/* ==== EXTERNAL CANDIDATES (Work.ua) ==== */}
        <div className="col-md-4 mb-3">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-info text-white fw-bold text-center">
              Outer candidates (Work.ua)
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSearchExternal} className="mb-3">
                <Row className="g-2">
                  <Col md={12}>
                    <Form.Control
                      type="text"
                      placeholder="Desired position (e.g. Java Developer)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Col>
                  <Col md={12}>
                    <Form.Control
                      type="text"
                      placeholder="Skills (comma separated)"
                      value={searchSkills}
                      onChange={(e) => setSearchSkills(e.target.value)}
                    />
                  </Col>
                  <Col md={12}>
                    <Form.Control
                      type="text"
                      placeholder="City or region (optional)"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </Col>
                  <Col md={12} className="d-grid">
                    <Button type="submit" variant="info" disabled={externalLoading}>
                      {externalLoading ? "Searching..." : "Search"}
                    </Button>
                  </Col>
                </Row>
              </Form>

              {externalLoading && <div className="text-center"><Spinner animation="border" size="sm" /></div>}

              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Information</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {externalCandidates.length ? (
                    externalCandidates.map((ex) => (
                      <tr key={ex.id} onClick={() => handleRowClick(ex, "external")} style={{ cursor: "pointer" }}>
                        <td>{ex.id}</td>
                        <td>{`${ex.firstName || ""} ${ex.lastName || ""}`}</td>
                        <td>{ex.position}</td>
                        <td>{ex.source}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} className="text-center text-muted">No external results</td></tr>
                  )}
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
          {modalType === "candidate" && selectedItem && (
            <>
              <p><strong>ID:</strong> {selectedItem.id}</p>
              <p><strong>Full Name:</strong> {selectedItem.firstName} {selectedItem.lastName}</p>
              <p><strong>Email:</strong> {selectedItem.email}</p>
              <p><strong>Phone:</strong> {selectedItem.phone}</p>
              <p><strong>Position:</strong> {selectedItem.position}</p>
              <Form.Group className="mb-3 mt-3">
                <Form.Label>Status</Form.Label>
                <Form.Select value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value)}>
                  <option value="NEW">NEW</option>
                  <option value="INTERVIEW">INTERVIEW</option>
                  <option value="HIRED">HIRED</option>
                  <option value="REJECTED">REJECTED</option>
                </Form.Select>
              </Form.Group>
              <p><strong>CV Link:</strong> <a href={selectedItem.cvLink}>Open CV</a></p>
            </>
          )}

          {modalType === "external" && selectedItem && (
            <>
              <p><strong>Name:</strong> {`${selectedItem.firstName} ${selectedItem.lastName}`}</p>
              <p><strong>Position:</strong> {selectedItem.position}</p>
              <p><strong>Source:</strong> {selectedItem.source}</p>
              <p><strong>CV Link:</strong> <a href={selectedItem.cvLink}>Work.ua Profile</a></p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HrPage;
