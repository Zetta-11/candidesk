import React, { useState, useEffect } from "react";
import {
  getCandidates,
  deleteCandidate,
  createCandidate,
  updateCandidate,
} from "../services/CandidateService";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cvLink: "",
    position: "",
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
        firstName: candidate.firstName || "",
        lastName: candidate.lastName || "",
        email: candidate.email || "",
        phone: candidate.phone || "",
        cvLink: candidate.cvLink || "",
        position: candidate.position || "",
        status: candidate.status || "NEW",
      });
    } else {
      setEditingCandidate(null);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        cvLink: "",
        position: "",
        status: "NEW",
      });
    }
    setErrors({});
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setErrors({});
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone))
      newErrors.phone = "Invalid phone format";
    if (!form.cvLink.trim()) newErrors.cvLink = "CV link is required";
    else if (!/^https?:\/\/\S+$/.test(form.cvLink))
      newErrors.cvLink = "Invalid CV link";
    if (!form.position.trim()) newErrors.position = "Position is required";
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const candidateData = {
      ...form,
      position: form.position.trim(),
    };

    try {
      if (editingCandidate) {
        await updateCandidate(editingCandidate.id, candidateData);
      } else {
        await createCandidate(candidateData);
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

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Full name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>CV</th>
            <th>Position</th>
            <th>Status</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.id}</td>
                <td>
                  {candidate.firstName} {candidate.lastName}
                </td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>
                  <a
                    href={candidate.cvLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none"
                  >
                    View CV
                  </a>
                </td>
                <td>{candidate.position || "-"}</td>
                <td>{candidate.status}</td>
                <td>
                  {candidate.createdAt
                    ? new Date(candidate.createdAt).toLocaleString()
                    : "-"}
                </td>
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
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No candidates found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCandidate ? "Edit Candidate" : "Add Candidate"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(errors).length > 0 && (
            <Alert variant="danger">
              Please fix the errors below before saving.
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>CV Link</Form.Label>
              <Form.Control
                type="text"
                name="cvLink"
                value={form.cvLink}
                onChange={handleChange}
                isInvalid={!!errors.cvLink}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cvLink}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                isInvalid={!!errors.position}
              />
              <Form.Control.Feedback type="invalid">
                {errors.position}
              </Form.Control.Feedback>
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
