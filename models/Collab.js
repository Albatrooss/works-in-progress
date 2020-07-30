const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collabSchema = new Schema({
  name: { type: String, required: true },
  dueDate: { type: Schema.Types.Date, required: true },
  description: { type: String, required: true },
  video: String,
  instructor: { type: String, default: 'Caitline Elmslie' },
  enrolled: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
})

module.exports = mongoose.model('collab', collabSchema);