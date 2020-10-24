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
  attendance.save(); //data save to the DB in BE
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

//Get attendance by ID
router.get("/:id", (req, res, next) => {

  Attendance.findById(req.params.id)
  .then(documents => {
    if(documents){
      res.status(200).json({
        message: 'Attendance fetched successfully',
        attendances: documents
      });
    }else{
      res.status(404).json({message: 'Attendance record not found'});
    }
  });
});

//Update Attendance
router.put("/:id", (req, res, next) => {
  const at = new Date(req.body.date); //creating a date object for arrive time
  const lt = new Date(req.body.date); //creating a date object for leave time

  let arrive = req.body.arriveTime;
  let ar1 = arrive.split(":"); // spliting time into hours and minutes

  at.setHours(parseInt(ar1[0]) + 5, parseInt(ar1[1]) + 30, 0); // add time in to date object

  let leave = req.body.leaveTime;
  let ar2 = leave.split(":"); // spliting time into hours and minutes

  lt.setHours(parseInt(ar2[0]) + 5, parseInt(ar2[1]) + 30, 0); // add time in to date object
  const attendance = new Attendance({
      _id: req.body.id,
      fullName: req.body.fullName,
      nic: req.body.nic,
      empID: req.body.empID,
      date: req.body.date,
      designation: req.body.designation,
      arriveTime: at,
      leaveTime: lt,
  });
  Attendance.updateOne({_id: req.params.id}, attendance).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful"})
  })
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
