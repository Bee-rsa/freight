import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Header = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setIsDropdownOpen((prev) => (prev === menu ? null : menu));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-custom-blue py-2 w-full fixed top-0 left-0 z-50 font-poppins">
      <div className="flex items-center justify-between px-4 max-w-screen-xl mx-auto">
        <div className="text-2xl text-white font-extrabold tracking-tight">
          <Link to="/">Freight iT</Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>

        {/* Mobile Menu Slide-in */}
        <div
          className={`fixed inset-0 bg-custom-blue transition-transform transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
          style={{ zIndex: 100, right: 0 }}
        >
          <nav className="flex flex-col p-4 space-y-2">
            <Link className="text-white hover:text-gray-400 transition duration-300" to="/products">Products</Link>
            <hr className="border-t border-gray-400" />
            <Link className="text-white hover:text-gray-400 transition duration-300" to="/business/hub">Business Hub</Link>
            <hr className="border-t border-gray-400" />
            <Link className="text-white hover:text-gray-400 transition duration-300" to="/resources/docs">Resources</Link>
            <hr className="border-t border-gray-400" />
            <Link className="text-white hover:text-gray-400 transition duration-300" to="/company/about">Company</Link>
            {isLoggedIn ? (
              <button onClick={logout} className="text-white hover:text-gray-400 transition duration-300">Sign Out</button>
            ) : (
              <>
                <Link to="/register" className="text-white hover:text-gray-400 transition duration-300">Register</Link>
                <Link to="/login" className="text-white hover:text-gray-400 transition duration-300">Sign In</Link>
              </>
            )}
          </nav>
          <button
            className="absolute top-4 right-4 text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-4">
          {/* Dropdown for Products */}
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 flex items-center"
              onClick={() => toggleDropdown('products')}
            >
              Products
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 10l6 6 6-6"
                ></path>
              </svg>
            </button>
            {isDropdownOpen === 'products' && (
              <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/products/item1">
                  Product 1
                </Link>
                <hr className="border-t border-gray-400" />
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/products/item2">
                  Product 2
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown for Business Hub */}
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 flex items-center"
              onClick={() => toggleDropdown('business')}
            >
              Business Hub
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 10l6 6 6-6"
                ></path>
              </svg>
            </button>
            {isDropdownOpen === 'business' && (
              <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/business/hub">
                  Business Login in
                </Link>
                <hr className="border-t border-gray-400" />
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/business/resources">
                  Trucking
                </Link>
                <hr className="border-t border-gray-400" />
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/business/resources">
                  Courier Services
                </Link>
                <hr className="border-t border-gray-400" />
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/business/resources">
                  Ocean Freight
                </Link>
                <hr className="border-t border-gray-400" />
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/business/resources">
                  Air Freight
                </Link>
                <hr className="border-t border-gray-400" />
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/business/resources">
                  Rail Freight
                </Link>
                <hr className="border-t border-gray-400" />
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/business/resources">
                  Warehousing
                </Link>
                <hr className="border-t border-gray-400" />
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/business/resources">
                  Operations
                </Link>
                <hr className="border-t border-gray-400" />
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/business/resources">
                  Freight Forwarders
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown for Resources */}
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 flex items-center"
              onClick={() => toggleDropdown('resources')}
            >
              Resources
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 10l6 6 6-6"
                ></path>
              </svg>
            </button>
            {isDropdownOpen === 'resources' && (
              <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/resources/docs">
                  Guides
                </Link>
                <hr className="border-t border-gray-400" />
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/resources/tutorials">
                  Blog
                </Link>
                <hr className="border-t border-gray-400" />
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/resources/tutorials">
                  FAQs
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown for Company */}
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 flex items-center"
              onClick={() => toggleDropdown('company')}
            >
              Company
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 10l6 6 6-6"
                ></path>
              </svg>
            </button>
            {isDropdownOpen === 'company' && (
              <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/company/about">
                  About Us
                </Link>
                <hr className="border-t border-gray-400" />
                <Link className="block px-4 py-1 text-black hover:bg-gray-100" to="/company/contact">
                  Contact
                </Link>
              </div>
            )}
          </div>

          {/* Sign In / Sign Out */}
          {isLoggedIn ? (
            <button onClick={logout} className="text-white hover:text-gray-400 transition duration-300">Sign Out</button>
          ) : (
            <>
              <Link to="/pricing" className="text-white hover:text-gray-400 transition duration-300">Pricing</Link>
              <Link to="/logins" className="bg-custom-sage text-white font-semibold rounded-lg px-4 py-2 text-base hover:bg-custom-sage transition duration-300 mx-4">Sign In</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
