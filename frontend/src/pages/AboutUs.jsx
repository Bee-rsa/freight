import { useState, useEffect } from "react";
import freightImage from "../assets/african-american-young-woman-package-delivery-concept.jpg";
import additionalImage from "../assets/20241012_010803.jpg";
import { FaTruck, FaUsers, FaDollarSign, FaRetweet } from 'react-icons/fa';
import Header from "../components/Header"; // Adjust the path as necessary
import Footer from "../components/Footer"; 

const AboutFreightIT = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalShipments, setTotalShipments] = useState(0);
  const [totalCarriers, setTotalCarriers] = useState(0);
  const [averageCostSavings, setAverageCostSavings] = useState(0);
  const [customerRetention, setCustomerRetention] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const animateCount = (setState, target, duration) => {
    let start = 0;
    const increment = Math.ceil(target / (duration / 10));
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setState(target);
        clearInterval(timer);
      } else {
        setState(start);
      }
    }, 10);
  };

  useEffect(() => {
    animateCount(setTotalShipments, 100000, 2000);
    animateCount(setTotalCarriers, 1245, 2000);
    animateCount(setAverageCostSavings, 15, 2000);
    animateCount(setCustomerRetention, 85, 2000);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-white p-6"> 
      <Header /> 
      <div className="pt-8 md:pt-10"></div> 
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 p-6 md:p-12">
        <div className="md:w-1/2 mb-4 md:mb-0 p-4 md:p-8">
          <h1 className="text-4xl md:text-5xl font-poppins mb-0 leading-tight tracking-wide">
            To establish an open logistics network that enhances the efficiency and speed of freight delivery worldwide.
          </h1>
        </div>
        <div className="md:w-1/2 mt-8 p-4 md:p-8">
          <img 
            src={freightImage} 
            alt="Freight iT Logistics"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="bg-gray-300 text-left mt-8 p-6 rounded-lg shadow-md">
        <p className="text-lg md:text-xl font-bold max-w-3xl mx-auto font-poppins p-4 md:p-8">
          Freight iT provides a comprehensive logistics network: tech-enabled freight services that empower enterprises to streamline and enhance their supply chains for sustainable growth.
        </p>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mt-0 font-poppins p-4 md:p-8">
          Our single technology integration connects businesses with a diverse range of logistics providers across multiple regions. Founded with a vision to transform the freight industry, Freight iT brings extensive logistics expertise and advanced technology to deliver innovative solutions for freight booking, tracking, and distribution.
        </p>
      </div>

      <div className="mt-8 px-6 md:px-12 p-6 md:p-12 flex flex-col md:flex-row justify-between bg-gray-100 rounded-lg shadow-md">
        <div className="flex flex-col items-center md:w-1/4 p-4 md:p-8">
          <FaTruck className="text-5xl md:text-6xl text-blue-500" />
          <div className="text-3xl md:text-4xl mt-2">{totalShipments.toLocaleString()}</div>
          <div className="mt-2 text-lg md:text-xl font-poppins font-semibold">Total Shipments</div>
        </div>
        <div className="flex flex-col items-center md:w-1/4 p-4 md:p-8">
          <FaUsers className="text-5xl md:text-6xl text-blue-500" />
          <div className="text-3xl md:text-4xl mt-2">{totalCarriers}</div>
          <div className="mt-2 text-lg md:text-xl font-poppins font-semibold">Total Carriers</div>
        </div>
        <div className="flex flex-col items-center md:w-1/4 p-4 md:p-8">
          <FaDollarSign className="text-5xl md:text-6xl text-blue-500" />
          <div className="text-3xl md:text-4xl mt-2">{averageCostSavings}%</div>
          <div className="mt-2 text-lg md:text-xl font-poppins font-semibold">Average Cost Savings</div>
        </div>
        <div className="flex flex-col items-center md:w-1/4 p-4 md:p-8">
          <FaRetweet className="text-5xl md:text-6xl text-blue-500" />
          <div className="text-3xl md:text-4xl mt-2">{customerRetention}%</div>
          <div className="mt-2 text-lg md:text-xl font-poppins font-semibold">Customer Retention</div>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 p-6 md:p-12">
        <div className="md:w-1/2 mb-4 md:mb-0 p-4 md:p-8">
          <img 
            src={additionalImage} 
            alt="Letter from Founder"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 text-left md:ml-8 flex flex-col justify-start p-4 md:p-8">
          <h2 className="text-5xl md:text-6xl font-poppins mb-4">A Letter from the Founder and CEO</h2>
          <p className="text-lg md:text-xl font-poppins">
            Welcome to Freight iT! Our mission is to revolutionize the logistics industry through innovation and excellence. We are committed to providing the highest quality services and ensuring your freight needs are met efficiently.
          </p>
          <button 
            onClick={toggleDropdown}
            className="mt-4 text-blue-600 hover:underline focus:outline-none"
          >
            {isOpen ? "Read less" : "Read full Founder and CEO letter"}
          </button>
          {isOpen && (
            <div className="mt-4 bg-gray-200 p-4 rounded-lg shadow-md">
              <p className="text-lg md:text-xl font-poppins">
                Dear valued customers and partners, 
                <br /><br />
                As the Founder and CEO of Freight iT, I want to personally thank you for your continued trust and support. Our team is dedicated to innovating and optimizing logistics processes, ensuring that we meet your needs effectively and efficiently. 
                <br /><br />
                We believe that through collaboration and innovation, we can achieve great things. Our commitment to excellence drives us to continuously enhance our services, keeping you at the forefront of the logistics revolution.
                <br /><br />
                Together, let’s navigate the future of logistics.
                <br /><br />
                Sincerely,<br />
                [Your Name]
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 px-6 md:px-12 p-6 md:p-12 bg-gray-100 rounded-lg shadow-md text-center md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-poppins mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-4">Stay updated with the latest news and offers from Freight iT!</p>
        <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-center justify-center">
          <input 
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 md:p-4 border border-gray-300 font-poppins rounded-md md:w-2/3 mb-4 md:mb-0 md:mr-4"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 md:p-4 font-poppins rounded-md">
            Subscribe
          </button>
        </form>
        {isSubscribed && (
          <p className="mt-4 text-green-500">Thank you for subscribing!</p>
        )}
      </div>
      <Footer /> 
    </div>
  );
};

export default AboutFreightIT;