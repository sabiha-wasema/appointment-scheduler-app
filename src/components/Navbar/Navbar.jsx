import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.init";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const Navbar = ({ user }) => {
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
  return (
    <div>
      <nav className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">Giga-Tech Limited</div>
          <div className="space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            {/* <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link> */}

            {user ? (
              <>
                <span className="text-white mr-4">Hello, {user.email}</span>
                <button onClick={handleLogout} className="text-white">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-white">
                Login
              </Link>
            )}

            <Link to="/register" className="text-white hover:text-gray-300">
              Register
            </Link>
          </div>
        </div>
      </nav>
      <div className="bg-white border border-1"></div>
    </div>
  );
};

export default Navbar;
