const mongoose = require('mongoose');
const empLoginSchema = mongoose.Schema({
  nic: { type: String, required: true},
  password: {type: String, required: true},
  confPassword: {type: String, required: true}
});

module.exports = mongoose.model('EmpLogin', empLoginSchema);
