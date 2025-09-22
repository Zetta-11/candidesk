import React, { useState, useEffect } from 'react';
import { listUsers } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { checkAuthService } from '../services/AuthService'; 

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
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

  return (
    <div className="container">
      <h1 className='text-center'>List of users</h1>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>User Login</th>
            <th>User first name</th>
            <th>User last name</th>
            <th>User vacancies</th>
            <th>User interviews</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.login}>
              <td>{u.login}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.vacancies}</td>
              <td>{u.interviews}</td>
              <td>
                <button className='btn btn-info me-2' onClick={() => updateUser(u.id)}>Update</button>
                <button className='btn btn-danger' onClick={() => removeUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersComponent;
