const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songReqSchema = new Schema({
  song: String,
  dance: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

module.exports = mongoose.model('songRequest', songReqSchema);