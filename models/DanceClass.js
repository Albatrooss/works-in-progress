const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: { type: String, required: true },
  dueDate: { type: Schema.Types.Date, required: true },
  description: { type: String, required: true },
  video: String,
  instructor: { type: String, default: 'Caitline Elmslie' },
  enrolled: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
})

classSchema.set('toJSON', {
  transform: (doc, ret) => {
    let date = ret.dueDate
    ret.dueDate = [date.getHours(), date.getMinutes(), date.getDate(), date.getMonth(), date.getFullYear()];
    return ret;
  }
})

module.exports = mongoose.model('DanceClass', classSchema);