const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const liveSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dayOfWeek: { type: Number, min: 1, max: 7 },
  time: { type: Number, min: 0, max: 23.5 },
  zoomLink: { type: String },
  instructor: {
    type: String,
    default: 'Caitline Elmslie'
  },
  enrolled: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
}, {
  timestamps: true
})

module.exports = mongoose.model('LiveClass', liveSchema)