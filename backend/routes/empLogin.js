const express = require("express");
const router = express.Router();
const EmpLogin = require('../models/empLogin');

//Add Login
router.post("", (req, res, next) => {
  const empLogin = new EmpLogin({
    nic: req.body.nic,
    password: req.body.password,
    confPassword: req.body.confPassword
  });
  empLogin.save();
  res.status(201).json({
    message: 'Employee Login added successfully'
  });
});


//Get Login by NIC
router.get("/:nic", (req, res, next) => {
  EmpLogin.find({ nic: req.params.nic })
  .then(documents => {
    res.status(200).json({
      message: 'Employee Login fetched successfully by designation',
      empLogins: documents
    });
  });
});


module.exports = router;
