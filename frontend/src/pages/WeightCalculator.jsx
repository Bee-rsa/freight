import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const WeightCalculator = () => {
  const [calculationType, setCalculationType] = useState('unit');
  const [packages, setPackages] = useState([
    { packageType: 'pallets', numUnits: 0, length: 0, width: 0, height: 0, weight: 0 }
  ]);
  const [selectedFreight, setSelectedFreight] = useState('');
  const [chargeableWeight, setChargeableWeight] = useState(0); 
  const [totalVolume, setTotalVolume] = useState(0); 
  const [totalShipmentWeight, setTotalShipmentWeight] = useState(0); 
  const [density, setDensity] = useState(0); 
  const [dimWeight, setDimWeight] = useState(0); 
  const [freightClass, setFreightClass] = useState('');
  const [isTotalShipment, setIsTotalShipment] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addPackage = () => {
    setPackages([...packages, { packageType: 'pallets', numUnits: 0, length: 0, width: 0, height: 0, weight: 0 }]);
  };

  const updatePackage = (index, field, value) => {
    const newPackages = [...packages];
    newPackages[index][field] = value;
    setPackages(newPackages);
  };

  const deletePackage = (index) => {
    const newPackages = packages.filter((_, i) => i !== index);
    setPackages(newPackages);
  };

  const calculateChargeableWeight = () => {
    let totalWeight = 0;
    let totalVol = 0;

    packages.forEach(pkg => {
      const volumetricWeight = (pkg.length * pkg.width * pkg.height) / (selectedFreight === 'ocean' ? 1000 : selectedFreight === 'truck' ? 3000 : selectedFreight === 'express' ? 5000 : 6000);
      const weight = parseFloat(pkg.weight);
      const chargeableWeight = Math.max(weight, volumetricWeight) * parseFloat(pkg.numUnits);
      totalWeight += chargeableWeight;

      const volume = (pkg.length * pkg.width * pkg.height) / 1000000; 
      totalVol += volume * pkg.numUnits; 
    });

    setChargeableWeight(totalWeight);
    setTotalVolume(totalVol);
    setTotalShipmentWeight(totalWeight); 
    const density = (totalWeight / totalVol) * 1000; 
    setDensity(density.toFixed(2)); 
    const dimWeightCalc = totalVol * 1000 * 1.6; // Using 1.6 as DIM factor
    setDimWeight(dimWeightCalc.toFixed(2)); 
    calculateFreightClass(density);

    alert(`Total Chargeable Weight: ${totalWeight.toFixed(2)} kg`); 
  };

  const calculateFreightClass = (density) => {
    if (density < 1) {
      setFreightClass('Class 1');
    } else if (density >= 1 && density < 1.5) {
      setFreightClass('Class 2');
    } else if (density >= 1.5 && density < 2.5) {
      setFreightClass('Class 3');
    } else if (density >= 2.5 && density < 4) {
      setFreightClass('Class 4');
    } else {
      setFreightClass('Class 5');
    }
  };

  const TotalShipmentCalculation = () => {
    return (
      <div className="w-full bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
        <div className="flex flex-row justify-between mb-4">
          <div className="w-1/3">
            <label htmlFor="numUnits" className="block mb-1 font-semibold text-sm">Number of Units:</label>
            <input
              type="number"
              id="numUnits"
              value={packages[0].numUnits}
              onChange={(e) => updatePackage(0, 'numUnits', e.target.value)}
              className="w-full p-1 border border-gray-300 rounded text-sm"
            />
          </div>

          <div className="w-1/3">
            <label htmlFor="totalVolume" className="block mb-1 font-semibold text-sm">Total Volume:</label>
            <input
              type="number"
              id="totalVolume"
              value={totalVolume}
              onChange={(e) => setTotalVolume(parseFloat(e.target.value))}
              className="w-full p-1 border border-gray-300 rounded text-sm"
            />
          </div>

          <div className="w-1/3">
            <label htmlFor="totalWeight" className="block mb-1 font-semibold text-sm">Total Weight:</label>
            <input
              type="number"
              id="totalWeight"
              value={totalShipmentWeight}
              onChange={(e) => setTotalShipmentWeight(parseFloat(e.target.value))}
              className="w-full p-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>

        <button
          onClick={() => {
            const density = (totalShipmentWeight / totalVolume) * 1000;
            setDensity(density.toFixed(2));
            const dimWeightCalc = totalVolume * 1000 * 1.6;
            setDimWeight(dimWeightCalc.toFixed(2));
            calculateFreightClass(density);
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center bg-white mt-8 mb-8 font-poppins">
      <Header />
      <div className="w-full max-w-2xl p-4 sm:p-16 flex flex-col items-center mt-12 border border-gray-300 rounded-lg bg-gray-50 shadow-lg mb-12">
        <h1 className="text-3xl font-bold mb-6">Chargeable Weight Calculator</h1>

        <div className="mb-4 w-full">
          <label className="block mb-2 font-semibold text-sm">Choose calculation method:</label>
          <div className="flex flex-col sm:flex-row justify-start space-x-6">
            <div className="flex items-center mb-2 sm:mb-0">
              <input
                type="radio"
                id="byUnitType"
                name="calculationType"
                value="unit"
                checked={calculationType === 'unit'}
                onChange={() => {
                  setCalculationType('unit');
                  setIsTotalShipment(false);
                }}
                className="mr-1"
              />
              <label htmlFor="byUnitType" className="text-sm">Calculate by unit type</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="byShipment"
                name="calculationType"
                value="shipment"
                checked={calculationType === 'shipment'}
                onChange={() => {
                  setCalculationType('shipment');
                  setIsTotalShipment(true);
                }}
                className="mr-1"
              />
              <label htmlFor="byShipment" className="text-sm">Calculate by total shipment</label>
            </div>
          </div>
        </div>

        {isTotalShipment ? (
          <TotalShipmentCalculation />
        ) : (
          packages.map((pkg, index) => (
            <div key={index} className="w-full bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
              <div className="mb-4 w-full flex flex-col sm:flex-row items-center justify-between">
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <h2 className="text-sm font-semibold mb-1">Type of Package:</h2>
                  <div className="flex space-x-2">
                    <div
                      className={`flex items-center justify-center w-full p-2 border border-gray-300 rounded cursor-pointer ${pkg.packageType === 'pallets' ? 'bg-blue-700 text-white' : 'bg-white'}`}
                      onClick={() => updatePackage(index, 'packageType', 'pallets')}
                    >
                      Pallets
                    </div>
                    <div
                      className={`flex items-center justify-center w-full p-2 border border-gray-300 rounded cursor-pointer ${pkg.packageType === 'crates' ? 'bg-blue-700 text-white' : 'bg-white'}`}
                      onClick={() => updatePackage(index, 'packageType', 'crates')}
                    >
                      Crates/Boxes
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-1/3">
                  <label htmlFor={`numUnits${index}`} className="block mb-1 font-semibold text-sm">Number of Units:</label>
                  <input
                    type="number"
                    id={`numUnits${index}`}
                    value={pkg.numUnits}
                    onChange={(e) => updatePackage(index, 'numUnits', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>

              <div className="mb-4 w-full flex flex-col sm:flex-row items-center justify-between">
                <div className="w-full sm:w-2/3 mb-4 sm:mb-0">
                  <h2 className="text-sm font-semibold mb-1">Dimensions (L x W x H):</h2>
                  <div className="flex">
                    <input
                      type="number"
                      placeholder="L"
                      value={pkg.length}
                      onChange={(e) => updatePackage(index, 'length', e.target.value)}
                      className="w-1/4 p-1 border border-gray-300 rounded-l text-sm"
                    />
                    <input
                      type="number"
                      placeholder="W"
                      value={pkg.width}
                      onChange={(e) => updatePackage(index, 'width', e.target.value)}
                      className="w-1/4 p-1 border-t border-b border-gray-300 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="H"
                      value={pkg.height}
                      onChange={(e) => updatePackage(index, 'height', e.target.value)}
                      className="w-1/4 p-1 border border-gray-300 rounded-r text-sm"
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/3">
                  <h2 className="text-sm font-semibold mb-1">Weight (per unit):</h2>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id={`weight${index}`}
                      placeholder="Weight"
                      value={pkg.weight}
                      onChange={(e) => updatePackage(index, 'weight', e.target.value)}
                      className="w-3/4 p-1 border border-gray-300 rounded-l text-sm"
                    />
                    <span className="p-1 border border-gray-300 rounded-r bg-gray-100 text-sm">kg</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => deletePackage(index)}
                className="text-red-600 text-sm mb-2 hover:text-red-800"
              >
                Delete Load
              </button>
            </div>
          ))
        )}

        {!isTotalShipment && (
          <button
            onClick={addPackage}
            className="mb-2 text-blue-600 text-sm hover:text-blue-800 focus:outline-none"
          >
            + Add Another Load
          </button>
        )}

        <h2 className="text-lg font-semibold mt-6 mb-2 font-poppins">Select Freight Type:</h2>
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-4 w-full">
          {[ 
            { label: 'Ocean LCL', value: 'ocean', ratio: '1:1000' }, 
            { label: 'Truck LTL', value: 'truck', ratio: '1:3000' }, 
            { label: 'Courier', value: 'express', ratio: '1:5000' }, 
            { label: 'Air Freight', value: 'air', ratio: '1:6000' } 
          ].map((freight) => (
            <div
              key={freight.value}
              onClick={() => setSelectedFreight(freight.value)}
              className={`flex flex-col items-center justify-center w-full sm:w-1/2 p-4 border border-gray-300 rounded-lg cursor-pointer ${selectedFreight === freight.value ? 'bg-blue-700 text-white' : 'bg-white'}`}
            >
              <h3 className="font-bold">{freight.label}</h3>
              <p className="text-sm text-gray-600">Ratio: {freight.ratio}</p>
            </div>
          ))}
        </div>

        <button
          onClick={isTotalShipment ? () => {
            const density = (totalShipmentWeight / totalVolume) * 1000;
            setDensity(density.toFixed(2));
            const dimWeightCalc = totalVolume * 1000 * 1.6;
            setDimWeight(dimWeightCalc.toFixed(2));
            calculateFreightClass(density);
          } : calculateChargeableWeight}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isTotalShipment ? 'Calculate' : 'Calculate Chargeable Weight'}
        </button>

        {chargeableWeight > 0 && (
          <div className="mt-8 w-full text-left p-4 border border-gray-300 rounded-lg bg-gray-100 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Calculation Results</h2>
            <div className="flex flex-col sm:flex-row justify-between mb-4">
              <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                <h3 className="text-lg font-bold mb-1">Volume and Weight</h3>
                <div className="text-sm">Total volume (CBM): {totalVolume.toFixed(2)}</div>
                <div className="text-sm">Total shipment weight (KG): {totalShipmentWeight.toFixed(2)}</div>
              </div>
              <div className="w-full sm:w-1/2">
                <h3 className="text-lg font-bold mb-1">Density and DIM Weight</h3>
                <div className="text-sm">Density (PCF): {density} PCF</div>
                <div className="text-sm">DIM weight: {dimWeight} kg</div>
              </div>
            </div>
            <div className="text-sm">Freight class: {freightClass}</div>
          </div>
        )}
      </div>

      <div className="w-full max-w-8xl p-0 sm:p-16 flex flex-col items-center mt-12">
        <h1 className="text-3xl font-bold mb-6">Chargeable & Volumetric Weight Calculator Information</h1>

        <p className="text-lg mb-4">
          In the world of freight shipping, understanding how charges are calculated is crucial for effective budgeting and cost management.
        </p>

        <h2 className="text-xl font-semibold mb-2">Why Use Our Calculator?</h2>
        <p className="text-lg mb-4">
          Shipping companies often charge based on the greater of either actual weight or dimensional (volumetric) weight.
        </p>

        <h2 className="text-xl font-semibold mb-2">How to Calculate Chargeable Weight</h2>
        <ol className="list-decimal text-lg mb-4">
          <li>Input Shipment Volume and Weight.</li>
          <li>Slide the switch to select whether you are entering total shipment weight and volume or unit measurements.</li>
          <li>Enter Dim Factor.</li>
          <li>Review Chargeable Weight.</li>
        </ol>

        <h2 className="text-xl font-semibold mb-2">Understanding Volumetric & Chargeable Weight</h2>
        <p className="text-lg mb-4">
          Dimensional Weight: Calculated by dividing the volume of your shipment by a predefined dim factor.
        </p>
        <p className="text-lg mb-4">
          Chargeable Weight: The higher of the actual weight and dimensional weight is used as the chargeable weight.
        </p>

        <h2 className="text-xl font-semibold mb-2">Cost-Saving Tips</h2>
        <ul className="list-disc text-lg mb-4">
          <li>Avoid over-packaging lightweight freight.</li>
          <li>Use the smallest possible carton sizes.</li>
          <li>Compress products to minimize space.</li>
          <li>Consider negotiating the dim factor with your freight carrier.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Example Calculation</h2>
        <p className="text-lg mb-4">
          For instance, if a package measures 50 cm x 40 cm x 30 cm and has a gross weight of 10 kg:
        </p>
        <p className="text-lg mb-4">
          Volumetric Weight = (50 x 40 x 30) / 6000 = 10 kg
        </p>
        <p className="text-lg mb-4">
          Chargeable Weight = max(10, 10) = 10 kg
        </p>

        <h2 className="text-xl font-semibold mb-2">Importance of Chargeable Weight</h2>
        <p className="text-lg mb-4">
          Understanding chargeable weight is critical for anyone involved in shipping.
        </p>

        <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
        <dl className="text-lg mb-4">
          <dt>What is the difference between gross weight and volumetric weight?</dt>
          <dd>Gross weight is the actual weight of the package, while volumetric weight is calculated based on dimensions.</dd>
          <dt>Why do shipping companies use volumetric weight?</dt>
          <dd>To optimize space and prevent undercharging for large, lightweight packages.</dd>
          <dt>What is the standard divisor for calculating volumetric weight?</dt>
          <dd>The standard divisor is usually 6000 for air shipments.</dd>
        </dl>
      </div>
      <Footer />
    </div>
  );
};

export default WeightCalculator;