import React, { useState } from "react";
import { register } from "../services/RegistrationService";
import { useNavigate } from "react-router-dom";

const RegistrationComponent = () => {
  const [form, setForm] = useState({
    login: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");
  
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      if (err && typeof err === "object" && !Array.isArray(err)) {
        if (err.error) {
          setServerError(err.error);
        } else {
          setErrors(err);
        }
      } 
      else if (typeof err === "string") {
        setServerError(err);
      } 
      else if (err.message) {
        setServerError(err.message);
      } 
      else {
        setServerError("Registration failed");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <form onSubmit={handleRegister}>
        <div className="form-group mb-2">
          <label>Email (Login)</label>
          <input
            type="text"
            name="login"
            className="form-control"
            value={form.login}
            onChange={handleChange}
          />
          {errors.login && <small className="text-danger">{errors.login}</small>}
        </div>

        <div className="form-group mb-2">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>

        <div className="form-group mb-2">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={form.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <small className="text-danger">{errors.firstName}</small>
          )}
        </div>

        <div className="form-group mb-2">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={form.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <small className="text-danger">{errors.lastName}</small>
          )}
        </div>

        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
};

export default RegistrationComponent;
