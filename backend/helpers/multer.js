const multer = require("multer");

const FILE_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, res, cb) {
    const ext = FILE_TYPE[file.mimetype];
    const fileName = file.originalname.split(".")[0].replaceAll("", "-");
    if (ext == undefined) {
      cb(new Error("Wrong file type uploded"));
    }
    cb(null, `${fileName}-${Date.now()}.${ext}`);
  },
});

const uploadOption = multer({ storage: storage });

module.exports = uploadOption;
