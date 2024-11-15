import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaUser, FaCog, FaBell, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore.js';

const Header = ({ isUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown only if the click is outside the dropdown and toggle button
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-custom-blue shadow-lg border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl text-white font-extrabold tracking-tight font-poppins">
          <Link to="/overview">Cargo Connect</Link>
        </div>

        <div className="flex items-center space-x-8">
          {/* Text Links for My Shipments and Track My Order, hidden on small screens */}
          <Link to="/profile" className="hidden md:block text-white text-m font-poppins">
            My Shipments
          </Link>
          <Link to="/track-order" className="hidden md:block text-white text-m font-poppins">
            Track My Order
          </Link>

          <div
            className="cursor-pointer flex flex-col justify-between items-center w-7 h-7"
            ref={toggleButtonRef}
            onClick={toggleMenu}
          >
            <div className="w-6 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white mb-1"></div>
          </div>
        </div>

        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 mr-8 w-64 bg-white rounded-md shadow-lg z-50"
            style={{ top: '100%' }}
          >
            <div className="p-4 border-b border-gray-200">
              {user ? (
                <>
                  <p className="font-semibold text-gray-700 text-sm font-poppins">{user.name}</p>
                  <p className="text-gray-500 text-xs font-poppins">{user.email}</p>
                </>
              ) : (
                <p className="text-gray-500 text-xs font-poppins">No user info available</p>
              )}
            </div>
            <ul className="py-1">
              <li className="hover:bg-gray-100">
                <Link to="/profile" className="flex items-center px-4 py-2 text-m text-gray-700 font-poppins">
                  <FaUser className="mr-2" /> Shipments
                </Link>
              </li>
              <li className="hover:bg-gray-100">
                <Link to="/track-order" className="flex items-center px-4 py-2 text-m text-gray-700 font-poppins">
                  <FaUser className="mr-2" /> Track My Order
                </Link>
              </li>
              <li className="hover:bg-gray-100">
                <Link to="/account-settings" className="flex items-center px-4 py-2 text-m text-gray-700 font-poppins">
                  <FaCog className="mr-2" /> Account Settings
                </Link>
              </li>
              <li className="hover:bg-gray-100">
                <Link to="/notifications" className="flex items-center px-4 py-2 text-m text-gray-700 font-poppins">
                  <FaBell className="mr-2" /> Notifications
                </Link>
              </li>
              <li className="hover:bg-gray-100">
                <Link to="/help-center" className="flex items-center px-4 py-2 text-m text-gray-700 font-poppins">
                  <FaQuestionCircle className="mr-2" /> Help Center
                </Link>
              </li>
              {isUser ? (
                <li className="hover:bg-gray-100">
                  <Link to="/operator-dashboard" className="flex items-center px-4 py-2 text-m text-gray-700 font-poppins">
                    <FaCog className="mr-2" /> Operator Dashboard
                  </Link>
                </li>
              ) : (
                <li className="hover:bg-gray-100">
                  <Link to="/user-dashboard" className="flex items-center px-4 py-2 text-m text-gray-700 font-poppins">
                    <FaCog className="mr-2" /> Billing
                  </Link>
                </li>
              )}
              <li className="hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                <span className="flex items-center px-4 py-2 text-m text-gray-700 font-poppins">
                  <FaSignOutAlt className="mr-2" /> Logout
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  isUser: PropTypes.bool.isRequired,
};

export default Header;
