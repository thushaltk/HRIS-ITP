const express = require("express");
const router = express.Router();

const LongLeave = require('../models/longLeave');

//Add Long Leave
router.post("", (req, res, next) => {
  const longLeave = new LongLeave({
    empID: req.body.empID,
    time: req.body.time,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reason: req.body.reason,
    status: req.body.status
  });
  longLeave.save();
  res.status(201).json({
    message: 'Long Leave added successfully'
  });
});

//Retrieve Long Leave
router.get("", (req, res, next) => {
  LongLeave.find()
    .then(documents => {
      res.status(200).json({
        message: 'Long Leave fetched successfully',
        longLeaves: documents
      });
    });
});



//Retrieve Long Leave by empID
router.get("/:id", (req, res, next) => {
  LongLeave.find({_id: req.params.id})
    .then(documents => {
      res.status(200).json({
        message: 'Long Leave fetched successfully',
        longLeaves: documents
      });
    });
});

//Update long leave status
router.put("/:id", (req, res, next) => {
  const longLeave = new LongLeave({
    _id: req.body.id,
    empID: req.body.empID,
    time: req.body.time,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reason: req.body.reason,
    status: req.body.status
  });
  LongLeave.updateOne({_id: req.params.id}, longLeave).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Long leave updated successfully'
    });
  });
});

//Delete Announcemets
router.delete("/:id", (req, res, next) => {
  LongLeave.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Long Leave Deleted"
    });
  });

});

module.exports = router;
