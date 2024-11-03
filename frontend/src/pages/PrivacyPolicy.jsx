import React from 'react';
import Header from "../components/Header"; // Adjust the path as necessary
import Footer from "../components/Footer";

const Policy = () => {
  // Scroll to top when the component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Table of Contents */}
        <nav className="md:col-span-1 sticky top-16 h-auto shadow-lg rounded-lg p-4 max-h-screen overflow-y-auto border-2 border-custom-blue font-poppins">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 pb-2">Table of Contents</h2>
          <ul className="space-y-2">
            <li>
              <a href="#information" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                1. Information We Collect
              </a>
            </li>
            <li>
              <a href="#usage" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                2. How We Use Your Information
              </a>
            </li>
            <li>
              <a href="#disclosure" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                3. Disclosure of Your Information
              </a>
            </li>
            <li>
              <a href="#security" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                4. Data Security
              </a>
            </li>
            <li>
              <a href="#rights" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                5. Your Rights
              </a>
            </li>
            <li>
              <a href="#changes" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                6. Changes to This Privacy Policy
              </a>
            </li>
            <li>
              <a href="#contact" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
                7. Contact Us
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="md:col-span-2 max-h-screen bg-gray-200 overflow-y-auto pr-4">
          <h1 className="text-3xl font-bold mb-6 font-poppins">Privacy Policy for Freight iT</h1>
          <p className="mb-4"><strong>Effective Date:</strong> [Insert Date]</p>
          <p className="mb-4">
            Freight iT (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our website and application (collectively, the &quot;Services&quot;). Please read this policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Services.
          </p>

          <h2 id="information" className="text-2xl font-bold mb-4 font-poppins">1. Information We Collect</h2>
          <p className="mb-4">
            We may collect information about you in a variety of ways, including: personal information when you register for our Services, such as your name, email address, phone number, company name, and address; payment information, including credit card numbers or other financial data when you make a payment; usage data, which may include your interactions with our Services, such as IP address, browser type, operating system, pages visited, and the time and date of your visits; and cookies and tracking technologies that track activity on our Services and store certain information.
          </p>

          <h2 id="usage" className="text-2xl font-bold mb-4 font-poppins">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect in the following ways: to provide and maintain our Services by processing transactions, managing your account, and providing customer support; to improve our Services by analyzing your usage patterns to enhance user experience; to communicate with you by sending updates, newsletters, marketing materials, and other information that may be of interest to you, with an option to opt out of these communications; and to comply with legal obligations.
          </p>

          <h2 id="disclosure" className="text-2xl font-bold mb-4 font-poppins">3. Disclosure of Your Information</h2>
          <p className="mb-4">
            We may share your information in the following circumstances: with third-party service providers who assist us in operating our Services, processing payments, or providing customer support; during business transfers, such as a merger, acquisition, or sale of all or a portion of our assets; and when required to do so by law or in response to valid requests by public authorities.
          </p>

          <h2 id="security" className="text-2xl font-bold mb-4 font-poppins">4. Data Security</h2>
          <p className="mb-4">
            We take reasonable measures to protect the information we collect from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
          </p>

          <h2 id="rights" className="text-2xl font-bold mb-4 font-poppins">5. Your Rights</h2>
          <p className="mb-4">
            You have certain rights regarding your personal information, including the right to access and receive a copy of your personal information; request correction of inaccurate or incomplete information; request deletion of your personal information, subject to certain exceptions; and opt out of marketing communications. To exercise these rights, please contact us using the contact information below.
          </p>

          <h2 id="changes" className="text-2xl font-bold mb-4 font-poppins">6. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website and updating the effective date. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 id="contact" className="text-2xl font-bold mb-4 font-poppins">7. Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy or our practices, please contact us at: 
            <strong>Freight iT</strong><br />
            [Your Company Address] <br />
            Email: FreightiT@telkom.net<br />
            Phone: 032 456 7208
          </p>
        </div>
      </div>

      <Footer className="w-full mt-8" /> 
    </div>
  );
};

export default Policy;