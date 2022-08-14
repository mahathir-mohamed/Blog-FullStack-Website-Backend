const express = require('express');
const mongoose = require('mongoose');

const blogschema=mongoose.Schema({
    Title:{
      type:String,
      required:true
    },
    Description:{
        type:String,
        required:true
    },
    image:{
        type:String
    }

})
const BlogSchema=mongoose.model('BlogSchema',blogschema);
module.exports = BlogSchema;