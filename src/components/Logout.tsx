// src/components/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../features/auth/authApi";
import { useAppDispatch } from "../hooks/redux";
import { logout } from "../features/auth/authSlice"; // Import the logout action

const Logout = () => {
  const [logoutApi] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutApi().unwrap();
      } finally {
        // Always clear the auth state and redirect
        dispatch(logout()); // Use the logout action
        navigate("/login");
      }
    };

    performLogout();
  }, [logoutApi, dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p>Logging out...</p>
      </div>
    </div>
  );
};

export default Logout;
