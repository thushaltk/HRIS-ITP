const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const UtilObj = require("../util/util");

const Employee = require("../models/employee");

//Add Employees
router.post("", async (req, res, next) => {
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
    comment: req.body.comment,
  });

  await employee.save();
  res.status(201).json({
    message: "Employee added successfully",
  });
});

//Update Employees
router.put("/:id", (req, res, next) => {
  const employee = new Employee({
    _id: req.body.id,
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
    comment: req.body.comment,
  });
  Employee.updateOne({ _id: req.params.id }, employee).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successful" });
  });
});

router.post("/resetPassword/:nic", async (req, res) => {
  const nic = req.params.nic;
  console.log(req.body);

  let password = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < 7; i++) {
    password += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  //Encrypt the password
  const salt = await bcrypt.genSalt(10);
  enPwd = await bcrypt.hash(password, salt);

  console.log("Random Generated Password: ", password);

  await Employee.findOne({ nic }, (err, found_user) => {
    if (err) {
      return res.status(400).send(err);
    }

    console.log("User Details: ", found_user);

    if (!found_user) {
      return res.status(401).send("User not found");
    }

    found_user.password = enPwd;

    found_user.save((err, updated_user) => {
      if (err) {
        return res.status(400).send(err);
      }

      UtilObj.sendPasswordResetMail(found_user.email, password).catch((err) => {
        console.log(err);
      });

      return res.status(200).send("Password reset Success");
    });
  });

  //return res.status(200).send(enPwd);
});

router.patch("/updatePassword", auth, async (req, res, next) => {
  const email = req.body.email;
  const oldPass = req.body.oldPass;
  const newPass = req.body.newPass;

  Employee.findOne({ email }, async (err, found_user) => {
    if (err) return res.status(500).send(err);
  });

  if (!found_user) return res.status(404).send("Invalid Email");

  const isMatch = await bcrypt.compare(oldPass, found_user.password);

  if (!isMatch) return res.status(400).send("Old Password is incorrect");

  if (req.body.newPass) {
    const salt = await bcrypt.genSalt(10);
    enPass = await bcrypt.hash(newPass, salt);
    found_user.password = enPass;
  }

  found_user.save((err, updated_user) => {
    if (err) {
      return res.send(err).status(400);
    }

    return res.send("Password Update Success").status(200);
  });
});

//Reteive Employees
router.get("", (req, res, next) => {
  Employee.find().then((documents) => {
    res.status(200).json({
      message: "Employees fetched successfully",
      employees: documents,
    });
  });
});

//Reteive Employees by designation
router.get("/:empDes", (req, res, next) => {
  Employee.find({ empDes: req.params.empDes }).then((documents) => {
    res.status(200).json({
      message: "Employees fetched successfully by designation",
      employees: documents,
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
  Employee.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Employee Deleted",
    });
  });
});

module.exports = router;
