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

  const isAdmin = user?.isAdmin === true;

  const handleLogout = useCallback(() => {
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
          {isAuthenticated && (
            <Link to="/home" className="relative group w-16 text-center">
              <Button className="border-0 w-full cursor-pointer">Home</Button>
            </Link>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login" className="relative group w-16 text-center">
                <Button className="border-0 w-full cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to="/register" className="relative group w-20 text-center">
                <Button className="border-0 w-full cursor-pointer">
                  Register
                </Button>
              </Link>
            </>
          )}

          {isAuthenticated && isAdmin && (
            <Link
              to="/admin/dashboard"
              className="relative group w-20 text-center"
            >
              <Button className="border-0 w-full cursor-pointer">
                Dashboard
              </Button>
            </Link>
          )}

          {isAuthenticated && (
            <div className="relative group w-16 text-center">
              <Button
                onClick={handleLogout}
                className="border-0 w-full cursor-pointer"
              >
                Logout
              </Button>
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
