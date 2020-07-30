const mongoose = require('mongoose');
const DanceClass = require('../models/DanceClass');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const getLegacy = async (req, res) => {
  try {
    let classes = await DanceClass.find({}).populate('user');
    if (classes.length > 0) {
      res.json({ classes })
    } else {
      res.status(404).json({ err: 'No classes found' });
    }
  } catch (err) {
    res.status(400).json({ err: 'Something went wrong..' })
  }
}

const getAll = async (req, res) => {
  try {
    let collabs = await DanceClass.find({ dueDate: { $gt: Date.now() }, type: 'C' });
    let danceClasses = await DanceClass.find({ type: 'D' });
    let classes = [...collabs, ...danceClasses];
    if (classes.length > 0) {
      // classes.forEach(clss => clss.enrolled = clss.enrolled.length)
      res.json({ classes })
    } else {
      res.status(404).json({ err: 'No classes found' });
    }
  } catch (err) {
    res.status(400).json({ err: 'Something went wrong..' })
  }
}

const getClasses = async (req, res) => {
  try {
    let classes = await DanceClass.find({ type: 'D' });
    if (classes.length > 0) {
      res.json({ classes })
    } else {
      res.status(404).json({ err: 'No classes found' });
    }
  } catch (err) {
    res.status(400).json({ err: 'Something went wrong..' })
  }
}

const getCollabs = async (req, res) => {
  try {
    let collabs = await DanceClass.find({ type: 'C', dueDate: { $gt: Date.now() } });
    if (collabs.length > 0) {
      res.json({ classes: collabs })
    } else {
      res.status(404).json({ err: 'No collabs found' });
    }
  } catch (err) {
    res.status(400).json({ err: 'Something went wrong..' })
  }
}

const add = async (req, res) => {
  console.log(req.body)
  let newClass = new DanceClass(req.body);
  try {
    newClass.save();
    res.json({ danceClass: newClass })
  } catch (err) {
    res.status(400).json(err)
  }
}

const getOne = async (req, res) => {
  try {
    let danceClass = await DanceClass.findOne({ _id: req.params.id })
    res.json(danceClass)
  } catch (err) {
    res.status(404).json({ message: 'Class not found..' })
  }
}

const getMine = async (req, res) => {
  console.log('here', req.body);
  try {
    let myClasses = await DanceClass.find({ enrolled: { $in: req.body.id }, type: 'D' })
    let myCollabs = await DanceClass.find({ enrolled: { $in: req.body.id }, type: 'C' })
    if (myClasses.length > 0 && myCollabs.length > 0) return res.json({ myClasses, myCollabs });
    res.status(404).json({ message: 'You have no classes to show..' })
  } catch (err) {
    res.status(500).json({ err })
  }
}

const deleteOne = async (req, res) => {
  try {
    let deletedClass = await DanceClass.remove({ _id: req.params.id });
    res.json({ deletedClass })
  } catch (err) {
    res.status(400).json({ err: 'Something went wrong..' })
  }
}

const deleteAll = async (req, res) => {
  try {
    console.log('here')
    let response = await DanceClass.deleteMany({});
    console.log('there', response)
    res.json({ response })
  } catch (err) {
    res.status(400).json({ err: 'Something went wrong..' })
  }
}

const enroll = async (req, res) => {
  try {
    let user = await User.findById(req.body.id);
    let newClass = await DanceClass.findById(req.params.id);
    if (newClass.enrolled.includes(req.body.id)) {
      res.status(400).json({ message: 'You have all ready enrolled in this class..' })
    } else {
      let updatedClass = await DanceClass.findOneAndUpdate({ _id: req.params.id }, { $push: { enrolled: user } });
      res.json(updatedClass);
    }
  } catch (err) {
    res.status(500).json({ err })
  }
}

const unenroll = async (req, res) => {
  try {
    let newClass = await DanceClass.findById(req.params.id);
    if (!newClass.enrolled.includes(req.body.id)) {
      res.status(400).json({ message: 'You have not enrolled in this class..' })
    } else {
      let updatedClass = await DanceClass.findOneAndUpdate({ _id: req.params.id }, { $pull: { enrolled: req.body.id } });
      res.json(updatedClass);
    }
  } catch (err) {
    res.status(500).json({ err })
  }
}

/*----------ADMIN--------------*/

const getOnePopulated = async (req, res) => {
  try {
    console.log(req.params.id)
    let danceClass = await DanceClass.findOne({ _id: req.params.id }).populate('enrolled');
    res.json(danceClass)
  } catch (err) {
    res.status(404).json({ message: 'Class not found..' })
  }
}

const getAllPopulated = async (req, res) => {
  try {
    // if (req.user && process.env.REACT_APP_ADMINS.includes(req.user._id)) {

    let classes = await DanceClass.find({ dueDate: { $gt: Date.now() }, type: 'C' }).populate('enrolled')
    let collabs = await DanceClass.find({ type: 'D' }).populate('enrolled')
    if (classes.length < 0 && classes.length < 0) {
      res.status(404).json({ err: 'No classes found' });
    } else {
      res.json({ classes, collabs })
    }
    // // } else {
    //   res.status(403).json({ err: "Access Denied" })
    // }
  } catch (err) {
    res.status(400).json({ err: 'Something went wrong..' })
  }
}


module.exports = {
  getAll,
  getClasses,
  getCollabs,
  getLegacy,
  add,
  getOne,
  getMine,
  deleteOne,
  deleteAll,
  enroll,
  unenroll,
  getAllPopulated,
  getOnePopulated
}