const express = require("express");
const router = express.Router();

const TrainingProgram = require('../models/trainingPrograms');

//Add Training Programs
router.post("", (req, res, next) => {
  const trainingProgram = new TrainingProgram({
    title: req.body.title,
    date: req.body.date,
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

//Reteive Training Programs
router.get("", (req, res, next) => {
  TrainingProgram.find()
    .then(documents => {
      res.status(200).json({
        message: 'Training Programs fetched successfully',
        trainingPrograms: documents
      });
    });
});

//Delete Training Program
router.delete("/:id", (req, res, next) => {
  TrainingProgram.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Training Program Deleted"
    });
  });

});

module.exports = router;
