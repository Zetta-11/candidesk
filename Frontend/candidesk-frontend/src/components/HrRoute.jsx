import React, { useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap";
import { checkAuthService } from '../services/AuthService';
import AccessDenied from '../components/AccessDenied';

const HrRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isHr, setIsHr] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const user = await checkAuthService();
      if (user && user.role === 'ROLE_HR' || user && user.role === 'ROLE_ADMIN') {
        setIsHr(true);
      } else {
        setIsHr(false);
      }
      setLoading(false);
    };
    checkRole();
  }, []);

  if (loading)
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  return isHr ? children : <AccessDenied />;
};

export default HrRoute;
