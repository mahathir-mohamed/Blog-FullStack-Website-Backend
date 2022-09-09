const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.DATABASE,{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {console.log('Hurray Connected!!!')}).catch(err => {console.error('OOPS Something Went Wrong!!!')});

var confiq = module.exports;