require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const path  = require('path');
const connectDb = require('./db')
const cors = require('cors');
const cookieParser = require("cookie-parser");
const initRoutes = require('./routes/index');
const crypto = require('crypto')



// const key = process.env.KEY
// const encrypted = '35780dd355880502d2fffb22bfe7da7b';
// var decipher = crypto.createDecipher('aes256', key);
// var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');

// console.log(decrypted)
const app = express();

// PORT
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());



//Initiate DB
connectDb();

//Initiate Routes
initRoutes(app);
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {

//   // Set static folder
//   app.use(express.static("client/build"));

//   // index.html for all page routes
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
