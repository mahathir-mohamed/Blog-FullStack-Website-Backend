// const mongoose = require('mongoose');
const  User = require("../../modals/UserSchema");

const LikedBlogs = async (req,res)=>{
    const LikedBlogs = User.findByIdAndUpdate({_id:req.params.id},{$push:{"likes":{BlogId:req.body.blog_id}}},(err,docs)=>{
        if(err){
            console.log(err)
        }
        if(docs){
           res.status(200).json({msg:"Successfully updated",result:docs});
        }else{
            res.status(202).json({msg:"sorry document not found"})
        }
    })
}

module.exports = LikedBlogs