import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaChevronDown, FaShippingFast, FaWarehouse, FaHome, FaBuilding } from 'react-icons/fa';

// Example country data (You can add more countries and flags)
const countries = [
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  // Add more countries here
];

const SearchBar = () => {
  // State to toggle the visibility of dropdowns
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [type, setType] = useState(''); // State to hold the selected Type value
  const [country, setCountry] = useState(''); // State to hold the selected Country value
  const [address, setAddress] = useState(''); // State to hold the Address input

  const dropdownRef = useRef(null); // Reference for the dropdown container

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsTypeDropdownOpen(false);
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle clicking on the Origin field to toggle the main dropdown
  const handleOriginClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsTypeDropdownOpen(false); // Close type dropdown when origin is clicked
    setIsCountryDropdownOpen(false); // Close country dropdown when origin is clicked
  };

  // Handle clicking on "Type" to toggle the sub-dropdown
  const handleTypeClick = () => {
    setIsTypeDropdownOpen(!isTypeDropdownOpen);
    setIsCountryDropdownOpen(false); // Close country dropdown when type is clicked
  };

  // Handle selecting a Type option
  const handleTypeSelect = (selectedType) => {
    setType(selectedType); // Update the "Type" input field with the selected option
    setIsTypeDropdownOpen(false); // Close the dropdown after selection
  };

  // Handle clicking on "Country" to toggle the country dropdown
  const handleCountryClick = () => {
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
    setIsTypeDropdownOpen(false); // Close type dropdown when country is clicked
  };

  // Handle selecting a Country
  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry); // Update the "Country" input field with the selected country
    setIsCountryDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="w-full flex flex-col items-center bg-custom-blue text-white font-poppins">
      <div className="w-full max-w-7xl p-8 flex flex-col items-left text-left">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Where would you like to ship?</h1>
        <p className="text-s md:text-xl mb-8 max-w-xl">
          Start searching to compare, book, and manage your freight, all on one platform
        </p>

        {/* Extended Search Bar */}
        <div className="w-full  bg-white text-black rounded-lg shadow-md p-2 flex flex-col sm:flex-row items-center justify-between">
          {/* Origin with Dropdown */}
          <div className="relative flex-1 mb-1 sm:mb-0" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Origin"
              className="flex-1 px-3 py-2 sm:border-r sm:border-gray-300 cursor-pointer"
              value={type && country ? `${type} in ${country}` : ''} // Display selected values
              onClick={handleOriginClick} // Toggle dropdown on click
            />
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-112 bg-white border rounded-lg border-gray-300 shadow-lg p-4 mt-3 z-10">
                <h3 className="font-bold mb-2">Where are you shipping from?</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Type"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
                      value={type} // Display the selected Type
                      onClick={handleTypeClick} // Toggle Type dropdown
                    />
                    <FaChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                      onClick={handleTypeClick}
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Address"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
                      value={address} // Display the Address input
                      onChange={(e) => setAddress(e.target.value)} // Handle Address input change
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Country"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md cursor-pointer"
                      value={country} // Display the selected Country
                      onClick={handleCountryClick} // Toggle country dropdown
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <span className="text-xl">{country && countries.find(c => c.name === country)?.flag}</span>
                      <FaChevronDown className="text-gray-400 cursor-pointer" onClick={handleCountryClick} />
                    </div>
                  </div>
                </div>
                {isTypeDropdownOpen && (
                  <div className="mt-4 space-y-2">
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleTypeSelect('Port/Airport')}
                    >
                      <FaShippingFast className="text-gray-400" />
                      <span>Port/Airport</span>
                    </div>
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleTypeSelect('Factory/Warehouse')}
                    >
                      <FaWarehouse className="text-gray-400" />
                      <span>Factory/Warehouse</span>
                    </div>
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleTypeSelect('Business address')}
                    >
                      <FaBuilding className="text-gray-400" />
                      <span>Business address</span>
                    </div>
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleTypeSelect('Residential address')}
                    >
                      <FaHome className="text-gray-400" />
                      <span>Residential address</span>
                    </div>
                  </div>
                )}
                {isCountryDropdownOpen && (
                  <div className="mt-4 space-y-2">
                    {countries.map((country) => (
                      <div
                        key={country.code}
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => handleCountrySelect(country.name)}
                      >
                        <span className="text-xl">{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Destination */}
          <input
            type="text"
            placeholder="Destination"
            className="flex-1 px-3 py-2 mb-1 sm:mb-0 sm:border-r sm:border-gray-300"
          />
          {/* Load */}
          <input
            type="text"
            placeholder="Load"
            className="flex-1 px-3 py-2 mb-1 sm:mb-0 sm:border-r sm:border-gray-300"
          />
          <input
            type="text"
            placeholder="Goods"
            className="flex-1 px-2 py-2 mb-1 sm:mb-0 sm:border-r sm:border-gray-300"
          />
          {/* Search Button */}
          <button className="flex items-center px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-md cursor-pointer">
            <FaSearch className="mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
