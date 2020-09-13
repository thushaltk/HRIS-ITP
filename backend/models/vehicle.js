const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
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
    type: Date,
    required: true,
  },
  vehicleColor: {
    type: String,
    required: true,
  },
  vehiclePurchaseDate: {
    type: Date,
    required: true,
  },
  vehicleOpenMileage: {
    type: Number,
    required: true,
  },
  insuranceType: {
    type: String,
    required: true,
  },
  vehicleRegistedDistrict: {
    type: String,
    required: true,
  },
  nextLicenceRenewalDate: {
    type: Date,
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
});

module.exports = Vehicle = mongoose.model("Vehicle", VehicleSchema);
