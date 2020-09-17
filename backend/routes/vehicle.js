const router = require("express").Router();
const Vehicle = require("../models/vehicle");


// router.get("", async (req, res) => {
//   try {
//     await Vehicle.find({}, (error, result) => {
//       if (error) return res.status(500).send(error);
//       if (!result) return res.status(404).send("No results");
//       return res.status(200).send(result);
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// });

//Get all the vehicle details
router.get("", (req, res, next) => {
  Vehicle.find()
    .then(documents => {
      res.status(200).json({
        message: 'Vehicles fetched successfully',
        vehicles: documents
      });
    });
});

//Search and get vehicle details
router.get("/:id", async (req, res) => {
  try {
    await Vehicle.findById({ _id: req.params.id }, (error, result) => {
      if (error) return res.status(500).send(error);
      if (!result) return res.status(400).send("No results");
      return res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//Add new vehicle
router.post("/", async (req, res) => {
  try {
    const {
      vehicleNumber,
      vehicleType,
      vehicleChaseNumber,
      vehicleEngineNumber,
      manufactureDate,
      vehicleColor,
      vehiclePurchaseDate,
      vehicleOpenMileage,
      insuranceType,
      vehicleRegisteredDistrict,
      nextLicenseRenewalDate,
      vehiclePreviousOwner,
      NIC,
      contactNumber,
      address,
    } = req.body;

    const vehicle = new Vehicle({
      vehicleNumber,
      vehicleType,
      vehicleChaseNumber,
      vehicleEngineNumber,
      manufactureDate,
      vehicleColor,
      vehiclePurchaseDate,
      vehicleOpenMileage,
      insuranceType,
      vehicleRegisteredDistrict,
      nextLicenseRenewalDate,
      vehiclePreviousOwner,
      NIC,
      contactNumber,
      address,
    });

    await vehicle.save();
    return res.status(201).send(vehicle);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//update vehicle details
router.patch("/:id", async (req, res) => {
  try {
    await Vehicle.findById({ _id: req.params.id }, async (error, vehicle) => {
      if (error) return res.status(500).send(error);
      if (!vehicle) return res.status(404).send("User not found");

      const {
        vehicleNumber,
        vehicleType,
        vehicleChaseNumber,
        vehicleEngineNumber,
        manufactureDate,
        vehicleColor,
        vehiclePurchaseDate,
        vehicleOpenMileage,
        insuranceType,
        vehicleRegistedDistrict,
        nextLicenceRenewalDate,
        vehiclePreviousOwner,
        NIC,
        contactNumber,
        address,
      } = req.body;
      if (vehicleNumber) vehicle.vehicleNumber = vehicleNumber;
      if (vehicleType) vehicle.vehicleType = vehicleType;
      if (vehicleChaseNumber) vehicle.vehicleChaseNumber = vehicleChaseNumber;
      if (vehicleEngineNumber)
        vehicle.vehicleEngineNumber = vehicleEngineNumber;
      if (manufactureDate) vehicle.manufactureDate = manufactureDate;
      if (vehicleColor) vehicle.vehicleColor = vehicleColor;
      if (vehiclePurchaseDate)
        vehicle.vehiclePurchaseDate = vehiclePurchaseDate;
      if (vehicleOpenMileage) vehicle.vehicleOpenMileage = vehicleOpenMileage;
      if (insuranceType) vehicle.insuranceType = insuranceType;
      if (vehicleRegistedDistrict)
        vehicle.vehicleRegistedDistrict = vehicleRegistedDistrict;
      if (nextLicenceRenewalDate)
        vehicle.nextLicenceRenewalDate = nextLicenceRenewalDate;
      if (vehiclePreviousOwner)
        vehicle.vehiclePreviousOwner = vehiclePreviousOwner;
      if (NIC) vehicle.NIC = NIC;
      if (contactNumber) vehicle.contactNumber = contactNumber;
      if (address) vehicle.address = address;

      await vehicle.save((error, savedVehicle) => {
        if (error) return res.status(500).send(error);
        return res.status(201).send(savedVehicle);
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});


// router.delete("/:id", async (req, res) => {
//   try {
//     await Vehicle.findById({ _id: req.params.id }, async (error, vehicle) => {
//       if (error) return res.status(500).send(error);
//       if (!vehicle) return res.status(404).send("User not found!");
//       await vehicle.remove((error, removedVehicle) => {
//         if (error) return res.status(500).send(error);
//         return res.status(200).send(removedVehicle);
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// });

//Delete vehicle
router.delete("/:id", (req, res, next) => {
  Vehicle.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Vehicle Deleted"
    });
  });

});

module.exports = router;
