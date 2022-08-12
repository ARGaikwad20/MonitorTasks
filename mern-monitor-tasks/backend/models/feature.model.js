const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const featureSchema = new Schema({
  featurename: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  devname: { type: String, required: true },
}, {
  timestamps: true,
});

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;