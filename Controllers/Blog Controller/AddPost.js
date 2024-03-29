const BlogSchema = require('../../modals/BlogSchema');
const path = require("path");
const fs = require('fs');
// const cloudinary = require('../../ImageHandlingFolder/CloudinaryUpload');
const cloudinary = require('../../ImageHandlingFolder/Cloudinary');

const AddPost = async(req,res,next)=>{
   if(req.files.Image){
   const uploader = await cloudinary.uploader.upload("public/images/"+req.files.Image.name,{
      resource_type:"auto",
      folder:"Blog"
   });
   if(uploader.url){
      fs.unlinkSync("public/images/"+req.files.Image.name);
   }
   console.log(uploader);
   const blog = new BlogSchema({
      Title:req.body.Title,   
      Description:req.body.Description,
      Image:{
         url:uploader.secure_url,
         id:uploader.public_id,
      },
      Author:req.body.Author,
      createdAt: new Date(),
   });
      await blog.save();
      req.blog_id = blog._id;
      next();
   }else{
      res.status(202).json({msg:"Please select thumbnail image to continue!!!"})
   }
   
}  

module.exports = AddPost