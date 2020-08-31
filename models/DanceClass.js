const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  type: {
    type: String,
    enum: ['C', 'D'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: Schema.Types.Date,
  video: String,
  instructor: {
    type: String,
    default: 'Caitline Elmslie'
  },
  enrolled: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  icon: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('DanceClass', classSchema);