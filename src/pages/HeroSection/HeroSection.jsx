import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div>
      {/*  Hero section  */}
      <div className="container mx-auto px-4 py-20 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Welcome to the Giga-Tech Limited
        </h1>
        <p className="text-lg text-gray-600 mb-7 text-center">
          Manage and schedule appointments with ease. Join us now!
        </p>
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-700 transition">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
