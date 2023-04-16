const mongoose = require('mongoose');

const Comment = mongoose.Schema({
    User:{
        ref:"User",
        type:mongoose.Types.ObjectId
    },
    Comment:{
        type:String
    },
},{ timestamps: true })

const CommentSchema =  mongoose.model('Comments',Comment);

module.exports = CommentSchema;