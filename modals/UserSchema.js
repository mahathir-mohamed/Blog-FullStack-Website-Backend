const express= require('express');
const mongoose= require('mongoose');
const blog = require('./BlogSchema');

const User = new mongoose.Schema({
    Email:{
        type:String,
    },
    Username:{
        type:String
    },
    Password:{
        type:String,
    },
    Blogs:[{
        BlogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: blog
    }
    }],
    likes:[{
        BlogId:{type:mongoose.Schema.Types.ObjectId,ref: blog}
    }],
    Image:[
        {url:String,
        id:String}
    ],
},{timestamps: true });

const user = mongoose.model('User',User)
module.exports = user;
