import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import Header from "../components/Header"; // Adjust the path as necessary
import Footer from "../components/Footer"; // Make sure this path is correct
import Hero from "../components/Hero"; // Import the Hero component
// Import the Home component
import { useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/Screenshot_20241012_144049_Chrome.jpg';
import image2 from '../assets/Screenshot_20241012_144052_Chrome.jpg';
import image3 from '../assets/Screenshot_20241012_145904_Chrome.jpg';
import step1Image from '../assets/Freight iT_20240926_155145_0001.png';
import step2Image from '../assets/Freight iT_20240926_154924_0001.png';
import step3Image from '../assets/Freight iT_20240926_154659_0001.png';

const HomeSection = () => { // Rename the Home component to HomeSection
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Freight: Trends to Watch',
      description: 'Discover the latest trends shaping the future of freight logistics and how they can impact your business.',
      link: '/blog/future-of-freight',
      image: image1,
    },
    {
      id: 2,
      title: 'How to Choose the Right Carrier for your business',
      description: 'Learn how to select the best carrier for your shipping needs and optimize your logistics strategy.',
      link: '/blog/choose-the-right-carrier',
      image: image2,
    },
    {
      id: 3,
      title: 'The Importance of Real-Time Tracking',
      description: 'Explore the benefits of real-time tracking in freight shipping and how it enhances customer satisfaction.',
      link: '/blog/importance-of-real-time-tracking',
      image: image3,
    },
  ];

  const faqData = [
    { question: 'What is Freight iT?', answer: 'Freight iT is a platform designed to simplify your logistics needs by providing easy access to multiple carriers, instant quotes, and real-time shipment tracking.' },
    { question: 'How will Freight iT help my business?', answer: 'Freight iT helps streamline your shipping process by allowing you to compare rates, manage shipments, and track deliveries all in one place, making logistics hassle-free for your business.' },
    { question: 'How do I register and sign up?', answer: 'To sign up, click on "Sign In" in the top right corner and select "Register." Complete the required fields and create your account to start using Freight iT.' },
    { question: 'I forgot my password. What should I do?', answer: 'If you forgot your password, go to the "Sign In" page and click on "Forgot Password." Follow the instructions to reset it.' },
    { question: 'How do I update my profile information?', answer: 'To update your profile, sign in and go to "My Account." From there, you can update your contact details, preferences, and other account information.' },
    { question: 'How can I access my booking history?', answer: 'After signing in, go to "My Bookings" to view your past shipments, track current ones, and see details for each booking.' },
    { question: 'Can I manage multiple users under one account?', answer: 'Yes, Freight iT offers options for businesses to manage multiple users under one account. Please contact our support team for assistance in setting this up.' },
  ];

  return (
    <div className="w-full p-6">
      <section className="bg-white p-6 mb-8 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-left custom-font font-poppins">
          How To Transport Your Cargo With Freight iT
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ img: step1Image, title: 'Register', desc: 'Create an account with Freight iT by providing your email and creating a secure password. This account will allow you to manage your shipments efficiently and access all features of our platform.' },
            { img: step2Image, title: 'Get Instant Quotes', desc: 'Once registered, input your shipping details, including the dimensions and weight of your cargo. Our system will provide you with instant quotes from various carriers, ensuring you find the best price and service for your needs.' },
            { img: step3Image, title: 'Book & Track', desc: 'After selecting your preferred carrier based on the quotes, proceed to book your shipment. Make the payment securely and then track your shipment in real-time through our platform until it arrives at its destination.' },
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-start p-4 md:p-6 border rounded-lg bg-gray-50 w-full h-full">
              <img src={step.img} alt={`Step ${idx + 1}`} className="w-full h-60 object-cover mb-4" />
              <h3 className="font-semibold text-xl text-custom-blue font-poppins">Step {idx + 1}: {step.title}</h3>
              <p className="text-left mb-4 font-poppins">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <h2 className="text-3xl font-bold mb-6 text-center font-poppins">Latest News & Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2 font-poppins">{post.title}</h3>
            <p className="text-gray-700 mb-4 flex-grow font-poppins">{post.description}</p>
            <Link to={post.link} className="text-custom-sage font-semibold hover:underline font-poppins mt-auto">
              Read More
            </Link>
          </div>
        ))}
      </div>

      <section className="p-6 mt-8 w-full">
        <h2 className="text-3xl font-bold text-black-900 mb-4 text-left font-poppins">Frequently Asked Questions</h2>
        {faqData.map((faq, index) => (
          <div key={index} className="mb-4 pb-2">
            <h3
              className="font-poppins text-l text-black-800 cursor-pointer flex justify-between items-center py-2 hover:bg-gray-200 transition duration-200"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="ml-2 text-sm">
                {activeFAQ === index ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
              </span>
            </h3>
            {activeFAQ === index && <p className="text-gray-700 mt-2 font-poppins">{faq.answer}</p>}
          </div>
        ))}
      </section>
    </div>
  );
};

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Import the Header at the top */}
      <Header />

      <Hero /> {/* Add the Hero component here */}

      <motion.main
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 mb-8" // Added mb-8 for margin bottom
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 font-poppins text-transparent bg-clip-text">
          Dashboard
        </h2>

        <div className="space-y-6">
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-80 border border-gray-600 rounded-md"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-custom-blue font-poppins">Welcome back, {user?.name}!</h3>
            <p className="text-gray-300 font-poppins">Manage your freight services and bookings here.</p>
          </motion.div>

          <button onClick={handleLogout} className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded">
            Sign Out
          </button>
        </div>
      </motion.main>

      <HomeSection /> {/* Add the HomeSection component here */}

      <Footer /> {/* Place the Footer at the bottom */}
    </div>
  );
};

export default DashboardPage;
