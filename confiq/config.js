const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0.qstdi.mongodb.net/blogApp',{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {console.log('Hurray Connected!!!')}).catch(err => {console.error('OOPS Something Went Wrong!!!')});

var confiq = module.exports;