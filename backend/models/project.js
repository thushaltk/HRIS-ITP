const mongoose = require("mongoose");
const projectSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    projectId: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    duration: { type: String, required: true },
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    clientAddress: { type: String, required: true },
    progress: { type: String, required: true },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    consultant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    employees: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
