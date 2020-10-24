const router = require("express").Router();
const Salary = require("../models/Salary");
const Payroll = require("../models/payroll");
const Employee = require("../models/employee");
const Attendance = require("../models/attendance");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    // const salary = await Salary.find({});
    // return res.status(200).send(salary);
    await Salary.find({})
      .populate("employee")
      .exec((error, salary) => {
        if (error) return res.status(500).send(error);
        return res.status(200).send(salary);
      });
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

router.get("/user/:nic", async (req, res) => {
  try {
    const emp = await Employee.findOne({ nic: req.params.nic });
    if (!emp) return res.status(404).send("User not found");

    const salaries = await Salary.find({ employee: emp._id });
    return res.status(200).send(salaries);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/:nic", async (req, res) => {
  try {
    const emp = await Employee.findOne({ nic: req.params.nic });
    if (!emp) return res.status(404).send("User not found");
    const payroll = await Payroll.findOne({ employee: emp._id });
    if (!payroll) return res.status(404).send("Payroll not found");

    const { otStart, date } = req.body;

    let thisMonth = new Date(date);

    const findSalary = await Salary.findOne({
      employee: emp._id,
      month: thisMonth.getMonth() + 1,
    });
    if (findSalary) return res.status(409).send("Salary already paid");

    prevMonth = new Date(
      thisMonth.getFullYear(),
      thisMonth.getMonth() - 1,
      thisMonth.getDate()
    );

    const attendance = await Attendance.find({
      nic: req.params.nic,
      arriveTime: {
        $lte: thisMonth.toISOString(),
        $gte: prevMonth.toISOString(),
      },
    });
    if (!attendance) return res.status(404).send("Attendance not found");

    let noOfDays = 0;
    let workhours = 0;
    let otHours = 0;
    let needDays = 20;

    attendance.map((days) => {
      console.log(days);
      noOfDays++;
      workhours = days.arriveTime.getHours() - days.leaveTime.getHours();
      console.log(`work hours${workhours}`);
      if (workhours > otStart) {
        otHours += workhours - otStart;
      }
    });

    amountOfLeaves = needDays - noOfDays;
    console.log(amountOfLeaves);

    if (amountOfLeaves > payroll.maxLeaves) {
      penaltyForLeaves =
        payroll.penaltyForLeaves * (amountOfLeaves - payroll.maxLeaves);
    }

    if (otHours > 0) {
      otPay = otHours * payroll.payForOTHour;
    } else {
      otPay = 0;
    }

    amount = payroll.baseSalary + otPay - penaltyForLeaves;

    const salary = new Salary({
      amount,
      month: thisMonth.getMonth() + 1,
      date: thisMonth,
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
// router.patch("/:id", async (req, res) => {
//   try {
//     const salary = await Salary.findById(req.params.id);
//     if (!salary) return res.status(404).send("Salary not found");
//     const payroll = await Payroll.findOne({ employee: salary.employee });
//     if (!payroll) return res.status(404).send("Payroll not found");
//     const { month, otHours } = req.body;
//     if (month) salary.month = month;

//     if (otHours) {
//       salary.amount -= salary.otPay;
//       salary.otHours = otHours;
//       if (otHours > 0) {
//         salary.otPay = otHours * payroll.payForOTHour;
//         salary.amount += salary.otPay;
//       }
//     }

//     await salary.save();
//     return res.status(200).json({
//       message: "Salary updated",
//       salary,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// });

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
