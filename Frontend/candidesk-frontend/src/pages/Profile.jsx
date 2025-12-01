import React, { useEffect, useState } from "react";
import { getProfile } from "../services/ProfileService";
import { Card, Spinner, Alert, Button, Row, Col, Badge } from "react-bootstrap";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getProfile()
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Error while uploading profile");
                setLoading(false);
            });
    }, []);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className="container mt-5">

            <Card className="shadow p-4 mb-4">
                <Row className="align-items-center">
                    <Col md={3} className="text-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                            alt="avatar"
                            className="rounded-circle"
                            width="140"
                            height="140"
                        />
                    </Col>
                    <Col md={9}>
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p className="text-muted">@{user.login}</p>
                        <Badge bg="primary" className="px-3 py-2 fs-6">
                            {user.role}
                        </Badge>
                    </Col>
                </Row>
            </Card>

            <Card className="shadow-sm p-4 mb-4">
                <h4 className="mb-3">Account Details</h4>
                <Row>
                    <Col md={6}>
                        <p><strong>User ID:</strong> {user.id}</p>
                        <p><strong>Login:</strong> {user.login}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Role:</strong> {user.role}</p>
                    </Col>
                </Row>
            </Card>

            <Card className="shadow-sm p-4 mb-4">
                <h4 className="mb-3">Personal Information</h4>
                <Row>
                    <Col md={6}>
                        <p><strong>First Name:</strong> {user.firstName}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Last Name:</strong> {user.lastName}</p>
                    </Col>
                </Row>
            </Card>

            <Card className="shadow-sm p-4">
                <h4 className="mb-3">Actions</h4>

                <div className="d-flex justify-content-between">
                    <Button variant="primary" className="px-4" href="/change-password">
                        Change Password
                    </Button>

                    <Button variant="danger" className="px-4">
                        Delete Account
                    </Button>
                </div>
            </Card>

        </div>
    );
};

export default ProfilePage;
