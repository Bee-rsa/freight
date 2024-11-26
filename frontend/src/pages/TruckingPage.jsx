
import OperatorSignUp from './BusinessHubSignUp';
import Header from "../components/Header"; 
import Footer from "../components/Footer";

// Import images
import image1 from '../assets/logistics-transportation-container-cargo-ship-cargo-plane-with-working-crane-bridge-shipyard-sunrise-logistic-import-export-transport-industry-background-ai-generative_123827-24177.jpg';
import image2 from '../assets/many-transport-trucks-parked-service-station-sunset-ai-generative_123827-23416.jpg';
import image3 from '../assets/aerial-view-container-cargo-ship-sea_335224-720.jpg';

// Blog posts data
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
    title: 'How to Choose the Right Carrier',
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

const TruckingPage = () => {
  return (
    <div style={pageStyle}>
      <Header />

      {/* Container for Operator Registration and Main Content with Gradient Background */}
      <div style={contentContainerStyle}>
        {/* Operator Registration Section */}
        <aside style={operatorRegisterStyle}>
          <OperatorSignUp />
        </aside>

        {/* Main Content */}
        <main style={mainContentStyle}>
          <h2 style={headerStyle}>Three Easy Steps To Get Started</h2>

          <ol style={stepsListStyle}>
            <li style={stepItemStyle}>
              <strong style={stepStrongStyle}>1. Sign Up</strong>
              <p style={stepParagraphStyle}>Choose between a month-to-month or annual contract and select what modules you want.</p>
            </li>
            <li style={stepItemStyle}>
              <strong style={stepStrongStyle}>2. Submit Rates</strong>
              <p style={stepParagraphStyle}>Send in your contract and proprietary rates, and our team will process and load them into the system.</p>
            </li>
            <li style={stepItemStyle}>
              <strong style={stepStrongStyle}>3. Start Quoting</strong>
              <p style={stepParagraphStyle}>You’ll be able to accurately quote your customers while you have them on the phone!</p>
            </li>
          </ol>

          <button style={demoButtonStyle}>Request a Demo</button>
        </main>
      </div>

      {/* Freight Booking Info Section */}
      <section style={freightBookingStyle}>
        <h1 style={freightHeaderStyle}>Maximize Your Freight Efficiency and Minimize Your Efforts.</h1>
        <p style={freightSubheadingStyle}>
          Discover why thousands trust Freight iT as their all-in-one cargo booking solution, seamlessly integrating freight services with exceptional customer support.
        </p>

        {/* Flex container for three units */}
        <div className="units-container" style={unitsContainerStyle}>
          <div style={unitStyle}>
            <img
              src="https://img.icons8.com/?size=100&id=6Bc55nkIp44b&format=png&color=000000"
              alt="Instant Freight Quotes"
              style={iconStyle}
            />
            <h2 style={freightSectionHeaderStyle}>Instant Freight Quotes</h2>
            <p style={freightSectionTextStyle}>
              Get real-time freight quotes tailored to your needs. Book instantly with the best rates available.
            </p>
          </div>

          <div style={unitStyle}>
            <img
              src="https://img.icons8.com/?size=100&id=7SooHhoEbySj&format=png&color=000000"
              alt="Fast & Reliable Shipping"
              style={iconStyle}
            />
            <h2 style={freightSectionHeaderStyle}>Fast & Reliable Shipping</h2>
            <p style={freightSectionTextStyle}>
              Experience fast and reliable shipping with our trusted partners to ensure your cargo arrives on time.
            </p>
          </div>

          <div style={unitStyle}>
            <img
              src="https://img.icons8.com/?size=100&id=36194&format=png&color=000000"
              alt="Comprehensive Tracking"
              style={iconStyle}
            />
            <h2 style={freightSectionHeaderStyle}>Advance Tracking</h2>
            <p style={freightSectionTextStyle}>
              Monitor your shipments in real-time with our comprehensive tracking system, giving you peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section style={blogSectionStyle}>
        <h2 style={blogHeaderStyle}>Latest Blogs for Freight Companies</h2>
        <div className="blog-container" style={blogContainerStyle}>
          {blogPosts.map((post) => (
            <div key={post.id} style={blogPostStyle}>
              <img src={post.image} alt={post.title} style={blogImageStyle} />
              <h3 style={blogTitleStyle}>{post.title}</h3>
              <p style={blogDescriptionStyle}>{post.description}</p>
              <a href={post.link} style={blogLinkStyle}>Read More</a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <style>
        {`
          @media (max-width: 768px) {
            .units-container {
              flex-direction: column;
            }
            .blog-container {
              flex-direction: column;
            }
          }
        `}
      </style>
    </div>
  );
};

// Styles for the page layout
const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '0rem',
  backgroundColor: '#f9f9f9',
  fontFamily: 'Poppins, sans-serif',
};

const contentContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '2rem',
  backgroundImage: 'linear-gradient(135deg, #2B2E52 0%, #9195AB 100%)',
  padding: '2rem',
  borderRadius: '12px',
  marginTop: '3rem',
  flexWrap: 'wrap',
  gap: '1rem',
};

// Styles for operator registration section
const operatorRegisterStyle = {
  flex: '1.5',
  marginRight: '2rem',
  padding: '1rem',
  width: '100%',
};

// Styles for main content 
const mainContentStyle = {
  flex: '2',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '1rem',
  width: '100%',
};

const headerStyle = {
  fontSize: '40px',
  fontWeight: 'normal',
  marginBottom: '1rem',
  textAlign: 'left',
  fontFamily: 'Poppins, sans-serif',
};

const stepsListStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: '0 0 1.5rem 0',
  width: '100%',
};

