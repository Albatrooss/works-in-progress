const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const createJWT = user => {
  return jwt.sign(
    { user },
    SECRET
  )
}

const signup = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({
      err: { message: 'Email not found..' }
    });
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        res.status(401).json({ err: { message: 'Incorrect password..' } })
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  signup,
  login
}