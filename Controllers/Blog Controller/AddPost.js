const BlogSchema = require('../../modals/BlogSchema');
const path = require("path");
const fs = require('fs');
const cloudinary = require('../../ImageHandlingFolder/CloudinaryUpload');

const AddPost = async(req,res)=>{
   const uploader = async (path)=>await cloudinary.uploads(path,'Images');
    const url = [];
   //  console.log(req.files);
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
   await blog.save();
   // console.log(blog);   
   // console.log(blog._id);
   res.status(200).json({msg:"Successfully Uploaded",id:blog._id})
   
}  

module.exports = AddPost