const stepItemStyle = {
  marginBottom: '1rem',
  padding: '1rem',
  borderRadius: '4px',
  boxShadow: '0 1px 3px rgba(1, 1, 1, 1)',
  fontFamily: 'Poppins, sans-serif',
};

const stepStrongStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#000042', 
};


const stepParagraphStyle = {
  fontSize: '16px',
  marginTop: '0.5rem',
};

const demoButtonStyle = {
  marginTop: '-1rem',
  padding: '0.75rem 1.5rem',
  backgroundColor: '#000042',
  color: '#ffffff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
  fontFamily: 'Poppins, sans-serif',
};

// Styles for Freight Booking Info section
const freightBookingStyle = {
  padding: '2rem',
  backgroundColor: 'transparent',
};

const freightHeaderStyle = {
  fontSize: '36px',
  marginBottom: '1rem',
  textAlign: 'center',
};

const freightSubheadingStyle = {
  fontSize: '18px',
  marginBottom: '1.5rem',
  textAlign: 'center',
};

const unitsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '1rem',
  flexWrap: ['wrap', 'nowrap'],
  gap: '1rem',
  flexDirection: ['column', 'row'],
};

const unitStyle = {
  flex: '1',
  padding: '2rem',
  textAlign: 'center',
  margin: '0 1rem',
};

const iconStyle = {
  width: '100px',
  height: '100px',
  marginBottom: '1rem',
};

const freightSectionHeaderStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '1rem',
};

const freightSectionTextStyle = {
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '1rem',
};

// Blog Section Styles
const blogSectionStyle = {
  padding: '2rem',
  backgroundColor: '#f0f0f0',
};

const blogHeaderStyle = {
  fontSize: '28px',
  marginBottom: '2rem',
  textAlign: 'center',
};

const blogContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: ['wrap', 'nowrap'],
  gap: '1rem',
  flexDirection: ['column', 'row'],
};

const blogPostStyle = {
  flex: '1',
  marginBottom: '1rem',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const blogImageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  marginBottom: '1rem',
};

const blogTitleStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
};

const blogDescriptionStyle = {
  fontSize: '16px',
  marginBottom: '0.5rem',
};

const blogLinkStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#000042',
  textDecoration: 'none',
};

export default TruckingPage;