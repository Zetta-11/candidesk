import React, { useState, useEffect } from "react";
import { getAllLogs, clearAllLogs } from "../services/LogService";
import { Modal, Button, Table } from "react-bootstrap";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const response = await getAllLogs();
      setLogs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error loading logs:", error);
      setLogs([]);
    }
    setLoading(false);
  };

  const handleClearLogs = async () => {
    if (window.confirm("Are you sure you want to delete all logs?")) {
      try {
        await clearAllLogs();
        setLogs([]);
      } catch (error) {
        console.error("Error clearing logs:", error);
      }
    }
  };

  const handleShowModal = (log) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedLog(null);
    setShowModal(false);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">System Logs</h2>
      <Button
        variant="danger"
        className="mb-3"
        onClick={handleClearLogs}
      >
        Clear All Logs
      </Button>

      {loading ? (
        <p>Loading logs...</p>
      ) : logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.createdAt}</td>
                <td>{log.userLogin || "SYSTEM"} - {log.actionType}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleShowModal(log)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Log Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLog ? (
            <div>
              <p><strong>ID:</strong> {selectedLog.id}</p>
              <p><strong>Timestamp:</strong> {selectedLog.createdAt}</p>
              <p><strong>Message:</strong> {selectedLog.userLogin || "SYSTEM"} - {selectedLog.actionType}</p>
            </div>
          ) : (
            <p>No log selected.</p>
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

export default LogsPage;
