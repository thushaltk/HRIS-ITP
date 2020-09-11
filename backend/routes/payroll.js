const router = require("express").Router();
const Payroll = require("../models/payroll");
const Employee = require("../models/employee");

router.get("/", async (req, res) => {
  try {
    await Payroll.find({})
      .populate("employee")
      .populate("paymentHistory")
      .exec((error, payroll) => {
        if (error) return res.status(500).send(error);
        return res.status(200).send(payroll);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    await Payroll.findOne({ employee: req.params.id })
      .populate("employee")
      .populate("paymentHistory")
      .exec((error, payroll) => {
        if (error) return res.status(500).send(error);
        return res.status(200).send(payroll);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//id is the employee _id
router.post("/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).send("User not found");
    const findPayroll = await Payroll.findOne({ employee: req.params.id });
    if (findPayroll) return res.status(409).send("Payroll already exists");

    const { baseSalary, maxLeaves, penaltyForLeaves, payForOTHour } = req.body;
    const payroll = new Payroll({
      employee: req.params.id,
      baseSalary,
      maxLeaves,
      penaltyForLeaves,
      payForOTHour,
    });

    await payroll.save();
    return res.status(201).send(payroll);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const payroll = await Payroll.findOne({ employee: req.params.id });
    if (!payroll) return res.status(404).send("Employee not found!");
    const { baseSalary, maxLeaves, penaltyForLeaves, payForOTHour } = req.body;
    if (baseSalary) {
      payroll.baseSalary = baseSalary;
      payroll.paymentHistory = [];
    }
    if (maxLeaves) payroll.maxLeaves = maxLeaves;
    if (penaltyForLeaves) payroll.penaltyForLeaves = penaltyForLeaves;
    if (payForOTHour) payroll.payForOTHour = payForOTHour;
    await payroll.save();
    return res.status(200).json({
      message: "Payroll updated",
      payroll,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let payroll = await Payroll.findOne({ employee: req.params.id });
    if (!payroll) {
      payroll = await Payroll.findById(req.params.id);
    }
    await payroll.remove();
    return res.status(200).send(`Payroll ${req.params.id} was deleted`);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
