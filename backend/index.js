const port = 4000;

/* express for server */

const express = require('express');
const app = express();

/* mongoose for database */

const mongoose = require('mongoose');

/* json web token for authentication */

const jwt = require('jsonwebtoken');

/* multer for images */

const multer = require('multer');

/* path for access to backend from express app */

const path = require('path');

/* cors for allowing/restricting requested resources */

const cors = require('cors');

/**/

app.use(express.json());
app.use(cors());

/* connect to database (mongodb) */

mongoose.connect('mongodb+srv://kakoii:Jh122304!@ratcave.ystwvhn.mongodb.net/ratcave')

/* API Creation */

app.get('/', (req, res) => {
    res.send('Express App is Running!');
});

/* Image Storage (Multer) */

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage
});

/* Image Upload Endpoint */

app.post('/upload', upload.single('product'), (req, res) => {
    return res.json({path: req.file.path});
});

/* Error If/Else */

app.listen(port, (error) => {
    if (!error) {
        console.log('(Server is running on port: ' +port);
    }
    else
    {
    console.log("Error : "+error);
    }
});