const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_KEY,
  region: 'us-east-1'
})

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'works-in-progress-bucket/dances',
    acl: 'public-read',
    contentType: function (req, file, cb) {
      cb(null, file.mimetype)
    },
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      let newKey = file.originalname.replace(' ', '');
      cb(null, newKey)
    }
  })
})
const userUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'works-in-progress-bucket/user-vids',
    acl: 'public-read',
    contentType: function (req, file, cb) {
      cb(null, file.mimetype)
    },
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      let newKey = file.originalname.replace(' ', '');
      cb(null, newKey)
    }
  })
})

module.exports = {
  upload,
  userUpload
};