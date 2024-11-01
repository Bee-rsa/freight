
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { FaBox, FaBuilding, FaBook, FaInfoCircle, FaAngleRight, FaAngleDown } from "react-icons/fa";

const Header = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [expandedLink, setExpandedLink] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleDropdown = (menu) => {
    setIsDropdownOpen((prev) => (prev === menu ? null : menu));
    setExpandedLink(prev => (prev === menu ? null : menu)); 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu(); // Close the mobile menu if it is open
    }
  };

  const toggleSublinks = (link) => {
    setExpandedLink((prev) => (prev === link ? null : link));
  };

  return (
    <header className="bg-custom-blue py-2 w-full fixed top-0 left-0 z-50 font-poppins">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
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
            className={`fixed inset-0 bg-custom-blue overflow-y-auto max-h-[150vh] transition-transform transform ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } md:hidden`}
            
            style={{ zIndex: 100, right: 0 }}
          >
            <nav className="flex flex-col p-6 space-y-4 ">
              {/* Products Link */}
              
      <div>
      <div className="text-2xl text-white -mt-2 font-extrabold tracking-tight">
            <Link to="/">Freight iT</Link>
          </div>
        <div
          className="flex items-center justify-between space-x-2 text-white bg-gray-800 hover:bg-gray-700 rounded-md p-3 transition duration-300 font-poppins mt-8 text-xl font-semibold cursor-pointer"
          onClick={() => toggleSublinks("products")}
        >
          <div className="flex items-center">
            <FaBox className="text-white mr-2" />
            <span>Products</span>
          </div>
          {expandedLink === "products" ? (
            <FaAngleDown className="text-white" />
          ) : (
            <FaAngleRight className="text-white" />
          )}
        </div>
        {expandedLink === "products" && (
          <div className="ml-6 mt-0 space-y-2 flex flex-col">
            <Link to="/products/item1" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Item 1</Link>
            <Link to="/products/item2" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Item 2</Link>
            <Link to="/products/item3" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Item 3</Link>
          </div>
        )}
      </div>

              {/* Business Hub Link */}
      <div>
        <div
          className="flex items-center justify-between space-x-2 text-white bg-gray-800 hover:bg-gray-700 rounded-md p-3 transition duration-300 font-poppins text-xl font-semibold cursor-pointer"
          onClick={() => toggleSublinks("businessHub")}
        >
          <div className="flex items-center">
            <FaBuilding className="text-white mr-2" />
            <span>Business Hub</span>
          </div>
          {expandedLink === "businessHub" ? (
            <FaAngleDown className="text-white" />
          ) : (
            <FaAngleRight className="text-white" />
          )}
        </div>
        {expandedLink === "businessHub" && (
          <div className="ml-6 mt-2 space-y-2 flex flex-col">
            <Link to="/business/hub/subitem1" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Login in</Link>
            <Link to="/business/hub/subitem2" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Trucking</Link>
            <Link to="/business/hub/subitem1" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Courier Services</Link>
            <Link to="/business/hub/subitem2" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Ocean Freight</Link>
            <Link to="/business/hub/subitem1" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Air Freight</Link>
            <Link to="/business/hub/subitem2" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Rail Freight</Link>
            <Link to="/business/hub/subitem1" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Warehousing</Link>
            <Link to="/business/hub/subitem2" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Operations</Link>
            <Link to="/business/hub/subitem1" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Freight Forwarders</Link>
          </div>
        )}
      </div>
              {/* Resources Link */}
      <div>
        <div
          className="flex items-center justify-between space-x-2 text-white bg-gray-800 hover:bg-gray-700 rounded-md p-3 transition duration-300 font-poppins text-xl font-semibold cursor-pointer"
          onClick={() => toggleSublinks("resources")}
        >
          <div className="flex items-center">
            <FaBook className="text-white mr-2" />
            <span>Resources</span>
          </div>
          {expandedLink === "resources" ? (
            <FaAngleDown className="text-white" />
          ) : (
            <FaAngleRight className="text-white" />
          )}
        </div>
        {expandedLink === "resources" && (
          <div className="ml-6 mt-2 space-y-2 flex flex-col">
            <Link to="/resources/docs/doc1" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Guides</Link>
            <Link to="/blog" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Blog</Link>
            <Link to="/resources/docs/doc1" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Market Updates</Link>
            <Link to="/resources/docs/doc2" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Research</Link>
            <Link to="/resources/docs/doc1" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Case Study</Link>
          </div>
        )}
      </div>
              {/* Company Link */}
      <div>
        <div
          className="flex items-center justify-between space-x-2 text-white bg-gray-800 hover:bg-gray-700 rounded-md p-3 transition duration-300 font-poppins text-xl font-semibold cursor-pointer"
          onClick={() => toggleSublinks("company")}
        >
          <div className="flex items-center">
            <FaInfoCircle className="text-white mr-2" />
            <span>Company</span>
          </div>
          {expandedLink === "company" ? (
            <FaAngleDown className="text-white" />
          ) : (
            <FaAngleRight className="text-white" />
          )}
        </div>
        {expandedLink === "company" && (
          <div className="ml-6 mt-2 space-y-2 flex flex-col">
            <Link to="/about-us" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>About Us</Link>
            <Link to="/privacy-policy" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="text-custom-sage hover:text-gray-400 transition duration-300 text-lg font-poppins" onClick={handleLinkClick}>Terms & Conditions</Link>
          </div>
        )}
      </div>
              {isLoggedIn ? (
                <button onClick={logout} className="text-white hover:text-gray-400 transition duration-300">Sign Out</button>
              ) : (
                <>
                  <Link to="/pricing" className="flex items-center justify-between space-x-2 text-white bg-gray-800 hover:bg-gray-700 rounded-md p-3 transition duration-300 font-poppins mt-8 text-xl font-semibold cursor-pointer">Pricing</Link>
                  <Link to="/login" className="flex items-center justify-between space-x-2 text-custom-sage bg-gray-800 hover:bg-gray-700 rounded-md p-3 transition duration-300 font-poppins mt-8 text-xl font-semibold cursor-pointer">Sign In</Link>
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
                className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 flex items-center font-poppins"
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
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/products/item1">Product 1</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/products/item2">Product 2</Link>
                </div>
              )}
            </div>

            {/* Dropdown for Business Hub */}
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 flex items-center font-poppins"
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
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/business/hub">Business Login</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/business/resources">Trucking</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/business/resources">Courier Services</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/business/resources">Ocean Freight</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/business/resources">Air Freight</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/business/resources">Rail Freight</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/business/resources">Warehousing</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/business/resources">Operations</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/business/resources">Freight Forwarders</Link>
                </div>
              )}
            </div>

            {/* Dropdown for Resources */}
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 flex items-center font-poppins"
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
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/resources/docs">Guides</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/">Blog</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/resources/tutorials">Market Update</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/resources/tutorials">Research</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/resources/tutorials">Case Study</Link>
                </div>
              )}
            </div>

            {/* Dropdown for Company */}
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="text-white text-xl sm:text-base font-medium hover:text-gray-400 transition duration-300 flex items-center font-poppins"
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
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/about-us">About Us</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/privacy-policy">Private Policy</Link>
                  <div></div>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins" to="/terms-and-conditions">Terms & Conditions</Link>
                </div>
              )}
            </div>

            {/* Sign In / Sign Out */}
            {isLoggedIn ? (
              <button onClick={logout} className="text-white hover:text-gray-400 transition duration-300">Sign Out</button>
            ) : (
              <>
                <Link to="/pricing" className="text-white hover:text-gray-400 transition duration-300">Pricing</Link>
                <Link to="/logins" className="bg-custom-sage text-white font-semibold rounded-lg px-4 py-2 text-base hover:bg-custom-sage transition duration-300 mx-4 font-poppins">Sign In</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
