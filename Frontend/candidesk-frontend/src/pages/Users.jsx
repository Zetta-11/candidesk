import React, { useState, useEffect } from 'react';
import { listUsers, deleteUser, updateUserRequest } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { checkAuthService } from '../services/AuthService'; 

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

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

  const removeUser = (id) => {
    deleteUser(id)
      .then(() => getAllUsers())
      .catch(err => console.error(err));
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setShowModal(false);
  };

  const handleChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const allRoles = ["USER", "ADMIN", "HR", "TL"];

  const handleRoleChange = (e) => {
    setEditingUser({ ...editingUser, role: e.target.value });
  };

  const handleUpdate = () => {
    updateUserRequest(editingUser.id, editingUser)
      .then(() => {
        getAllUsers();
        closeModal();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h1 className='text-center'>List of users</h1>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
          <th>ID</th>
            <th>User Login</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Roles</th>
            <th>Vacancies</th>
            <th>Interviews</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.login}>
              <td>{u.id}</td>
              <td>{u.login}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.role}</td>
              <td>{u.vacancies.length}</td>
              <td>{u.interviews.length}</td>
              <td>
                <button className='btn btn-info me-2' onClick={() => openEditModal(u)}>Update</button>
                <button className='btn btn-danger' onClick={() => removeUser(u.id)}>Delete</button>
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
                <h5 className="modal-title">Edit User: {editingUser.login}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={editingUser.firstName || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={editingUser.lastName || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={editingUser.role || ""}
                    onChange={handleRoleChange}>
                    {allRoles.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UsersComponent;