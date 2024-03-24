const port = 4001;

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
const { log } = require('console');

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

app.use ('/images', express.static('/upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    return res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

/* Creation of Products Schema */

const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

/* Products Endpoint */

app.post("/addproduct", async (req, res) => {

let products = await Product.find({});

let id;

if (products.length>0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1;
    }

    else
    { 
    id = 1; 
    }

const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
});

console.log(product);

await product.save();

console.log("Saved");

res.json({success:true,name:req.body.name})
});

/* Removal of Products */

app.post("/removeproduct", async (req, res) => {
    const product = await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({success:true,name:req.body.name})
});

/* Getting All Products */

app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("Products Successfully Fetched");
    res.send(products);
});

/* Error If/Else */

app.listen(port, (error) => {
    if (!error) {
    console.log('Server is running on port: ' +port);
    }

    else {
    console.log("Error : "+error);
    }
});