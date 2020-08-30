const mongoose = require("mongoose");
const equipmentSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    eid: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    allocation: { type: Boolean, required: true, default: false },
    project: { type: String },
    startDate: { type: Date },
    duration: { type: String },
    person: { type: String },
    remarks: { type: String },
    createdDate: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Equipment", equipmentSchema);
