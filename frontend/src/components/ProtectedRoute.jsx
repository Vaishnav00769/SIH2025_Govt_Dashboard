import React from 'react';
import Login from './Login';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
  
  if (!isLoggedIn) {
    return <Login />;
  }
  
  return children;
};

export default ProtectedRoute;