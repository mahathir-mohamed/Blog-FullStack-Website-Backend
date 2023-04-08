// const mongoose = require('mongoose');
const  User = require("../../modals/UserSchema");

const RemoveLikedBlogs = async (req,res)=>{
    const LikedBlogs = User.findByIdAndUpdate({_id:req.params.id},{$pull:{"likes":{BlogId:req.body.blog_id}}},(err,docs)=>{
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

module.exports = RemoveLikedBlogs