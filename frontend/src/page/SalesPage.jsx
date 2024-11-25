import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar"; 

const ProductsPage = () => {
  return (
    <div className='flex h-screen w-full overflow-hidden bg-white'>
      {/* Sidebar */}
      <Sidebar /> 
      
      {/* Main Content */}
      <div className='flex-1 overflow-auto relative z-10 w-full'>
        <Header title='Pricing' />

        <div className="w-full flex flex-col items-center bg-white">
          <div className="w-full max-w-7xl p-8 flex flex-col items-center">
            <h1 className="text-5xl font-bold text-center text-custom-blue mb-12 mt-8 font-poppins">Our Pricing</h1>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl">
              For cost-effective shipping and logistics solutions, start with our Essential plan. Scale up to our Premium plan as your business grows, including advanced tracking and analytics.
            </p>

            {/* Pricing Plans */}
            <div className="flex flex-wrap justify-center sm:justify-between gap-8 w-full max-w-6xl mb-10">
              {/* Plan Cards */}
              {["Economy", "Premium", "Enterprise"].map((plan, idx) => (
                <div key={plan} className="flex-1 min-w-[250px] sm:min-w-[300px] md:min-w-[250px] lg:min-w-[300px] border border-gray-300 rounded-lg shadow-md p-6 flex flex-col items-center">
                  <h2 className="text-2xl font-semibold text-custom-blue mb-4">{plan}</h2>
                  <p className="text-3xl font-bold text-gray-800 mb-2">ZAR {idx * 500 + 500}–{(idx + 1) * 1000}</p>
                  <p className="text-sm text-gray-500 mb-6">/month</p>
                  <p className="text-sm text-gray-600 mb-2">{plan === "Economy" ? "Standard listing, basic analytics, and limited visibility." : plan === "Premium" ? "Enhanced visibility, detailed analytics, customer matching, and marketing features." : "Full feature set, including real-time tracking integration, advanced analytics."}</p>
                  <div className="border-b border-gray-300 w-full mb-2" />
                  <ul className="text-sm text-gray-700 mb-6 space-y-2 w-full text-left leading-6">
                    <li> Standard listing on the platform</li>
                    <li> Automated quote generator</li>
                    <li> Freight management tools</li>
                    <li> {plan === "Economy" ? "Basic" : "Advanced"} analytics</li>
                    <li> Customer support</li> 
                    {plan !== "Economy" && <li> {plan === "Premium" ? "Limited to three" : "Unlimited"} service type options</li>}
                  </ul>
                  <div className="mt-auto w-full">
                    <button className="bg-custom-blue text-white py-2 px-4 rounded-lg w-full">Purchase Now</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="w-full max-w-7xl mt-12 text-center">
              <h3 className="text-4xl mb-6">Freight iT Offers More for the Price</h3>

              {/* Responsive Units */}
              <div className="flex flex-wrap justify-between w-full gap-8">
                {["Scalable Pricing", "Management", "Analytics Tools", "Customer Support"].map((title, index) => (
                  <div key={index} className="flex-1 min-w-[250px] p-6">
                    <h2 className="text-2xl font-bold text-custom-blue mb-2 font-poppins">{title}</h2>
                    <p className="text-gray-600 font-poppins">
                      {title === "Scalable Pricing" ? "With scalable pricing, you can invite as many admins as needed to manage your shipments efficiently." :
                        title === "Management" ? "Seamless Integrations: Freight iT integrates with popular tracking APIs, payroll, and management systems." :
                        title === "Analytics Tools" ? "Gain access to robust tools and analytics without additional charges. We believe in straightforward pricing." :
                        "Get top-tier customer support and management tools to grow your logistics capabilities seamlessly."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;