import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { hasRole } from '../utils/roleUtils';

type RoleRouteProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useAppSelector((state: { auth: any; }) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasRole(user?.roles, allowedRoles)) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};

export default RoleRoute;
