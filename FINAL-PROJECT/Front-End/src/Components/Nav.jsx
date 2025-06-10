
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="w-full bg-gray-900 text-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-2xl font-bold text-yellow-400">
            MyApp
          </div>

          <div className="hidden md:flex space-x-6 text-sm">
            <Link to="/Register" className="hover:text-yellow-400 transition">
              Register
            </Link>
            <Link to="/Dashboard" className="hover:text-yellow-400 transition">
              Dashboard
            </Link>
            <Link to="/Addproduct" className="hover:text-yellow-400 transition">
              Add Product
            </Link>
            <Link to="/ShowData" className="hover:text-yellow-400 transition">
              Show Data
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
