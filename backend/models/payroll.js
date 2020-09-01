const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payrollSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  baseSalary: {
    type: Number,
    required: true,
  },
  paymentHistory: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Salary",
    },
  ],
  maxLeaves: {
    type: Number,
    required: true,
  },
  penaltyForLeaves: {
    type: Number,
    required: true,
  },
  payForOTHour: {
    type: Number,
    required: true,
  },
});

module.exports = payroll = mongoose.model("payroll", payrollSchema);
