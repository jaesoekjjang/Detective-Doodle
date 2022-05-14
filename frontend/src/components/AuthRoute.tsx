import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenAtom } from '../recoil/authAtom';

interface AuthRouteProps {
  children: JSX.Element;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const token = useRecoilValue(tokenAtom);

  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default AuthRoute;
