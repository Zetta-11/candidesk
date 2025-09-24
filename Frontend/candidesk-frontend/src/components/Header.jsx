import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { checkAuthService } from '../services/AuthService';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await checkAuthService();
      setIsAuthenticated(loggedIn);
    };
    checkLogin();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <NavLink className="navbar-brand ms-3" to="/home">CANDIDESK</NavLink>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item"><NavLink className="nav-link" to="/home">Home</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/users">All Users</NavLink></li>
        </ul>
        <div className="ms-auto me-3">
          {isAuthenticated ? (
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink className="btn btn-outline-light" to="/login">Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;