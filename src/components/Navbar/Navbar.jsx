import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-700">
            Doctor's Appointment 
          </div>
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
