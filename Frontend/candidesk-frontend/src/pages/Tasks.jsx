import React, { useState, useEffect } from "react";
import {
    getTasks,
    createTask,
    updateTsk,
    deleteTask,
} from "../services/TaskService";
import { getCandidates } from "../services/CandidateService";
import { listUsers } from "../services/UserService";
import { getVacancies } from "../services/VacancyService";
import { Modal, Button, Form } from "react-bootstrap";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [vacancies, setVacancies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "NEW",
        relatedCandidateId: "",
        relatedVacancyId: "",
        dueDate: "",
    });

    useEffect(() => {
        loadTasks();
        loadCandidates();
        loadVacancies();
        loadUsers();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    };

    const loadUsers = async () => {
        try {
            const response = await listUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };

    const loadCandidates = async () => {
        try {
            const response = await getCandidates();
            setCandidates(response.data);
        } catch (error) {
            console.error("Error loading candidates:", error);
        }
    };

    const loadVacancies = async () => {
        try {
            const response = await getVacancies();
            setVacancies(response.data);
        } catch (error) {
            console.error("Error loading vacancies:", error);
        }
    };

    const handleShow = (task = null) => {
        if (task) {
            setEditingTask(task);
            setForm({
                title: task.title,
                description: task.description,
                status: task.status,
                relatedCandidateId: task.relatedCandidateId || "",
                relatedVacancyId: task.relatedVacancyId || "",
                assignedToId: task.assignedToId || "",
                dueDate: task.dueDate ? task.dueDate.slice(0, 16) : "",
            });
        } else {
            setEditingTask(null);
            setForm({
                title: "",
                description: "",
                status: "NEW",
                relatedCandidateId: "",
                relatedVacancyId: "",
                assignedToId: "",
                dueDate: "",
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
            const payload = { ...form };
            if (editingTask) {
                await updateTsk(editingTask.id, payload);
            } else {
                await createTask(payload);
            }
            handleClose();
            loadTasks();
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await deleteTask(id);
                loadTasks();
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-3">Tasks Management</h2>
            <Button variant="primary" className="mb-3" onClick={() => handleShow()}>
                Add Task
            </Button>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Assigned to</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Candidate</th>
                        <th>Vacancy</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.assignedToId}</td>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{task.relatedCandidateEmail || "-"}</td>
                            <td>{task.relatedVacancyTitle || "-"}</td>
                            <td>{task.dueDate ? new Date(task.dueDate).toLocaleString() : "-"}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleShow(task)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {tasks.length === 0 && (
                        <tr>
                            <td colSpan="8" className="text-center">
                                No tasks found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingTask ? "Edit Task" : "Add Task"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
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
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Candidate</Form.Label>
                            <Form.Select
                                name="relatedCandidateId"
                                value={form.relatedCandidateId}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Candidate --</option>
                                {candidates.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.email}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-2">
                            <Form.Label>Vacancy</Form.Label>
                            <Form.Select
                                name="relatedVacancyId"
                                value={form.relatedVacancyId}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Vacancy --</option>
                                {vacancies.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.title}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Assigned To</Form.Label>
                            <Form.Select
                                name="assignedToId"
                                value={form.assignedToId || ""}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select User --</option>
                                {users.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.login}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="dueDate"
                                value={form.dueDate || ""}
                                onChange={handleChange}
                            />
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

export default Tasks;
