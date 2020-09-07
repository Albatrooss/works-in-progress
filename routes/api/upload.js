const express = require('express');
const router = express.Router();

const UserVideo = require('../../models/UserVideo');
const { upload, userUpload } = require('../../fileUpload')

const singleUploadMain = upload.single('video');
const singleUploadUser = userUpload.single('video');

router.post('/class-video', (req, res) => {
  singleUploadMain(req, res, function (err) {
    if (err) {
      res.json(err)
    }
    return res.json({ 'videoUrl': req.file.location })
  })
})

router.post('/user-upload', (req, res) => {
  singleUploadUser(req, res, function (err) {
    if (err) {
      res.json(err);
    }
    return res.json({ 'videoUrl': req.file.location })
  })
})

router.post('/user-save', async (req, res) => {
  try {
    let userVid = new UserVideo(req.body);
    let resp = await userVid.save();
    res.json(resp)
  } catch (err) {
    res.json(err);
  }
})

router.post('/check', async (req, res) => {
  try {
    let resp = await UserVideo.findOne({ class: req.body.class, user: req.body.user })
    if (resp) return res.json({ uploaded: true });
    return res.status(204).json({ uploaded: false })
  } catch (err) {
    res.status(500).json({ uploaded: false, err: err });
  }
})

module.exports = router