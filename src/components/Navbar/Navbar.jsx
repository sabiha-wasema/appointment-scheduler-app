import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-slate-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
          Giga-Tech Limited 
          </div>
          <div className="space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-gray-300">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
