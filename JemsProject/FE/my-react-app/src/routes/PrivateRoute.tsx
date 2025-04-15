import React from 'react';
import { useAppSelector } from '../hooks';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactElement;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
