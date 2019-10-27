const AWS = require("aws-sdk");
require("dotenv").config();
const multer = require("multer");
const multers3 = require("multer-s3");

AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_KEY
});

let s3 = new AWS.S3();

let imageUpload = multer({
  storage: multers3({
    s3: s3,
    bucket: "vaidarbom",
    acl: "public-read",
    key: (req, file, cb) => {
      //console.log(req);
      cb(
        null,
        Date.now().toString() +
          "_" +
          req.body.usuario +
          "." +
          file.mimetype.slice(file.mimetype.indexOf("/") + 1)
      );
    }
  })
});

module.exports = {
  multer: imageUpload
};
