const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 150 },
  measurement: { type: String, enum: ['Imperial', 'Metric'], default: 'Metric' },
});

module.exports = mongoose.model('Project', projectSchema);