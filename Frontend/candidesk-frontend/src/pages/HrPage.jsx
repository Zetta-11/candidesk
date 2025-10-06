import React, { useEffect, useState } from "react";
import { Card, Table, Spinner, Modal, Button } from "react-bootstrap";
import { getCandidates } from "../services/CandidateService";
import { getVacancies } from "../services/VacancyService";

const HrPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [externalCandidates, setExternalCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Для модалок
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null); // "candidate" | "vacancy" | "external"

  useEffect(() => {
    const loadData = async () => {
      try {
        const [candidatesRes, vacanciesRes] = await Promise.all([
          getCandidates(),
          getVacancies(),
        ]);

        // API може повертати res.data або просто масив
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
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setModalType(null);
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
      <div className="row">
        {/* Кандидати */}
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
                  {candidates.length > 0 ? (
                    candidates.map((c) => (
                      <tr
                        key={c.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRowClick(c, "candidate")}
                      >
                        <td>{c.id}</td>
                        <td>
                          {c.firstName} {c.lastName}
                        </td>
                        <td>{c.position}</td>
                        <td>{c.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center text-muted">
                        No data
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>

        {/* Вакансії */}
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
                  {vacancies.length > 0 ? (
                    vacancies.map((v) => (
                      <tr
                        key={v.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRowClick(v, "vacancy")}
                      >
                        <td>{v.id}</td>
                        <td>{v.title}</td>
                        <td>
                          {v.requirements
                            ? v.requirements.slice(0, 30) + "..."
                            : "—"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center text-muted">
                        No data
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>

        {/* Зовнішні кандидати */}
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

      {/* Modal for details */}
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
            <div>
              <p><strong>ID:</strong> {selectedItem.id}</p>
              <p><strong>Full Name:</strong> {selectedItem.firstName} {selectedItem.lastName}</p>
              <p><strong>Status:</strong> {selectedItem.position}</p>
              <p><strong>Email:</strong> {selectedItem.email}</p>
              <p><strong>Phone:</strong> {selectedItem.phone}</p>
              <p><strong>Status:</strong> {selectedItem.status}</p>
              <p><strong>CV Link:</strong> <a href={selectedItem.cvLink} target="_blank" rel="noreferrer">Open CV</a></p>
              <p><strong>Created At:</strong> {new Date(selectedItem.createdAt).toLocaleString()}</p>
            </div>
          )}

          {selectedItem && modalType === "vacancy" && (
            <div>
              <p><strong>ID:</strong> {selectedItem.id}</p>
              <p><strong>Title:</strong> {selectedItem.title}</p>
              <p><strong>Description:</strong> {selectedItem.description}</p>
              <p><strong>Requirements:</strong> {selectedItem.requirements}</p>
              <p><strong>Created By:</strong> {selectedItem.createdByLogin || selectedItem.createdById}</p>
              <p><strong>Created At:</strong> {selectedItem.createdAt}</p>
            </div>
          )}

          {selectedItem && modalType === "external" && (
            <div>
              <p><strong>ID:</strong> {selectedItem.id}</p>
              <p><strong>Name:</strong> {selectedItem.name}</p>
              <p><strong>Position:</strong> {selectedItem.position}</p>
              <p><strong>Source:</strong> {selectedItem.source}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HrPage;
