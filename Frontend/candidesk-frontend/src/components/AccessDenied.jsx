import React from 'react';
import { NavLink } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/565/565547.png" 
        alt="Access Denied" 
        style={{ width: '200px', marginBottom: '30px' }}
      />
      <h1 className="mb-3">Access Denied</h1>
      <p className="mb-4">You don’t have permission to view this page.<br/>Please contact your administrator.</p>
      <NavLink to="/home" className="btn btn-primary">Go to Home</NavLink>
    </div>
  );
};

export default AccessDenied;
