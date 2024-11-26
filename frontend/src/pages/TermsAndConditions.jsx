import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  // Scroll to top when the component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-12 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Table of Contents */}
        <nav className="md:col-span-1 sticky top-16 h-auto shadow-lg rounded-lg p-4 max-h-screen overflow-y-auto border-2 bg-gray-200 border-custom-blue font-poppins">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 pb-2">Table of Contents</h2>
          <ul className="space-y-2">
            <li>
              <a href="#information" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              1. Definitions
              </a>
            </li>
            <li>
              <a href="#usage" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              2. Acceptance of Terms
              </a>
            </li>
            <li>
              <a href="#disclosure" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              3. User Eligibility
              </a>
            </li>
            <li>
              <a href="#security" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              4. Account Registration and Security
              </a>
            </li>
            <li>
              <a href="#rights" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              5. Use of the Freight iT Platform
              </a>
            </li>
            <li>
              <a href="#changes" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              6. Booking and Service Agreement
              </a>
            </li>
            <li>
              <a href="#contact" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              7. Pricing and Payment
              </a>
            </li>
            <li>
              <a href="#contact" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              7. Pricing and Payment
              </a>
            </li>
            <li>
              <a href="#contact" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              8. Cancellations and Refunds
              </a>
            </li>
            <li>
              <a href="#contact" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              9. User Responsibilities
              </a>
            </li>
            <li>
              <a href="#contact" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              10. Reviews and Feedback
              </a>
            </li>
            <li>
              <a href="#contact" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              12. Limitation of Liability
              </a>
            </li>
            <li>
              <a href="#contact" className="text-black hover:no-underline hover:text-custom-blue transition duration-200 font-poppins">
              13. Governing Law
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="md:col-span-2 max-h-screen bg-gray-100 overflow-y-auto pr-4">
        <h1 className="text-3xl font-bold mb-6 font-poppins">Terms and Conditions</h1>
  <p className="mb-4"><strong>Effective Date:</strong> [26 November 2024]</p>
  <p className="mb-4">
    Welcome to Cargo Connect. By accessing and using our platform, you (&quot;User&quot; or &quot;Customer&quot;) agree to comply with and be bound by the following Terms and Conditions (&quot;Agreement&quot;). This Agreement governs your use of the Cargo Connect platform, including any content, functionality, and services offered through the platform. Please read these Terms and Conditions carefully before using Cargo Connect. If you do not agree to these Terms, you must not use the platform.
  </p>

  <h2 id="information" className="text-2xl font-bold mb-4 font-poppins">1. Definitions</h2>
  <p className="mb-4">
    Cargo Connect is a platform offering freight booking services, real-time tracking, payment processing, and ratings & reviews, connecting customers with logistics companies. The term &quot;User&quot; or &quot;Customer&quot; refers to any individual or company using Cargo Connect to book freight or logistics services. A &quot;Logistics Company&quot; or &quot;Service Provider&quot; is a company offering freight services listed on Cargo Connect. A &quot;Service Agreement&quot; is the agreement between the User and the Service Provider for logistics services booked through Cargo Connect.
  </p>

  <h2 id="usage" className="text-2xl font-bold mb-4 font-poppins">2. Acceptance of Terms</h2>
  <p className="mb-4">
    By accessing or using Cargo Connect, you agree to these Terms and Conditions. If you do not agree, you should not access or use the platform. Cargo Connect reserves the right to modify or update these Terms at any time without prior notice. Continued use of the platform after any changes are made constitutes acceptance of the new terms. It is your responsibility to review these Terms periodically.
  </p>

  <h2 id="disclosure" className="text-2xl font-bold mb-4 font-poppins">3. User Eligibility</h2>
  <p className="mb-4">
    You must be at least 18 years of age or have the legal capacity to enter into a binding agreement. Users are required to provide accurate and truthful information during the registration process and keep this information up to date. Additionally, users must comply with all applicable laws and regulations related to the use of Cargo Connect and logistics services. Cargo Connect reserves the right to suspend or terminate accounts for violations of these eligibility requirements.
  </p>

  <h2 id="security" className="text-2xl font-bold mb-4 font-poppins">4. Account Registration and Security</h2>
  <p className="mb-4">
    To book services on Cargo Connect, you must create an account and provide accurate information about yourself or your business. You are responsible for maintaining the confidentiality of your account login credentials and for all activities that occur under your account. Cargo Connect reserves the right to suspend or terminate your account if any information provided during registration is false, misleading, or violates these Terms. It is your responsibility to notify Cargo Connect immediately if you suspect unauthorized use of your account.
  </p>

  <h2 id="rights" className="text-2xl font-bold mb-4 font-poppins">5. Use of the Cargo Connect Platform</h2>
  <p className="mb-4">
    Cargo Connect provides a marketplace where Users can search for, compare, and book logistics services from registered Service Providers. The platform allows Users to input details such as pickup and drop-off locations, cargo weight, and other relevant information to receive price quotes from Service Providers. Cargo Connect does not provide logistics services directly; the platform facilitates connections between Users and Service Providers. Users agree to use the platform for legitimate, non-commercial purposes, and not to engage in any fraudulent activities. Any use of automated systems or scraping tools to collect data from Cargo Connect is prohibited.
  </p>

  <h2 id="changes" className="text-2xl font-bold mb-4 font-poppins">6. Booking and Service Agreement</h2>
  <p className="mb-4">
    Once a User selects and books a logistics service, a binding agreement is created between the User and the Service Provider. The terms of the agreement, including pricing, delivery timelines, and cancellation policies, are outlined by the Service Provider. Cargo Connect is not responsible for the performance of the Service Provider. All issues related to the fulfillment of services must be resolved between the User and the Service Provider directly. Users are encouraged to review the Service Provider’s terms, including insurance policies, payment terms, and service conditions before confirming any booking.
  </p>

  <h2 id="contact" className="text-2xl font-bold mb-4 font-poppins">7. Pricing and Payment</h2>
  <p className="mb-4">
    The prices displayed for logistics services on Cargo Connect are set by the Service Providers and include base rates, weight charges, fuel surcharges, and any additional fees (such as accessorial charges). Users must provide accurate payment information at the time of booking. Payments will be processed through Cargo Connect’s secure payment gateway. By making a booking, you agree to pay the full amount specified at the time of booking. Cargo Connect may charge a service fee, which will be indicated during the booking process. Users authorize Cargo Connect to collect payment on behalf of the Service Provider. Cargo Connect will disburse payments to Service Providers after the completion of services.
  </p>

  <h2 id="cancellations" className="text-2xl font-bold mb-4 font-poppins">8. Cancellations and Refunds</h2>
  <p className="mb-4">
    Each Service Provider has its own cancellation and refund policy, which will be made available to Users at the time of booking. Users must review and understand the cancellation terms before confirming a booking. If a User cancels a booking, any refund will be subject to the Service Provider’s policy. Cargo Connect will not be liable for any fees incurred due to cancellations or refunds. Cargo Connect reserves the right to amend or update its policies regarding cancellations or refunds at any time.
  </p>

  <h2 id="user-responsibilities" className="text-2xl font-bold mb-4 font-poppins">9. User Responsibilities</h2>
  <p className="mb-4">
    Users agree to provide accurate, complete, and current information when using the Cargo Connect platform. Users are responsible for ensuring that all information related to their bookings, including pickup and drop-off locations and cargo details, is accurate. Users agree to comply with all applicable laws, including transportation regulations, and must not engage in any illegal activities when using the Cargo Connect platform. You agree not to use the platform for any purpose that could harm, damage, or disable the platform or its systems.
  </p>

  <h2 id="reviews" className="text-2xl font-bold mb-4 font-poppins">10. Reviews and Feedback</h2>
  <p className="mb-4">
    Users may have the opportunity to provide feedback and reviews for Service Providers following the completion of services. By submitting a review, you grant Cargo Connect a worldwide, non-exclusive, royalty-free license to use, reproduce, and display your review on the platform. Cargo Connect reserves the right to remove any review deemed inappropriate or in violation of these Terms. Reviews must be honest, respectful, and not contain defamatory, offensive, or unlawful content.
  </p>

  <h2 id="dispute-resolution" className="text-2xl font-bold mb-4 font-poppins">11. Dispute Resolution</h2>
  <p className="mb-4">
    In the event of a dispute between a User and a Service Provider, both parties agree to first attempt to resolve the issue amicably. If a resolution cannot be reached, either party may escalate the dispute to Cargo Connect. Cargo Connect will act as a mediator but is not responsible for the outcome of any disputes. Users agree to provide any relevant documentation or evidence as requested during the dispute resolution process. Cargo Connect reserves the right to refuse to mediate disputes if it deems necessary.
  </p>

  <h2 id="liability" className="text-2xl font-bold mb-4 font-poppins">12. Limitation of Liability</h2>
  <p className="mb-4">
    Cargo Connect shall not be liable for any indirect, incidental, or consequential damages arising out of or related to the use of the platform or the services booked through it. In no event shall Cargo Connect’s total liability exceed the amount paid by the User for the services that gave rise to the claim. This limitation of liability applies to all damages, including loss of profit, revenue, or data, arising from any cause of action.
  </p>

  <h2 id="governing-law" className="text-2xl font-bold mb-4 font-poppins">13. Governing Law</h2>
  <p className="mb-4">
    These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising out of or relating to these Terms shall be resolved in the courts of [Your Jurisdiction], and you hereby consent to the jurisdiction of such courts.
  </p>

  <h2 id="changes" className="text-2xl font-bold mb-4 font-poppins">14. Changes to Terms</h2>
  <p className="mb-4">
    Cargo Connect reserves the right to modify or update these Terms and Conditions at any time. Any changes will be posted on this page, and the updated Terms will be effective immediately upon posting. Users are encouraged to review these Terms periodically for any changes.
  </p>

  <h2 id="contact" className="text-2xl font-bold mb-4 font-poppins">15. Contact Information</h2>
  <p className="mb-4">
    If you have any questions or concerns about these Terms and Conditions, please contact us at support@cargoconnect.com.
  </p>
        </div>
      </div>

      <Footer className="w-full mt-8" />
    </div>
  );
};

export default TermsAndConditions;