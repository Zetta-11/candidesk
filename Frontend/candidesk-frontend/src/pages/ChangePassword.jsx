import React, { useState } from "react";
import { Card, Form, Button, Alert, ProgressBar } from "react-bootstrap";
import { changePassword } from "../services/ChangePasswordService";

const ChangePasswordPage = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;

    const getStrength = () => {
        let score = 0;
        if (newPassword.length >= 8) score++;
        if (/[A-Z]/.test(newPassword)) score++;
        if (/[a-z]/.test(newPassword)) score++;
        if (/[0-9]/.test(newPassword)) score++;
        if (/[@#$%^&+=]/.test(newPassword)) score++;
        if (!/\s/.test(newPassword)) score++;
        return score;
    };

    const strength = getStrength();
    const strengthText = ["Very weak","Weak","Medium","Strong","Very strong","Excellent"];
    const strengthColor = ["#dc3545","#ff7675","#f1c40f","#2ecc71","#27ae60","#0f5132"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!passwordRegex.test(newPassword)) {
            setError("Password must be at least 8 characters, include uppercase, lowercase, digit, special character, and no spaces.");
            return;
        }

        setLoading(true);

        try {
            await changePassword(oldPassword, newPassword);
            setSuccess("Password successfully changed!");
            setOldPassword("");
            setNewPassword("");
        } catch (err) {
            setError(err.response?.data || "Error while changing password");
        }

        setLoading(false);
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "600px" }}>
            <Card className="shadow p-4">
                <h3 className="text-center mb-4 fw-bold">Change Password</h3>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Enter old password"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />

                        {newPassword && (
                            <div className="mt-2">
                                <ProgressBar
                                    now={(strength/6)*100}
                                    variant="success"
                                    animated
                                />
                                <small style={{ color: strengthColor[strength-1] }}>
                                    {strengthText[strength-1]}
                                </small>
                            </div>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 py-2 fw-bold" disabled={loading}>
                        {loading ? "Saving..." : "Change Password"}
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default ChangePasswordPage;
