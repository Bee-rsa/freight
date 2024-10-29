import { motion } from "framer-motion";
import PropTypes from "prop-types"; // Import PropTypes

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{ top, left }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};

// Define prop types
FloatingShape.propTypes = {
  color: PropTypes.string.isRequired, // Expecting a string for color
  size: PropTypes.string.isRequired, // Expecting a string for size
  top: PropTypes.string.isRequired, // Expecting a string for top position
  left: PropTypes.string.isRequired, // Expecting a string for left position
  delay: PropTypes.number, // Expecting a number for delay (optional)
};

export default FloatingShape;
