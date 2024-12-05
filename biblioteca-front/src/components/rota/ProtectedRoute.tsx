
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {

    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
