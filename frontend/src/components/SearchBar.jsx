import { useState, useEffect, useRef } from 'react';
import {
  FaSearch,
  FaChevronDown,
  FaShippingFast,
  FaWarehouse,
  FaHome,
  FaBuilding,
} from 'react-icons/fa';

const countries = [
  { name: 'United States', code: 'US', flag: '' },
  { name: 'Canada', code: 'CA', flag: '' },
  { name: 'United Kingdom', code: 'GB', flag: '' },
  { name: 'Australia', code: 'AU', flag: '' },
  { name: 'Germany', code: 'DE', flag: '' },
];

const SearchBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [type, setType] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const dropdownRef = useRef(null);

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

  const handleOriginClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsTypeDropdownOpen(false);
    setIsCountryDropdownOpen(false);
  };

  const handleTypeClick = () => {
    setIsTypeDropdownOpen(!isTypeDropdownOpen);
    setIsCountryDropdownOpen(false);
  };

  const handleTypeSelect = (selectedType) => {
    setType(selectedType);
    setIsTypeDropdownOpen(false);
  };

  const handleCountryClick = () => {
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
    setIsTypeDropdownOpen(false);
  };

  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry);
    setIsCountryDropdownOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center bg-custom-blue text-white font-poppins">
      <style>
        {`
          /* Mobile Styles */
          @media only screen and (max-width: 768px) {
            .search-bar {
              flex-direction: column;
              align-items: center;
            }

            .search-bar input[type='text'] {
              width: 100%;
              padding: 10px;
              margin-bottom: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }

            .search-bar .dropdown {
              position: static;
              width: 100%;
            }

            .vertical-separator {
              display: none;
            }
          }
        `}
      </style>

      <div className="w-full max-w-7xl px-4 py-8 flex flex-col items-center text-center">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4">
          Where would you like to ship?
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-8 max-w-lg">
          Start searching to compare, book, and manage your freight, all on one platform.
        </p>

        <div className="search-bar w-full bg-white text-black rounded-lg shadow-md p-4 sm:w-50% sm:p-4 flex flex-col sm:flex-row flex-wrap gap-4">
          <div className="relative flex-1" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Origin"
              className="w-full bg-transparent px-3 p-4 py-2 cursor-pointer"
              value={type && country ? `${type} in ${country}` : ''}
              onClick={handleOriginClick}
            />
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full bg-white border rounded-lg border-gray-300 shadow-lg p-4 mt-2 z-10">
                <h3 className="font-bold mb-2">Where are you shipping from?</h3>
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
                      value={type}
                      onClick={handleTypeClick}
                    />
                    <FaChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                      onClick={handleTypeClick}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Country"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
                      value={country}
                      onClick={handleCountryClick}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      <span className="text-xl">
                        {country && countries.find((c) => c.name === country)?.flag}
                      </span>
                      <FaChevronDown
                        className="text-gray-400 cursor-pointer"
                        onClick={handleCountryClick}
                      />
                    </div>
                  </div>
                </div>
                {isTypeDropdownOpen && (
                  <div className="mt-4 flex flex-col gap-2">
                    {[ 
                      { label: 'Port/Airport', icon: <FaShippingFast /> },
                      { label: 'Factory/Warehouse', icon: <FaWarehouse /> },
                      { label: 'Business address', icon: <FaBuilding /> },
                      { label: 'Residential address', icon: <FaHome /> },
                    ].map((option) => (
                      <div
                        key={option.label}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleTypeSelect(option.label)}
                      >
                        {option.icon}
                        <span>{option.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                {isCountryDropdownOpen && (
                  <div className="mt-4 flex flex-col gap-2">
                    {countries.map((c) => (
                      <div
                        key={c.code}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleCountrySelect(c.name)}
                      >
                        <span className="text-xl">{c.flag}</span>
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="vertical-separator flex items-center justify-center hidden sm:block">
            <span className="text-xl mx-4 text-gray-400">|</span>
          </div>

          <input
            type="text"
            placeholder="Destination"
            className="flex-1 sm:flex-none px-3 py-2"
          />
          <div className="vertical-separator flex items-center justify-center hidden sm:block">
            <span className="text-xl mx-4 text-gray-400">|</span>
          </div>
          <input
            type="text"
            placeholder="Load"
            className="flex-1 sm:flex-none px-3 py-2"
          />
          <div className="vertical-separator flex items-center justify-center hidden sm:block">
            <span className="text-xl mx-4 text-gray-400">|</span>
          </div>
          <input
            type="text"
            placeholder="Goods"
            className="flex-1 sm:flex-none px-3 py-2"
          />

          <button className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md font-semibold flex items-center justify-center">
            <FaSearch className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;