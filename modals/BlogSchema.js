const express = require('express');
const mongoose = require('mongoose');
const Comments  = require("./CommentSchema");

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
    },
    Comments:[{
        CommentId:{
          ref:"Comments",
          type:mongoose.Types.ObjectId}
        }],
},{ timestamps: true })
const BlogSchema=mongoose.model('Blog',blogschema);
module.exports = BlogSchema;