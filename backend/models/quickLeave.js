const mongoose = require('mongoose');
const quickLeaveSchema = mongoose.Schema({
  time: {type: String, required: true},
  date: {type: String, required: true},
  reason: {type: String, required: true}
});

module.exports = mongoose.model('QuickLeave', quickLeaveSchema);
