const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  census_year: { type: Number, required: true },
  location: { type: String, required: true },
  trading_name: { type: String, required: true },
  business_address: { type: String, required: true },
  industry_description: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = {
  Task
};
