const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Equipment = require("../models/equipment");

router.get("/", (req, res, next) => {
  Equipment.find()
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

router.post("/", async (req, res, next) => {
  try {
    const equipment = new Equipment({
      _id: mongoose.Types.ObjectId(),
      eid: req.body.eid,
      name: req.body.name,
      category: req.body.category,
      type: req.body.type,
    });
    const result = await equipment.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
