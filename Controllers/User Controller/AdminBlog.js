const mongoose = require('mongoose');
// const Blog = require("../../modals/BlogSchema");
const User = require('../../modals/UserSchema');

const AdminBlog = (req,res)=>{
    const FindBlog = User.findOne({_id:req.params.id},(err,docs)=>{
        if(err){
            res.status(404).json({msg:"Something went wrong!!!"})
        }

        if(docs){
            res.status(200).json({msg:"Succesfully blogs fetched",result:docs});
        }else{
            res.status(202).json({msg:"you did not created any blog yet"})
        }
    })

}

module.exports= AdminBlog;