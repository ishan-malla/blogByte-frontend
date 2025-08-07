import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../features/auth/authApi";
import { useAppDispatch } from "../hooks/redux";
import { setCredentials } from "../features/auth/authSlice";

const Logout = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout().unwrap();
      } catch (error) {
        // Handle logout error if needed
        console.error("Logout error:", error);
      }

      // Clear credentials regardless of logout API success/failure
      dispatch(setCredentials(null));
      navigate("/login");
    };

    doLogout();
  }, [logout, dispatch, navigate]);

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
