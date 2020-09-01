const router = require("express").Router();
const Salary = require("../models/Salary");
const Payroll = require("../models/payroll");
const Employee = require("../models/employee");
const { SafeSubscriber } = require("rxjs/internal/Subscriber");

router.get("/", async (req, res) => {
  try {
    const salary = await Salary.find({});
    return res.status(200).send(salary);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//id is the salary id
router.get("/:id", async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) return res.status(404).send("Salary not found");
    return res.status(200).send(salary);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//id is the employee id
router.post("/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).send("User not found");
    const payroll = await Payroll.findOne({ employee: req.params.id });
    if (!payroll) return res.status(404).send("Payroll not found");
    const findSalary = await Salary.findOne({
      employee: req.params.id,
      month: req.body.month,
    });
    if (findSalary) return res.status(409).send("Salary already paid");
    const { month, amountOfLeaves, otHours } = req.body;
    let penaltyForLeaves = 0,
      otPay = 0,
      amount = 0;

    if (amountOfLeaves > payroll.maxLeaves) {
      penaltyForLeaves =
        payroll.penaltyForLeaves * (amountOfLeaves - payroll.maxLeaves);
    }

    if (otHours > 0) {
      otPay = otHours * payroll.payForOTHour;
    }

    amount = payroll.baseSalary + otPay - penaltyForLeaves;

    const salary = new Salary({
      amount,
      month,
      employee: emp,
      amountOfLeaves,
      otHours,
      otPay,
      penaltyForLeaves,
    });
    await salary.save();
    payroll.paymentHistory.push(salary);
    await payroll.save();
    return res.status(201).send(salary);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//id is the salary id
router.patch("/:id", async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) return res.status(404).send("Salary not found");
    const payroll = await Payroll.findOne({ employee: salary.employee });
    if (!payroll) return res.status(404).send("Payroll not found");
    const { month, otHours } = req.body;
    if (month) salary.month = month;

    if (otHours) {
      salary.amount -= salary.otPay;
      salary.otHours = otHours;
      if (otHours > 0) {
        salary.otPay = otHours * payroll.payForOTHour;
        salary.amount += salary.otPay;
      }
    }

    await salary.save();
    return res.status(200).json({
      message: "Salary updated",
      salary,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//id is the slary id
router.delete("/:id", async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) return res.status(404).send("Salary not found");
    const payroll = await Payroll.findOne({ employee: salary.employee });
    if (!payroll) return res.status(404).send("Payroll not found");
    await payroll.paymentHistory.pop(salary);
    await payroll.save();
    await salary.remove();
    return res.status(200).send(`Salary ${req.params.id} was deleted`);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
module.exports = router;
