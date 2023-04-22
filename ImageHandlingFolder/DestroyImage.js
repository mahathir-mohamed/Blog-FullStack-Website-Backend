const User = require("../modals/UserSchema");
const path = require("path");
const fs = require('fs');
const cloudinary = require('../ImageHandlingFolder/Cloudinary');
// const cloudinary = require('cloudinary').v2;

const DestroyImage =  async(req,res,next)=>{
        const DestroyImage =  User.findOne({_id:req.params.id},async (err,docs)=>{
           if(err){
             res.status(400).json({msg:"Something went wrong"})
           }
           if(docs){
            if(req.body.Image){
                // console.log(docs)
                for(let i=0;i<docs.Image.length;i++){
                    cloudinary.uploader.destroy(docs.Image[i].id)
                }
                const uploader = await cloudinary.uploader.upload(req.body.Image,'Images');
               req.Image = {
                  url:uploader.secure_url,
                  id:uploader.public_id
               };
               console.log(req.Image);
               next()       
            }else{
                console.log("not image updated"); 
                req.Image=docs.Image[0]
                // console.log(req.Image);
                next()  
            }}else{
                res.status(202).json({msg:"User not found",id:req.params.id})
            }
        })
}

module.exports = DestroyImage;