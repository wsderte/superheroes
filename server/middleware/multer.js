import multer  from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const arr = ["image/png", "image/jpeg", "image/jpg"]

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true)
    }  else{
        cb(null, false)
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}

export const featuredImageUpload = multer({
  limits: {
      fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
      if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
          callback(null, true);
      } else {
          callback(new Error('Only .png, .jpeg format allowed!'));
      }
  }
});

export const middleware = multer({storage, fileFilter});