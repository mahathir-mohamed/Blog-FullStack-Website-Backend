const mongoose = require('mongoose');

const Comment = mongoose.Schema({
    User:{
        type:String
    },
    Image:{
        type:String
    },
    Comment:{
        type:String
    },
},{ timestamps: true })

const CommentSchema =  mongoose.model('Comments',Comment);

module.exports = CommentSchema;