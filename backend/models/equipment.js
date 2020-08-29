const mongoose = require("mongoose");
const equipmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  eid: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model("Equipment", equipmentSchema);
