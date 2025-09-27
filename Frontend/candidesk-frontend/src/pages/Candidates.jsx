import React, { useState, useEffect } from "react";
import {
  getCandidates,
  deleteCandidate,
  createCandidate,
  updateCandidate,
} from "../services/CandidateService";
import { Modal, Button, Form } from "react-bootstrap";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cvLink: "",
    status: "NEW",
  });

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const response = await getCandidates();
      setCandidates(response.data);
    } catch (error) {
      console.error("Error loading candidates:", error);
    }
  };

  const handleShow = (candidate = null) => {
    if (candidate) {
      setEditingCandidate(candidate);
      setForm({
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        phone: candidate.phone,
        cvLink: candidate.cvLink,
        status: candidate.status,
      });
    } else {
      setEditingCandidate(null);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        cvLink: "",
        status: "NEW",
      });
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (editingCandidate) {
        await updateCandidate(editingCandidate.id, form);
      } else {
        await createCandidate(form);
      }
      handleClose();
      loadCandidates();
    } catch (error) {
      console.error("Error saving candidate:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        await deleteCandidate(id);
        loadCandidates();
      } catch (error) {
        console.error("Error deleting candidate:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Candidates Management</h2>
      <Button variant="primary" className="mb-3" onClick={() => handleShow()}>
        Add Candidate
      </Button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>CV</th>
            <th>Status</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>
                {candidate.firstName} {candidate.lastName}
              </td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>
                <a href={candidate.cvLink} target="_blank" rel="noreferrer">
                  View CV
                </a>
              </td>
              <td>{candidate.status}</td>
              <td>{new Date(candidate.createdAt).toLocaleString()}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShow(candidate)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(candidate.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {candidates.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center">
                No candidates found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCandidate ? "Edit Candidate" : "Add Candidate"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>CV Link</Form.Label>
              <Form.Control
                type="text"
                name="cvLink"
                value={form.cvLink}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="NEW">NEW</option>
                <option value="INTERVIEW">INTERVIEW</option>
                <option value="HIRED">HIRED</option>
                <option value="REJECTED">REJECTED</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Candidates;
