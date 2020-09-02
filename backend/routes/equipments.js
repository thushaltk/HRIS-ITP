const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Equipment = require("../models/equipment");
const { response } = require("express");

router.get("/", (req, res, next) => {
  Equipment.find()
    .populate("project")
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
    delete req.body._id;
    const equipment = new Equipment({
      _id: mongoose.Types.ObjectId(),
      ...req.body,
    });
    const result = await equipment.save();

    Equipment.findById(result._id)
      .populate("project")
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

router.delete("/", (req, res, next) => {
  console.log(req.body);
  Equipment.deleteMany({
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
  // Equipment.findByIdAndRemove(req.params.id)
  //   .exec()
  //   .then((doc) => {
  //     res.status(200).json(doc);
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       error: err,
  //     });
  //   });
});

router.patch("/", (req, res, next) => {
  Equipment.updateOne({ _id: req.body._id }, req.body)
    .exec()
    .then((response) => {

      Equipment.findById(req.body._id)
        .populate("project")
        .exec()
        .then((docs) => {
          res.status(201).json({
            equipment: docs,
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

module.exports = router;
