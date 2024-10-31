import logo from '../assets/1000140889-removebg-preview.png'; // Adjust the path to your logo image

const footer = () => {
  return (
    <footer className="bg-custom-blue text-white py-8 w-full font-poppins"> {/* Add font-poppins here */}
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col items-start">
        {/* Logo Section */}
        <img src={logo} alt="Logo" className="h-12 mb-4 -ml-10" />

        {/* Footer Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
          {/* Products Section */}
          <div>
            <h2 className="font-bold mb-4 inline-block border-b border-white pb-2">Products</h2>
            <ul>
              <li><a href="#" className="hover:underline">Cargo Insurance</a></li>
              <li><a href="#" className="hover:underline">Customs Brokerage</a></li>
              <li><a href="#" className="hover:underline">Ocean Freight</a></li>
              <li><a href="#" className="hover:underline">Air Freight</a></li>
              <li><a href="#" className="hover:underline">Less than Container</a></li>
              <li><a href="#" className="hover:underline">Buyer&apos;s Consolidation</a></li>
              <li><a href="#" className="hover:underline">Trucking</a></li>
              <li><a href="#" className="hover:underline">Order Management</a></li>
              <li><a href="#" className="hover:underline">Booking Management</a></li>
              <li><a href="#" className="hover:underline">Climate</a></li>
              <li><a href="#" className="hover:underline">eCommerce Fulfillment</a></li>
            </ul>
          </div>

          {/* Business Hub Section */}
          <div>
            <h2 className="font-bold mb-4 inline-block border-b border-white pb-2">Business Hub</h2>
            <ul>
              <li><a href="/sign-in" className="hover:underline">Login in</a></li>
              <li><a href="/pricing" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Trucking</a></li>
              <li><a href="#" className="hover:underline">Courier Services</a></li>
              <li><a href="#" className="hover:underline">Ocean Freight</a></li>
              <li><a href="#" className="hover:underline">Air Freight</a></li>
              <li><a href="#" className="hover:underline">Rail Freight</a></li>
              <li><a href="#" className="hover:underline">Warehousing</a></li>
              <li><a href="#" className="hover:underline">Operations</a></li>
              <li><a href="#" className="hover:underline">Freight Forwarders</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h2 className="font-bold mb-4 inline-block border-b border-white pb-2">Resources</h2>
            <ul>
              <li><a href="#" className="hover:underline">Guides</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Weight Calculator</a></li>
              <li><a href="#" className="hover:underline">Market Updates</a></li>
              <li><a href="#" className="hover:underline">Research</a></li>
              <li><a href="#" className="hover:underline">Case Study</a></li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h2 className="font-bold mb-4 inline-block border-b border-white pb-2">Company</h2>
            <ul>
              <li><a href="/about-freight-it" className="hover:underline">About Us</a></li>
              <li><a href="/policy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:underline">Contact Sales Agent</a></li>
              <li><a href="#" className="hover:underline">Help Center</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-8">
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/?size=100&id=118467&format=png&color=FFFFFF" 
              alt="Facebook" 
              className="h-8 w-8 hover:opacity-80" 
            />
          </a>
          <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/?size=100&id=37326&format=png&color=FFFFFF" 
              alt="YouTube" 
              className="h-8 w-8 hover:opacity-80" 
            />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" 
              alt="LinkedIn" 
              className="h-8 w-8 hover:opacity-80" 
            />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/?size=100&id=32292&format=png&color=FFFFFF" 
              alt="Instagram" 
              className="h-8 w-8 hover:opacity-80" 
            />
          </a>
        </div>

        {/* Copyright and Trademark Notice */}
        <p className="text-sm text-white mt-4 font-poppins"> {/* Use font-poppins here as well */}
          © {new Date().getFullYear()} Freight iT ™. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default footer;
