const User = require("../modals/UserSchema");
const path = require("path");
const fs = require('fs');
const cloudinary2 = require('../ImageHandlingFolder/CloudinaryUpload');
const cloudinary = require('cloudinary').v2;

const DestroyImage =  async(req,res,next)=>{
        // console.log(req.params.id);
        const url = [];
    if(req.files){
         const uploader = async (path)=>await cloudinary2.uploads(path,'Images');
         const files = req.files
         console.log(req.files); 
         for(const file of files){
        const {path}=file
        const newPath = await uploader(path)
        url.push(newPath);
        fs.unlinkSync(path)
         }
        }
        const DestroyImage =  User.findOne({_id:req.params.id},async (err,docs)=>{
           if(err){
             res.status(400).json({msg:"Something went wrong"})
           }
           if(docs){
            if(url.length > 0){
                // console.log(docs)
                for(let i=0;i<docs.Image.length;i++){
                    cloudinary.uploader.destroy(docs.Image[i].id)
                }
               req.Image = url
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