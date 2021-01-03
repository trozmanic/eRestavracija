const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './app_public/src/assets/slike/jedi')
    },
    filename: function (req, file, cb) {
        cb(null, generateFileName(file.originalname))
    }
})

function generateFileName(originalName){
    var name = originalName.split('.');

    return name[0]+'-'+Date.now()+'.'+name[1];
}

const fileFilter = function (req, file, cb) {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpeg or png files are accepted"), false);
    }
}

var upload = multer({ storage: storage, limits: {fileSize: 1024 * 1024 * 5}, fileFilter: fileFilter}).single('image');

const shraniSliko = async (req, res) => {
    upload(req, res, function (err){
        console.log(req.body);
        if(err){
            console.log(req.file)
            res.status(500).json({"error_message": err});
        }
        console.log(req.file)
        var response = {
            image: req.file.path
        }
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(response))
    });
}

module.exports = {
    shraniSliko
}
