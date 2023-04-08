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
    Image:[
        {url:String,
        id:String}
    ],
    Author:{
        ref:"User",
        type:mongoose.Types.ObjectId
    }

},{ timestamps: true })
const BlogSchema=mongoose.model('BlogSchema',blogschema);
module.exports = BlogSchema;