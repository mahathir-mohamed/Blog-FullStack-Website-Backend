const express= require('express');
const mongoose= require('mongoose');

const User = new mongoose.Schema({
    Email:{
        type:String,
       
    },
    Password:{
        type:String,
      
    }
});

const user = mongoose.model('User',User)
module.exports = user;
