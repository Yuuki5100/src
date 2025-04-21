import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, user } = useAppSelector((state: { auth: any; }) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user?.isAdmin) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default AdminRoute;
