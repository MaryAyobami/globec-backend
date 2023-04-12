// const multer = require("multer");

// const imageFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only images.", false);
//   }
// };

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null,"uploads");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `images/electronics-${file.originalname}-${Date.now()}.${ext}`);
//   },
// });

// var uploadFile = multer({ storage: storage});
// module.exports = uploadFile;

const multer = require("multer");
const path = require('path')
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  },
});

var uploadFile = multer({ storage: storage});
module.exports = uploadFile;
