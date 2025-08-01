import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <>
      <nav className="w-full p-2 px-4 flex text-white md:flex-row md:justify-evenly md:items-center bg-[#1A1A1A] h-14">
        <div className="flex items-center gap-4 w-full md:w-1/2 md:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-200 font-slab">
            BlogByte
          </h1>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          {["/home", "/login", "/register"].map((path, idx) => {
            const labels = ["Home", "Login", "Register"];
            return (
              <Link
                key={path}
                to={path}
                className="relative group w-16 text-center"
              >
                <Button className="border-0 w-full">{labels[idx]}</Button>
                <span className="absolute left-2 -bottom-0 h-0.5 bg-white w-0 transition-all duration-300 group-hover:w-[80%]"></span>
              </Link>
            );
          })}
          <Button>
            <Search size={38} color="#ffffff" absoluteStrokeWidth />
          </Button>
        </div>
      </nav>

      <div className="hidden md:block w-full h-6 bg-[#2B2B2B]">
        {/* Add your desktop content here */}
      </div>
    </>
  );
};

export default Navbar;
