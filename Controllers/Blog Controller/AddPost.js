const BlogSchema = require('../../modals/BlogSchema');
const path = require("path");
const fs = require('fs');
const cloudinary = require('../../ImageHandlingFolder/CloudinaryUpload');

const AddPost = async(req,res,next)=>{
   const uploader = async (path)=>await cloudinary.uploads(path,'Images');
    const url = [];  
    console.log(req.files);
    const files = req.files

    for(const file of files){
        const {path}=file
        const newPath = await uploader(path)
        url.push(newPath);
        fs.unlinkSync(path)
    }
   const blog = new BlogSchema({
      Title:req.body.Title,   
      Description:req.body.Description,
      Image:url,
      Author:req.body.Author,
      createdAt: new Date(),
   });
   // console.log(url);
   if(req.files.length > 0){
      await blog.save();
      req.blog_id = blog._id;
      next();
    }else{
         res.status(202).json({msg:"There is no image selected to upload!!!"})
    }
   
}  

module.exports = AddPost