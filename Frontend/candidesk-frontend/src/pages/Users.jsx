import React, { useState, useEffect } from 'react';
import { listUsers, updateUserRequest, createUserRequest } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { checkAuthService } from '../services/AuthService'; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false); // нове для створення
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const allRoles = ["USER", "ADMIN", "HR", "TL"];

  useEffect(() => {
    const verifyLogin = async () => {
      const isLoggedIn = await checkAuthService(); 
      if (!isLoggedIn) {
        navigate("/login");
      } else {
        getAllUsers();
      }
    };
    verifyLogin();
  }, [navigate]);

  const getAllUsers = () => {
    listUsers()
      .then((r) => setUsers(r.data))
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      });
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsCreating(false);
    setErrors({});
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingUser({ login: '', password: '', firstName: '', lastName: '', role: 'USER' });
    setIsCreating(true);
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setShowModal(false);
    setErrors({});
  };

  const handleChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setEditingUser({ ...editingUser, role: e.target.value });
  };

  const handleSave = () => {
    setErrors({});
    const request = isCreating
      ? createUserRequest(editingUser)
      : updateUserRequest(editingUser.id, editingUser);

    request
      .then(() => {
        getAllUsers();
        closeModal();
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data) {
          setErrors(err.response.data);
        } else {
          setErrors({ general: 'Something went wrong!' });
        }
      });
  };

  return (
    <div className="container">
      <h1 className='text-center'>List of users</h1>
      <button className="btn btn-success mb-3" onClick={openCreateModal}>Add User</button>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Login</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.login}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.role}</td>
              <td>
                <button className='btn btn-info' onClick={() => openEditModal(u)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && editingUser && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isCreating ? 'Create User' : `Edit User: ${editingUser.login}`}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                <div className="mb-3">
                  <label className="form-label">Login</label>
                  <input
                    type="text"
                    className={`form-control ${errors.login ? 'is-invalid' : ''}`}
                    name="login"
                    value={editingUser.login || ''}
                    onChange={handleChange}
                    disabled={!isCreating} // не змінюємо логін при редагуванні
                  />
                  {errors.login && <div className="invalid-feedback">{errors.login}</div>}
                </div>
                {isCreating && (
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      name="password"
                      value={editingUser.password || ''}
                      onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    name="firstName"
                    value={editingUser.firstName || ''}
                    onChange={handleChange}
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    name="lastName"
                    value={editingUser.lastName || ''}
                    onChange={handleChange}
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                    value={editingUser.role || ""}
                    onChange={handleRoleChange}>
                    {allRoles.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {isCreating ? 'Create' : 'Save changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
