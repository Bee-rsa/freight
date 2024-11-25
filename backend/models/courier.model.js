import mongoose from "mongoose";

const courierSchema = new mongoose.Schema(
  {
    courierService: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    localMaxKilometers: { 
      type: Number, 
      min: 1, 
      required: true, 
    }, 
    localRateKilometers: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    regionalMaxKilometers: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    regionalRateKilometers: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    nationalMaxKilometers: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    nationalRateKilometers: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    localRateKilograms: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    localKilogramOverweightCharge: { 
      type: Number, 
      min: 1, 
      required: true, 
    }, 
    regionalRateKilograms: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    regionalKilogramOverweightCharge: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    nationalRateKilograms: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    nationalKilogramOverweightCharge: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 

    localBaseRate: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    localFuelSurcharge: { 
      type: Number, 
      min: 1, 
      required: true, 
    }, 
    regionalBaseRate: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    regionalFuelSurcharge: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    nationalBaseRate: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    nationalFuelSurcharge: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 

    localDimensionRate: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    localDimensionOverweightCharge: { 
      type: Number, 
      min: 1, 
      required: true, 
    }, 
    regionalDimensionRate: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    regionalDimensionOverweightCharge: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    nationalDimensionRate: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    nationalDimensionOverweightCharge: { 
      type: Number, 
      min: 1, 
      required: false, 
    },
    residentialDeliveryFee: { 
      type: Number, 
      min: 1, 
      required: false, 
    },
    signatureRequired: { 
      type: Number, 
      min: 1, 
      required: false, 
    },
    packageRedeliveryFee: { 
      type: Number, 
      min: 1, 
      required: false, 
    },
    dangerousGoodsHandlingFee: { 
      type: Number, 
      min: 1, 
      required: false, 
    },
    specialHandlingFee: { 
      type: Number, 
      min: 1, 
      required: false, 
    },
    saturdayDeliveryFee: { 
      type: Number, 
      min: 1, 
      required: false, 
    },
    holidayDeliveryFee: { 
      type: Number, 
      min: 1, 
      required: false, 
    },
    weekendPickupFee: { 
      type: Number, 
      min: 1, 
      required: false, 
    },
    nonStandardPickupFee: { 
      type: Number, 
      min: 1, 
      required: false, 
    }, 
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Courier = mongoose.model("Courier", courierSchema);

export default Courier;


