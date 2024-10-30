// Layout.jsx

import PropTypes from "prop-types"; // Import PropTypes for prop validation
import Header from "../components/Header";

const Layout = ({ children }) => {
  // Uncomment if you need to use the location in the future
  // const location = useLocation(); // Get the current location

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Render children components */}
      {children}
    </div>
  );
};

// PropTypes validation
Layout.propTypes = {
  children: PropTypes.node.isRequired, // Specify that children is required
};

export default Layout;
