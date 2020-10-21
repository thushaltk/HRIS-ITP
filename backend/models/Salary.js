const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalarySchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  month: {
    type: Number,
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  amountOfLeaves: {
    type: Number,
    required: true,
  },
  otHours: {
    type: Number,
    required: true,
  },
  otPay: {
    type: Number,
    required: true,
  },
  penaltyForLeaves: {
    type: Number,
    required: true,
  },
});

module.exports = Salary = mongoose.model("Salary", SalarySchema);
