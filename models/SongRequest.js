const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songReqSchema = new Schema({
  song: String,
  dance: String
}, {
  timestamps: true
})

module.exports = mongoose.model('songRequest', songReqSchema);