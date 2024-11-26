import Header from "../components/Header"; // Adjust the path as necessary
import Footer from "../components/Footer"; 

const HelpCenter = () => {
  return (
    <div className="flex flex-col w-full min-h-screen font-poppins bg-gray-100">
      <Header /> {/* Your header content */}

      <div className="content flex-grow p-8 bg-white shadow-md rounded-lg mx-auto">
        <h1 className="text-5xl font-bold text-left text-custom-blue mt-16 mb-10">Help Center</h1>
        <h2 className="text-4xl font-bold text-left mt-4 mb-10">How Can We Help You?</h2>

        {/* FAQs Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column (Custom Blue) */}
          <div className="faq-left bg-custom-blue p-6 rounded-lg text-white">
            <h2 className="text-3xl font-semibold mb-6">Customer Related Issues</h2>
            <div className="faq-item mb-8">
              <h3 className="text-2xl font-semibold cursor-pointer hover:underline">How do I create a Freight iT account?</h3>
              <p className="mt-2">
                To create an account, click on the &apos;Sign Up&apos; button located at the top-right of the page. Fill in your details, including your name, email, and password, and follow the instructions to complete the registration process.
              </p>
            </div>
            <div className="faq-item mb-8">
              <h3 className="text-2xl font-semibold cursor-pointer hover:underline">How do I reset my password?</h3>
              <p className="mt-2">
                If you’ve forgotten your password, go to the login page and click on the &apos;Forgot Password?&apos; link. Enter your registered email, and we’ll send you a link to reset your password.
              </p>
            </div>
            <div className="faq-item mb-8">
              <h3 className="text-2xl font-semibold cursor-pointer hover:underline">How do I book a freight service?</h3>
              <p className="mt-2">
                To book a service, log in to your account, input the details of your shipment (weight, distance, etc.), and request a quote. Once you choose a carrier, you can finalize your booking.
              </p>
            </div>
          </div>

          {/* Right Column (Custom Sage) */}
          <div className="faq-right bg-custom-sage p-6 rounded-lg text-gray-800">
            <h2 className="text-3xl font-semibold mb-6">Business Related Issues</h2>
            <div className="faq-item mb-8">
              <h3 className="text-2xl font-semibold cursor-pointer hover:underline">I’m unable to log in to my account.</h3>
              <p className="mt-2">
                Ensure that you’re using the correct email and password. If you forgot your credentials, use the password reset option. If the issue persists, clear your browser cache and try again.
              </p>
            </div>
            <div className="faq-item mb-8">
              <h3 className="text-2xl font-semibold cursor-pointer hover:underline">How do I update my account details?</h3>
              <p className="mt-2">
                To update your account details, log in and go to your &apos;Profile&apos; section. Here, you can update your contact information, password, and other details.
              </p>
            </div>
            <div className="faq-item mb-8">
              <h3 className="text-2xl font-semibold cursor-pointer hover:underline">How do I cancel a booking?</h3>
              <p className="mt-2">
                To cancel a booking, visit your &apos;Bookings&apos; page, select the relevant booking, and click on &apos;Cancel&apos;. If the booking is already confirmed, contact customer support for assistance.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer className="w-full mt-auto p-4 bg-blue-600 text-white text-center" /> {/* Footer */}
    </div>
  );
};

export default HelpCenter;
