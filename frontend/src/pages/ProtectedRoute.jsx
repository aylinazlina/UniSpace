import React from 'react';
import { Navigate } from 'react-router-dom';

// Updated to use direct localStorage check instead of importing from auth.js
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
  };

  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;