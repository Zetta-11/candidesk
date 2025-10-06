import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { checkAuthService } from '../services/AuthService';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const user = await checkAuthService();
      if (user) {
        setIsAuthenticated(true);
        setUserRole(user.role);
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
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
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">About</NavLink>
          </li>
        </ul>

        <div className="ms-auto me-3 d-flex align-items-center">
          {isAuthenticated ? (
            <>
              {(userRole === "ROLE_HR" || userRole === "ROLE_ADMIN") && (
                <NavLink className="btn btn-info me-2 text-white" to="/hr">
                  HR Page
                </NavLink>
              )}

              {userRole === "ROLE_ADMIN" && (
                <NavLink className="btn btn-warning me-2" to="/admin">
                  Admin Panel
                </NavLink>
              )}

              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <NavLink className="btn btn-outline-light" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
