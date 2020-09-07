const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userUploadSchema = new Schema({
  file: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  class: { type: Schema.Types.ObjectId, ref: 'DanceClass' }
}, {
  timestamps: true
})

module.exports = mongoose.model('UserUpload', userUploadSchema);