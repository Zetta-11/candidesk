import { React, useEffect, useState } from "react";
import {
    getVacancies,
    createVacancy,
    updateVacancy,
    deleteVacancy,
} from "../services/VacancyService";
import { listUsers } from "../services/UserService";
import { getCandidates } from "../services/CandidateService";
import { getTasks } from "../services/TaskService";
import { Modal, Button, Form } from "react-bootstrap";

const Vacancies = () => {
    const [vacancies, setVacancies] = useState([]);
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingVacancy, setEditingVacancy] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        requirements: "",
        createdById: "",
        candidateIds: [],
        taskIds: [],
    });

    useEffect(() => {
        loadVacancies();
        loadUsers();
        loadCandidates();
        loadTasks();
    }, []);

    const loadVacancies = async () => {
        try {
            const res = await getVacancies();
            setVacancies(res.data);
        } catch (err) {
            console.error("Error loading vacancies", err);
        }
    };

    const loadTasks = async () => {
        try {
            const res = await getTasks();
            setTasks(res.data);
        } catch (err) {
            console.error("Error loading tasks", err);
        }
    };

    const loadUsers = async () => {
        try {
            const res = await listUsers();
            setUsers(res.data);
        } catch (err) {
            console.error("Error loading users", err);
        }
    };

    const loadCandidates = async () => {
        try {
            const res = await getCandidates();
            setCandidates(res.data);
        } catch (err) {
            console.error("Error loading candidates", err);
        }
    };

    const handleShow = (vacancy = null) => {
        setEditingVacancy(vacancy);
        if (vacancy) {
            setFormData({
                title: vacancy.title,
                description: vacancy.description,
                requirements: vacancy.requirements,
                createdById: vacancy.createdById || "",
                candidateIds: vacancy.candidates?.map((c) => c.id) || [],
                taskIds: vacancy.tasks?.map((t) => t.id) || [],
            });
        } else {
            setFormData({
                title: "",
                description: "",
                requirements: "",
                createdById: "",
                candidateIds: [],
                taskIds: [],
            });
        }
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleMultiSelectChange = (e, field) => {
        const selected = Array.from(
            e.target.selectedOptions,
            (option) => Number(option.value)
        );
        setFormData((prev) => ({ ...prev, [field]: selected }));
    };

    const handleSave = async () => {
        try {
            const payload = {
                title: formData.title,
                description: formData.description,
                requirements: formData.requirements,
                createdById: formData.createdById ? Number(formData.createdById) : null,
                candidateIds: formData.candidateIds,
                taskIds: formData.taskIds || [],
            };

            if (editingVacancy) {
                payload.taskIds = formData.taskIds;
                await updateVacancy(editingVacancy.id, payload);
            } else {
                await createVacancy(payload);
            }

            await loadVacancies();
            handleClose();
        } catch (err) {
            console.error("Error saving vacancy", err);
        }
    };


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this vacancy?")) {
            try {
                await deleteVacancy(id);
                await loadVacancies();
            } catch (err) {
                console.error("Error deleting vacancy", err);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Vacancies</h2>
            <Button variant="success" className="mb-3" onClick={() => handleShow()}>
                + Add Vacancy
            </Button>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Requirements</th>
                        <th>Created By</th>
                        <th>Candidates</th>
                        <th>Tasks</th>
                        <th>Created At</th>
                        <th style={{ width: "180px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vacancies.map((v) => {
                        const vacancyCandidates = candidates.filter(c => v.candidateIds?.includes(c.id));
                        const vacancyTasks = tasks.filter(t => v.taskIds?.includes(t.id));

                        return (
                            <tr key={v.id ?? v.title}>
                                <td>{v.title}</td>
                                <td>{v.description}</td>
                                <td>{v.requirements}</td>
                                <td>{users.find(u => u.id === v.createdById)?.login}</td>
                                <td>{vacancyCandidates.map(c => c.email).join(", ")}</td>
                                <td>{vacancyTasks.map(t => t.title).join(", ")}</td>
                                <td>{v.createdAt ? new Date(v.createdAt).toLocaleString() : ""}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleShow(v)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(v.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingVacancy ? "Edit Vacancy" : "Add Vacancy"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter vacancy title"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Requirements</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Created By</Form.Label>
                            <Form.Select
                                name="createdById"
                                value={formData.createdById}
                                onChange={handleChange}
                            >
                                <option value="">Select user</option>
                                {users.map((u) => (
                                    <option key={u.id ?? u.login} value={u.id}>
                                        {u.login}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Candidates</Form.Label>
                            <Form.Select
                                multiple
                                value={formData.candidateIds}
                                onChange={(e) => handleMultiSelectChange(e, "candidateIds")}
                            >
                                {candidates.map((c) => (
                                    <option key={c.id ?? c.email} value={c.id}>
                                        {c.firstName} {c.lastName} ({c.email})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        {editingVacancy && (
                            <Form.Group className="mb-3">
                                <Form.Label>Tasks</Form.Label>
                                <Form.Select
                                    multiple
                                    value={formData.taskIds}
                                    onChange={(e) => handleMultiSelectChange(e, "taskIds")}
                                >
                                    {tasks.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.title}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )}
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

export default Vacancies;
