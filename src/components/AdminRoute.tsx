// src/components/AdminRoute.tsx
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Check if user is admin
  const isAdmin = user?.role === "admin" || user?.isAdmin === true;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    // Redirect to home if not admin
    return <Navigate to="/home" replace />;
  }

  // Render the protected component if user is admin
  return <>{children}</>;
};

export default AdminRoute;
