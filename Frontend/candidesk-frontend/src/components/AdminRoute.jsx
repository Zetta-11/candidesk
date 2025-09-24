import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuthService } from '../services/AuthService';
import AccessDenied from '../components/AccessDenied';

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const user = await checkAuthService();
      if (user && user.role === 'ROLE_ADMIN') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };
    checkRole();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return isAdmin ? children : <AccessDenied />;
};

export default AdminRoute;
