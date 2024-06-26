const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

module.exports = mongoose.model('Image', ImageSchema);