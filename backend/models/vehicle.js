const mongoose = require("mongoose");
const vehicleSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    vehicleChaseNumber: {
      type: String,
      required: true,
    },
    vehicleEngineNumber: {
      type: String,
      required: true,
    },
    manufactureDate: {
      type: String,
      required: true,
    },
    vehicleColor: {
      type: String,
      required: true,
    },
    vehiclePurchaseDate: {
      type: String,
      required: true,
    },
    vehicleOpenMileage: {
      type: String,
      required: true,
    },
    insuranceType: {
      type: String,
      required: true,
    },
    vehicleRegisteredDistrict: {
      type: String,
      required: true,
    },
    nextLicenseRenewalDate: {
      type: String,
      required: true,
    },
    vehiclePreviousOwner: {
      type: String,
      required: true,
    },
    NIC: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    allocation: {
      type: Boolean,
      required: true,
      default: false 
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: false,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Vehicle", vehicleSchema);
