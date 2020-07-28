const express = require('express');
const router = express.Router();

const upload = require('../../fileUpload')

const singleUpload = upload.single('image');

router.post('/class-video', (req, res) => {
  console.log(req.body)
  singleUpload(req, res, function (err) {
    if (err) {
      res.json(err)
    }
    return res.json({ 'imageUrl': req.file.location })
  })
})

module.exports = router