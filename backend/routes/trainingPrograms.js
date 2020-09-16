const express = require("express");
const router = express.Router();

const TrainingProgram = require('../models/trainingPrograms');

//Add Training Programs
router.post("", (req, res, next) => {
  const trainingProgram = new TrainingProgram({
    title: req.body.title,
    description: req.body.description,
    availability: req.body.availability,
    location: req.body.location,
    email: req.body.email
  });
  trainingProgram.save();
  res.status(201).json({
    message: 'Training Program added successfully'
  });
});

//Reteive Quick Leave
router.get("", (req, res, next) => {
  QuickLeave.find()
    .then(documents => {
      res.status(200).json({
        message: 'Quick Leave fetched successfully',
        quickLeaves: documents
      });
    });
});

//Delete Announcemets
router.delete("/:id", (req, res, next) => {
  QuickLeave.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Quick Leave Deleted"
    });
  });

});

module.exports = router;
