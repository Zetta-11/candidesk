import React, { useEffect, useState } from "react";
import { getTasks, updateTaskStatus } from "../services/TaskService";
import "bootstrap/dist/css/bootstrap.min.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function TasksBoard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks();
                setTasks(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error(err);
                setTasks([]);
            }
        };
        fetchTasks();
    }, []);

    const grouped = {
        NEW: tasks.filter(t => t.status === "NEW"),
        IN_PROGRESS: tasks.filter(t => t.status === "IN_PROGRESS"),
        COMPLETED: tasks.filter(t => t.status === "COMPLETED"),
    };

    const statusColors = {
        NEW: "warning",
        IN_PROGRESS: "primary",
        COMPLETED: "success",
    };

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (!destination || destination.droppableId === source.droppableId) return;

        try {
            await updateTaskStatus(draggableId, destination.droppableId);
            setTasks(prev =>
                prev.map(task =>
                    task.id.toString() === draggableId
                        ? { ...task, status: destination.droppableId }
                        : task
                )
            );
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    return (
        <div className="container-fluid py-4">
            <h1 className="text-center mb-4">Tasks Board</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="row">
                    {Object.entries(grouped).map(([status, list]) => (
                        <div key={status} className="col-md-4 mb-4">
                            <Droppable droppableId={status}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`card border-${statusColors[status]} h-100`}
                                    >
                                        <div className={`card-header bg-${statusColors[status]} text-white`}>
                                            <h5 className="mb-0">{status.replace("_", " ")}</h5>
                                        </div>
                                        <div className="card-body d-flex flex-column gap-3 min-vh-50">
                                            {list.length === 0 && <p className="text-muted fst-italic">No tasks</p>}
                                            {list.map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`card shadow-sm ${snapshot.isDragging ? "border border-info" : ""}`}>
                                                            <div className="card-body p-3">
                                                                <h6 className="card-title">{task.title}</h6>
                                                                <p className="card-text text-muted">{task.description}</p>
                                                                <ul className="list-unstyled small text-secondary mb-0">
                                                                    <li><strong>User:</strong> {task.assignedToLogin}</li>
                                                                    <li><strong>Candidate:</strong> {task.relatedCandidateEmail || "-"}</li>
                                                                    <li><strong>Vacancy:</strong> {task.relatedVacancyTitle || "-"}</li>
                                                                    <li><strong>Deadline:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleString() : "-"}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}
