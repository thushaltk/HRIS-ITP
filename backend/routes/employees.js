const express = require("express");
const router = express.Router();

const Employee = require('../models/employee');

//Add Employees
router.post("", (req, res, next) => {
  const employee = new Employee({
    fullName: req.body.fullName,
    dob: req.body.dob,
    nic: req.body.nic,
    empID: req.body.empID,
    gender: req.body.gender,
    address: req.body.address,
    cnumber: req.body.cnumber,
    email: req.body.email,
    empDes: req.body.empDes,
    doj: req.body.doj,
    comment: req.body.comment
  });
  employee.save();
  res.status(201).json({
    message: 'Employee added successfully'
  });
});



//Reteive Employees
router.get("", (req, res, next) => {
  Employee.find()
    .then(documents => {
      res.status(200).json({
        message: 'Employees fetched successfully',
        employees: documents
      });
    });
});

//Reteive Employees by designation
router.get("/:empDes", (req, res, next) => {
  Employee.find({ empDes: req.params.empDes })
    .then(documents => {
      res.status(200).json({
        message: 'Employees fetched successfully by designation',
        employees: documents
      });
    });
});

//Retrieve Employees by NIC
// router.get("/:nic", (req, res, next) => {
//   Employee.find({ nic: req.params.nic })
//     .then(documents => {
//       res.status(200).json({
//         message: 'Employees fetched successfully by nic',
//         employees: documents
//       });
//     });
// });

//Delete Employees
router.delete("/:id", (req, res, next) => {
  Employee.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Employee Deleted"
    });
  });

});

module.exports = router;
