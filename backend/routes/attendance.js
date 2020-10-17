const express = require("express");
const router = express.Router();

const Attendance = require('../models/attendance');

//Add Attendance
router.post("", (req, res, next) => {
  const attendance = new Attendance({
    fullName: req.body.fullName,
    nic: req.body.nic,
    empID: req.body.empID,
    date: req.body.date,
    designation: req.body.designation,
    arriveTime: req.body.arriveTime,
    leaveTime: req.body.leaveTime
  });
  attendance.save();
  res.status(201).json({
    message: 'Attendance Record added successfully'
  });
});

//Reteive Attendance
router.get("", (req, res, next) => {
  Attendance.find()
    .then(documents => {
      res.status(200).json({
        message: 'Employees fetched successfully',
        attendances: documents
      });
    });
});

//Delete Attendance
router.delete("/:id", (req, res, next) => {
  Attendance.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Employee Deleted"
    });
  });

});

module.exports = router;
