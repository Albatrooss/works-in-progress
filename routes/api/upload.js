const express = require('express');
const router = express.Router();

const upload = require('../../fileUpload')

const singleUpload = upload.single('video');

router.post('/class-video', (req, res) => {
  singleUpload(req, res, function (err) {
    if (err) {
      console.log('here')
      res.json(err)
    }
    return res.json({ 'videoUrl': req.file.location })
  })
})

module.exports = router