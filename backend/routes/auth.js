const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

const Employee = require("../models/employee");

router.post("/", async (req, res) => {
  const { nic, password } = req.body;
  console.log(nic);

  try {
    let employee = await Employee.findOne({ nic });

    if (!employee) return res.status(401).send("Invalid Credentials");

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) return res.status(401).send("Invalid Credentials");

    const payload = {
      user: {
        id: employee.id,
        nic: employee.nic,
      },
    };

    const userNic = employee.nic;
    const userId = employee._id;

    // console.log(config.get());
    jwt.sign(
      payload,
      "dasuigkxzjlmffsjalkfjasdandasdao",
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, userNic, userId });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
module.exports = router;
