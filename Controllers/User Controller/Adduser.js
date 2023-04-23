const UserSchema = require('../../modals/UserSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require('fs');
const cloudinary = require('../../ImageHandlingFolder/Cloudinary');

const AddUser = async (req,res)=>{
  console.log(req.files);
  try{
    if(req.files.length > 0){
   const uploader = await cloudinary.uploader.upload(req.files[0].path,{resource_type:"auto",
            folder:"Blog"});
    if(uploader.url){
       fs.unlinkSync(req.files[0].path);
    }
  //  const files = req.files
  //   for(const file of files){
  //       const {path}=file
  //       const newPath = await uploader(path)
  //       url.push(newPath);
  //       fs.unlinkSync(path)
  //   }
    // console.log(uploader)
//   const pass = "123";
  console.log(req.body.Password);
  console.log(req.body.Email);
  bcrypt.genSalt(10).then((salt)=>{
    return bcrypt.hash(req.body.Password,salt)
  }).then((hash)=>{
     const User = new UserSchema({
     Email:req.body.Email,
     Username:req.body.Username,
     Password:hash,
     Image:{
      url:uploader.secure_url,
      id:uploader.public_id
     }
     });
     console.log(User);
     User.save();
     res.status(200).json({msg:"Succesfully account created"})
  }).catch((err)=>{
    console.error(err);
    res.status(202).json({msg:"Something Went Wrong"})
})}else{
  res.status(202).json({msg:"file not found"})
}
}catch(e){
  console.log(e);
  res.status(404).json("Something error occured")
}
}


module.exports = AddUser;