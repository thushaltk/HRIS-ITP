const express = require("express");
const router = express.Router();

const QuickLeave = require('../models/quickLeave');

//Add Quick Leave
router.post("", (req, res, next) => {
  const quickLeave = new QuickLeave({
    time: req.body.time,
    date: req.body.date,
    reason: req.body.reason
  });
  quickLeave.save();
  res.status(201).json({
    message: 'Quick Leave added successfully'
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
