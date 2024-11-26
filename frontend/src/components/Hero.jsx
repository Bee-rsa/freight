import rightImage from '../assets/rb_2147680890.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="w-full h-auto min-h-screen flex flex-col items-center bg-custom-blue p-6 pt-20">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold text-center w-full mt-14 text-white whitespace-normal">
        Seamless Shipping Simplified
      </h1>
      <div className="flex flex-col md:flex-row w-full max-w-screen-xl mx-auto items-center justify-between"> {/* Updated to justify-between */}
        
        {/* Text Description and Buttons */}
        <div className="w-full md:w-1/2 p-0 flex flex-col items-center md:items-end ml-16 mt-16 text-center md:text-center"> {/* Changed items-start to items-end and text-left to text-right */}
          <h1 className="text-xl sm:text-3xl md:text-4xl font-poppins text-custom-sage mb-2 px-4">
            For all your transport needs,<br /> Let Freight iT handle iT.
          </h1>
          <p className="text-base sm:text-xl font-poppins text-gray-100 mb-4 px-4">
            Freight iT makes shipping simple and seamless. Get instant quotes, book easily, and track shipments in real time - all in one place. Reliable carriers, competitive rates, and a smooth experience every step of the way.
          </p>
          {/* Modern Classy Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"> 
            <Link to="/login">
              <button className="bg-custom-sage text-white font-poppins font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 hover:bg-white hover:text-custom-sage border border-custom-sage transform hover:scale-105">
                Compare Instant Quotes
              </button>
            </Link>
            <Link to="/operator-sign-in">
              <button className="bg-transparent border-2 border-custom-sage text-custom-sage font-poppins font-semibold py-3 px-8 rounded-full transition duration-300 hover:bg-custom-sage hover:text-white transform hover:scale-105">
                Business Solutions
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex ml-52 justify-start items-center mt-12"> {/* Changed justify-center to justify-start */}
          <img
            src={rightImage}
            alt="Right Image"
            className="w-4/5 md:w-4/5 object-contain" // Smaller width for reduced size
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
