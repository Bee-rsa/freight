import Header from "../components/Header"; // Adjust the path as necessary
import Footer from "../components/Footer"; 
import BusinessHubSignUp from "./BusinessHubSignUp"; // Adjust the path as necessary

const ContactPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen font-poppins bg-gray-100">
      <Header /> {/* Your header content */}

      <div className="flex flex-col w-full">
        {/* Top half with bg-custom-blue */}
        <div className="bg-custom-blue w-full h-[70vh] flex items-center justify-center text-white">
          {/* Text Section */}
          <div className="w-2/3 max-w-screen-lg mx-auto text-center ml-24 mt-12 px-4">
            <h2 className="text-3xl sm:text-4xl text-custom-sage font-bold mb-4">Get in touch</h2>
            <p className="text-base sm:text-lg mb-8">
              We always love speaking to customers, potential customers, business analysts, and digital freight enthusiasts. 
              To save you some time, check out if any of the links below may help before reaching out to us.
            </p>
          </div>

          {/* Centering BusinessHubSignUp and applying mt-48 */}
          <div className="w-full max-w-4xl mx-auto mt-56 px-4">
            <div className="max-w-2xl mt-56 mx-auto">
              <BusinessHubSignUp /> {/* This will render the BusinessHubSignUp component here */}
            </div>
          </div>
        </div>

        {/* Bottom half with bg-white */}
        <div className="w-full h-[70vh]">
          {/* Add any additional content here */}
        </div>
      </div>

      <Footer className="w-full mt-auto" /> {/* Footer */}
    </div>
  );
};

export default ContactPage;
