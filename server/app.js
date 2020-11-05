const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI, PORT } = require('./key');
const bodyParser = require('body-parser');
const passportSetup = require('./config/passport');
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
      console.log("Database connected");
    },
    err => {
      /** handle initial connection error */
      console.log(err);
    },
  );
//==========================================




//=======Data parsing========
app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//============================
app.use(cors());



//======= Routes =============
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin/auth');
//middleware
app.use('/api', authRoute);
app.use('/api', adminRoute);
//============================



//==============PORT LISTENING===============
app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
});
//============================================