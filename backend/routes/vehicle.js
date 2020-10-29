// const router = require("express").Router();
const Vehicle = require("../models/vehicle");
const { response } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


//Get all the vehicle details
router.get("/", (req, res, next) => {
  Vehicle.find()
    .populate("employee")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//Search and get vehicle details
router.get("/:id", async (req, res) => {
  try {
    // await Vehicle.findById({ _id: req.params.id }, (error, result) => {
    //   if (error) return res.status(500).send(error);
    //   if (!result) return res.status(400).send("No results");
    //   return res.status(200).send(result);
    // });
    Vehicle.findById({_id: req.params.id})
    .populate("employee")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//Add new vehicle
router.post("/", async (req, res, next) => {
  try {
    delete req.body._id;
    const vehicle = new Vehicle({
      _id: mongoose.Types.ObjectId(),
      ...req.body,
    });
    const result = await vehicle.save();
    Vehicle.findById(result._id)
      .populate("employee")
      .exec()
      .then((docs) => {
        res.status(201).json(docs);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });

  } catch (error) {
    res.status(500).json(error);
  }
});

//update vehicle details
router.patch("/", (req, res, next) => {
  console.log(req.body);
  Vehicle.updateOne({ _id: req.body._id }, req.body)
    .exec()
    .then((response) => {

      Vehicle.findById(req.body._id)
        .populate("employees")
        .exec()
        .then((docs) => {
          res.status(201).json({
            vehicle: docs,
            res: response,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });


    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});


//Delete vehicle
router.delete("/", (req, res, next) => {
  console.log(req.body);
  Vehicle.deleteMany({
    _id: {
      $in: req.body
    }
  }, function (err, result) {
    if (err) {
      res.status(500).json({ message: err })

    } else {
      res.status(200).json(result)
    }
  })
});

module.exports = router;
