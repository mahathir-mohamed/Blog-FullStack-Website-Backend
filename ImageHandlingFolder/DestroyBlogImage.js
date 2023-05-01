const Blog = require("../modals/BlogSchema");
const path = require("path");
const fs = require('fs');
const cloudinary = require('../ImageHandlingFolder/Cloudinary');
// const cloudinary = require('cloudinary').v2;

const DestroyBlogImage =  (req,res,next)=>{
    console.log(req.files);
        const DestroyBlogImage = Blog.findOne({_id:req.params.id},async(err,docs)=>{
           if(err){
             res.status(400).json({msg:"Something went wrong"})
           }
           if(docs){
            if(req.files){
                // console.log(req.files)
                for(let i=0;i<docs.Image.length;i++){
                    cloudinary.uploader.destroy(docs.Image[i].id)
                }
                
                try{
                const uploader = await cloudinary.uploader.upload("public/images/"+req.files.Image.name,{resource_type:"auto",
               folder:"Blog"});
                if(uploader.url){
                fs.unlinkSync("public/images/"+req.files.Image.name);
            }else{
                res.status(404).json({msg:"uplaoder not working"})
            }
            req.Image = {
                url:uploader.secure_url,
                id:uploader.public_id
            };
            next(); 
            }catch(e){
                console.log(e);
            }
            //    console.log(req.Image);      
            }else{
                console.log("not image updated"); 
                req.Image=docs.Image[0]
                next()  
            }}else{
                res.status(202).json({msg:"User not found",id:req.params.id})
            }
        })
}

module.exports = DestroyBlogImage;