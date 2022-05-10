import React from 'react';
import { Navigate } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';

interface AuthRouteProps {
  children: JSX.Element;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const [token] = useLocalStorage('token');

  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default AuthRoute;
