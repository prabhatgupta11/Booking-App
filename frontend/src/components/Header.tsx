import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/" className="text-white">
            FabHotel.com
          </Link>
        </span>

        <span className="flex space-x-2">
          <Link
            to="/sign-in"
            className="text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
