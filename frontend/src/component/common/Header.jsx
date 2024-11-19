import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import PropTypes from 'prop-types';
import { FaUser, FaCog, FaBell, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuthsStore } from '../../store/authsStore.js'; // Import useAuthsStore to access the logout function

const Header = ({ isOperator }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const operatorLogout = useAuthsStore((state) => state.operatorLogout); // Access the operatorLogout function from the store
  const navigate = useNavigate(); // Initialize navigate for redirection

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await operatorLogout(); // Call the logout function from the store
      navigate('/operator-login'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-custom-blue shadow-lg border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-2xl text-white font-extrabold tracking-tight font-poppins">
          <Link to="/overview">Cargo Connect</Link>
        </div>
        <div className="relative">
          <img
            src='' // Provide the appropriate profile image source
            alt='Profile'
            className='rounded-full w-8 h-8 object-cover cursor-pointer'
            onClick={toggleDropdown}
          />
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md font-poppins shadow-lg z-50">
              <ul className="py-1">
                <li className="hover:bg-gray-100">
                  <Link to="/profile" className="flex items-center px-4 py-2 text-m text-gray-700">
                    <FaUser className="mr-2" /> View Profile
                  </Link>
                </li>
                <li className="hover:bg-gray-100">
                  <Link to="/account-settings" className="flex items-center px-4 py-2 text-m text-gray-700">
                    <FaCog className="mr-2" /> Account Settings
                  </Link>
                </li>
                <li className="hover:bg-gray-100">
                  <Link to="/notifications" className="flex items-center px-4 py-2 text-m text-gray-700">
                    <FaBell className="mr-2" /> Notifications
                  </Link>
                </li>
                <li className="hover:bg-gray-100">
                  <Link to="/help-center" className="flex items-center px-4 py-2 text-m text-gray-700">
                    <FaQuestionCircle className="mr-2" /> Help Center
                  </Link>
                </li>
                {/* Conditional rendering based on isOperator */}
                {isOperator ? (
                  <li className="hover:bg-gray-100">
                    <Link to="/operator-dashboard" className="flex items-center px-4 py-2 text-m text-gray-700">
                      <FaCog className="mr-2" /> Operator Dashboard
                    </Link>
                  </li>
                ) : (
                  <li className="hover:bg-gray-100">
                    <Link to="/user-dashboard" className="flex items-center px-4 py-2 text-m text-gray-700">
                      <FaCog className="mr-2" /> User Dashboard
                    </Link>
                  </li>
                )}
                <li className="hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                  <span className="flex items-center px-4 py-2 text-m text-gray-700">
                    <FaSignOutAlt className="mr-2" /> Logout
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Prop validation
Header.propTypes = {
  isOperator: PropTypes.bool.isRequired, // Expect 'isOperator' to be a boolean and it's required
};

export default Header;
