const songRequest = require('../models/SongRequest');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const createJWT = user => {
  return jwt.sign(
    { user },
    SECRET
  )
}

const create = async (req, res) => {
  console.log(req.headers.authorization)
  try {
    let newSongReq = new songRequest(req.body);
    let result = await newSongReq.save();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
}

const getAll = async (req, res) => {
  try {
    let allReqs = await songRequest.find({});
    res.json(allReqs);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  getAll,
  create
}