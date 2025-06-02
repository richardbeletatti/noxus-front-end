import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  console.log('PrivateRoute -> token:', token);
  console.log('PrivateRoute -> role:', role);
  console.log('PrivateRoute -> roleRequired:', roleRequired);

  if (!token) {
    console.log('Redirecionando para login');
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && role?.toLowerCase() !== roleRequired.toLowerCase()) {
    console.log('Redirecionando para unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
