import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.init";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">Giga-Tech Limited</div>
          <div className="hidden md:flex justify-between items-center gap-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            {user ? (
              <div className="flex items-center">
                <p className="text-white mr-4">
                  Hello, <span className="bg-blue-600 text-white px-2 py-1 rounded-lg">{user.email}</span>
                </p>
                <button onClick={handleLogout} className="text-white">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            )}
            <Link to="/register" className="text-white hover:text-gray-300">
              Register
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              ☰
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="bg-gradient-to-r text-center from-green-500 to-teal-500 text-white p-4 md:hidden">
          <Link to="/" className="block text-white hover:text-gray-300 mb-2">
            Home
          </Link>
          {user ? (
            <div className="flex flex-col">
              <p className="text-white mb-2">
                Hello, <span className="bg-blue-600 text-white px-2 py-1 rounded-lg">{user.email}</span>
              </p>
              <button onClick={handleLogout} className="text-white mb-2">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="block text-white hover:text-gray-300 mb-2">
              Login
            </Link>
          )}
          <Link to="/register" className="block text-white hover:text-gray-300">
            Register
          </Link>
        </div>
      )}
      <div className="bg-white border border-1"></div>
    </div>
  );
};

export default Navbar;
