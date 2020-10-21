const router = require("express").Router();
const Employee = require("../models/employee");
const AdvancePayment = require("../models/advancePayment");

router.get("/", async (req, res) => {
  try {
    const advancePayments = await AdvancePayment.find({});
    return res.status(200).send(advancePayments);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const advancePayment = await AdvancePayment.findById(req.params.id);
//     if (!advancePayment)
//       return res.status(404).send("AdvancePayment not found");
//     return res.status(200).send(advancePayment);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// });

router.get("/:nic", async(req, res)=>{
  try {
    const emp = await Employee.findOne({nic: req.params.nic});
    if(!emp) return res.status(404).send("User not found");
    const advancePayments = await AdvancePayment.find({employee: emp._id});
    return res.status(200).send(advancePayments);
  } catch (error) {
    return res.status(500).send(error);
  }
})

router.post("/:nic", async (req, res) => {
  try {
    const emp = await Employee.findOne({ nic: req.params.nic });
    if (!emp) return res.status(404).send("Employee not found!");

    const { requestingDate, amount, reason } = req.body;

    const oldDate = new Date(requestingDate);
    oldDate.setMonth(oldDate.getMonth() - 1);

    const date = new Date(requestingDate);
    console.log(date);

    const findAdvancePayment = await AdvancePayment.findOne({
      employee: emp._id,
      date: { $gte: oldDate },
    });
    if (findAdvancePayment)
      return res.status(404).send("AdvancePayment already requested!");

    const advancePayment = new AdvancePayment({
      employee: emp._id,
      date,
      amount,
      reason,
    });

    await advancePayment.save();
    return res.status(201).send(advancePayment);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    // const emp = await Employee.findOne({ nic: req.params.nic });
    // if (!emp) return res.status(404).send("Employee not found!");

    const advancePayment = await AdvancePayment.findById(req.params.id);
    if (!advancePayment)
      return res.status(404).send("AdvancePayment not found");

    const { date, amount, reason, approved } = req.body;

    // if (date) {
    //   const oldDate = new Date(req.body.date);
    //   oldDate.setMonth(oldDate.getMonth() - 1);

    //   const date = new Date(req.body.date);

    //   const findAdvancePayment = await AdvancePayment.findOne({
    //     employee: emp._id,
    //     date: { $gte: oldDate },
    //   });
    //   if (findAdvancePayment)
    //     return res.status(404).send("AdvancePayment already requested!");
    // }

    if (amount) advancePayment.amount = amount;
    if (reason) advancePayment.reason = reason;
    if (approved) advancePayment.approved = approved;

    await advancePayment.save();

    return res.status(200).json({
      message: "Advance Payment updated",
      advancePayment,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const advancePayment = await AdvancePayment.findById(req.params.id);

    await advancePayment.remove();
    return res.status(200).send(`Advance Payment ${req.params.id} was deleted`);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
