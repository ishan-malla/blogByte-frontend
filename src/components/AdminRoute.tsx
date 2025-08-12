import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const isAdmin = user?.role === "admin" || user?.isAdmin === true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
