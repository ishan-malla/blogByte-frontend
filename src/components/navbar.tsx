import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { useCallback } from "react";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Check if user is admin
  const isAdmin = user?.role === "admin" || user?.isAdmin === true;

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <>
      <nav className="w-full p-2 px-4 flex text-white md:flex-row md:justify-evenly md:items-center bg-[#1A1A1A] h-14">
        <div className="flex items-center gap-4 w-full md:w-1/2 md:px-8">
          <Link to="/">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-200 font-slab">
              BlogByte
            </h1>
          </Link>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          {/* Regular navigation links */}
          {["/home", "/login", "/register"].map((path, idx) => {
            const labels = ["Home", "Login", "Register"];

            // Hide login/register if user is authenticated
            if (
              isAuthenticated &&
              (path === "/login" || path === "/register")
            ) {
              return null;
            }

            return (
              <Link
                key={path}
                to={path}
                className="relative group w-16 text-center"
              >
                <Button className="border-0 w-full cursor-pointer">
                  {labels[idx]}
                </Button>
                <span className="absolute left-2 -bottom-0 h-0.5 bg-white w-0 transition-all duration-300 group-hover:w-[80%]"></span>
              </Link>
            );
          })}

          {/* Admin Dashboard - only show if user is admin */}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin/dashboard"
              className="relative group w-20 text-center"
            >
              <Button className="border-0 w-full cursor-pointer">
                Dashboard
              </Button>
              <span className="absolute left-2 -bottom-0 h-0.5 bg-white w-0 transition-all duration-300 group-hover:w-[80%]"></span>
            </Link>
          )}

          {/* Logout button if authenticated */}
          {isAuthenticated && (
            <div className="relative group w-16 text-center">
              <Button
                onClick={handleLogout}
                className="border-0 w-full cursor-pointer"
              >
                Logout
              </Button>
              <span className="absolute left-2 -bottom-0 h-0.5 bg-white w-0 transition-all duration-300 group-hover:w-[80%]"></span>
            </div>
          )}

          <Button>
            <Search size={38} color="#ffffff" absoluteStrokeWidth />
          </Button>
        </div>
      </nav>

      <div className="hidden md:block w-full h-6 bg-[#2B2B2B]"></div>
    </>
  );
};

export default Navbar;
