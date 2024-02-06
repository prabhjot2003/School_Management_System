
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/images");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() ;
        cb(null, file.fieldname + uniqueSuffix + path.extname(file.originalname));
    }
});

const imageUpload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            
            return cb(new Error('Please upload an image in PNG or JPG format.'));
        }
        cb(null, true);
    }
});











module.exports = {

imageUpload,

}