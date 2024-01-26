import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const {isLoggedIn}=useAppContext();

  return (
    <div className="bg-blue-800 py-6 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/" className="text-white">
            FabHotel.com
          </Link>
        </span>
        {isLoggedIn ? (
  <>
    <Link to="/my-bookings">My Bookings</Link>
    <Link to="/my-hotels">My Hotels</Link>
    <button>Sign out</button>
  </>
) : (
  <span className="flex space-x-2">
    <Link
      to="/sign-in"
      className="text-blue-600 font-bold bg-white px-4 py-2 rounded hover:bg-gray-700"
    >
      Sign In
    </Link>
  </span>
)}
       
      </div>
    </div>
  );
};

export default Header;
