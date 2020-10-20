const express = require("express");
const router = express.Router();

const Attendance = require("../models/attendance");

//Add Attendance
router.post("", (req, res, next) => {
  const at = new Date(req.body.date); //creating a date object for arrive time
  const lt = new Date(req.body.date); //creating a date object for leave time

  let arrive = req.body.arriveTime;
  let ar1 = arrive.split(":"); // spliting time into hours and minutes

  at.setHours(parseInt(ar1[0]) + 5, parseInt(ar1[1]) + 30, 0); // add time in to date object

  let leave = req.body.leaveTime;
  let ar2 = leave.split(":"); // spliting time into hours and minutes

  lt.setHours(parseInt(ar2[0]) + 5, parseInt(ar2[1]) + 30, 0); // add time in to date object

  const attendance = new Attendance({
    fullName: req.body.fullName,
    nic: req.body.nic,
    empID: req.body.empID,
    date: req.body.date,
    designation: req.body.designation,
    arriveTime: at,
    leaveTime: lt,
  });
  attendance.save();
  res.status(201).json({
    message: "Attendance Record added successfully",
  });
});

//Reteive Attendance
router.get("", (req, res, next) => {
  Attendance.find().then((documents) => {
    res.status(200).json({
      message: "Employees fetched successfully",
      attendances: documents,
    });
  });
});

//Delete Attendance
router.delete("/:id", (req, res, next) => {
  Attendance.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Employee Deleted",
    });
  });
});

module.exports = router;
