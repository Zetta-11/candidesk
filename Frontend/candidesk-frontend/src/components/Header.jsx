import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout, checkAuthService } from '../services/AuthService';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyLogin = async () => {
      const loggedIn = await checkAuthService();
      setIsAuthenticated(loggedIn);
    };
    verifyLogin();
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header>
      <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
        <a className="navbar-brand ms-3" href="https://www.instagram.com">CANDIDESK</a>
        <div className='collapse navbar-collapse' id="navbarNav">
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/home'>Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/about'>About</NavLink>
            </li>
          </ul>
          <div className="ms-auto">
            {isAuthenticated ? (
              <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
            ) : (
              <NavLink className="btn btn-outline-light" to="/login">Login</NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;