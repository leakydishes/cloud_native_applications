const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  census_year: { type: Number, required: true },
  block_id: { type: Number, required: true },
  property_id: { type: Number, required: true },
  base_property_id: { type: Number, required: true },
  clue_small_area: { type: [String], required: true },
  trading_name: { type: [String], required: true },
  business_address: { type: [String], required: true },
  industry_anzsic4_code: { type: Number, required: true },
  industry_anzsic4_description: { type: [String], required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
});

const DashboardData = mongoose.model('dashboarddatas', dashboardSchema); // Note the collection name
module.exports = { DashboardData };
