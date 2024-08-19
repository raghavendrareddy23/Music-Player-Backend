const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   // Define allowed file types for each field
//   const imageFileTypes = /jpeg|jpg|png/;
//   const audioFileTypes = /mp3|wav|flac/;

//   // Determine the field and validate accordingly
//   const isImage = file.fieldname === "poster";
//   const isAudio = file.fieldname === "song";

//   console.log("Fieldname:", file.fieldname);
//   console.log("File Extension:", path.extname(file.originalname).toLowerCase());
//   console.log("Mimetype:", file.mimetype);

//   let valid = false;

//   if (isImage) {
//     valid =
//       imageFileTypes.test(path.extname(file.originalname).toLowerCase()) &&
//       imageFileTypes.test(file.mimetype);
//   } else if (isAudio) {
//     valid =
//       audioFileTypes.test(path.extname(file.originalname).toLowerCase()) &&
//       audioFileTypes.test(file.mimetype);
//   }

//   if (valid) {
//     return cb(null, true);
//   } else {
//     return cb(
//       new Error(
//         "Only images (jpeg, jpg, png) and audio files (mp3, wav, flac) are allowed!"
//       )
//     );
//   }
// };

const upload = multer({
  storage: storage,
});

const uploadMultiple = upload.fields([
  { name: "poster", maxCount: 1 },
  { name: "song", maxCount: 1 },
]);

module.exports = uploadMultiple;
