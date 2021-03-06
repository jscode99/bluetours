const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI, PORT } = require('./key');
const bodyParser = require('body-parser');
// const passportSetup = require('./config/passport');
var cors = require("cors");



//========= App ===========
const app = express();
//=========================

//======== DATABASE CONNECTION ============
mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  })
  .then(
    () => {
      console.log("====== Connected to database sucessfully======");
    },
    err => {
      /** handle initial connection error */
      console.log(err);
    },
  );
//==========================================



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//================================================= 
//=======Data parsing========
app.use(express.json())
//===========================

// parse application/json
app.use(bodyParser.json())
//=======================
app.use(cors());
//=======================



//======= Routes =============
const authRoute = require('./src/routes/auth');
const adminRoute = require("./src/routes/admin/auth");
const categoryRoute = require("./src/routes/Category");
const productRoute = require("./src/routes/Product");
const cartRoute = require('./src/routes/Cart');
//middleware
app.use('/api', authRoute);
app.use('/api', adminRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', cartRoute);
//============================



//==============PORT LISTENING===============
app.listen(PORT, () => {
    console.log(`======= Server is running on port ${PORT} =======`);
});
//============================================