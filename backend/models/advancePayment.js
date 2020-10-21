const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const advancePaymentSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  pending: {
    type: Boolean,
    required: true,
    default: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
});

module.exports = AdvancePayment = mongoose.model(
  "AdvancePayment",
  advancePaymentSchema
);
