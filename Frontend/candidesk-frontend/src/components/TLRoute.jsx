import React, { useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap";
import { checkAuthService } from '../services/AuthService';
import AccessDenied from '../components/AccessDenied';

const TLRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isTL, setIsTL] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const user = await checkAuthService();
      if (user && user.role === 'ROLE_TL' || user && user.role === 'ROLE_ADMIN') {
        setIsTL(true);
      } else {
        setIsTL(false);
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

  return isTL ? children : <AccessDenied />;
};

export default TLRoute;
