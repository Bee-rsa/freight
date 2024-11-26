import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import rightImage from '../assets/rb_2147680890.png';

const Hero = () => {
  return (
    <div className="bg-custom-blue text-white font-poppins mt-12 h-screen flex items-center justify-center px-4">
      <div className="max-w-screen-xl w-full mx-auto flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="flex-1 text-center px-4">
          <h1 className="text-3xl md:text-6xl font-bold mb-4 leading-tight">
            Seamless Shipping Simplified
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-custom-sage mb-6">
            For all your transport needs, <br />
            Let Cargo Connect handle iT.
          </h2>
          <p className="text-m md:text-xl text-white mb-8 max-w-lg mx-auto">
            Cargo Connect makes shipping simple and seamless. Get instant quotes, book easily, and
            track shipments in real time - all in one place. Reliable carriers, competitive rates,
            and a smooth experience every step of the way.
          </p>
          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/login">
              <button className="bg-white text-custom-blue py-2 px-4 rounded-lg shadow hover:bg-gray-200 transition">
                Compare Instant Quotes
              </button>
            </Link>
            <Link to="/operator-login">
              <button className="bg-custom-sage text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600 transition">
                Business Solutions
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 mt-8 md:mt-0 px-4 hidden md:block">
          <img
            src={rightImage}
            alt="Freight Solutions"
            className="w-full max-w-md md:max-w-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
