import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const isAdmin = user?.role === "admin" || user?.isAdmin === true;

  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  if (location.pathname === "/admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
