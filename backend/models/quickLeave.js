const mongoose = require('mongoose');
const quickLeaveSchema = mongoose.Schema({
  nic: {type: String, required: true},
  time: {type: String, required: true},
  date: {type: String, required: true}
});

module.exports = mongoose.model('QuickLeave', quickLeaveSchema);
