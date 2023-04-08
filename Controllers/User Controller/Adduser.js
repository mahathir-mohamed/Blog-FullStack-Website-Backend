const UserSchema = require('../../modals/UserSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require('fs');
const cloudinary = require('../../ImageHandlingFolder/CloudinaryUpload');

const AddUser = async (req,res)=>{
    const uploader = async (path)=>await cloudinary.uploads(path,'Images');
    const url = [];
    const files = req.files
    console.log(req.files);
    for(const file of files){
        const {path}=file
        const newPath = await uploader(path)
        url.push(newPath);
        fs.unlinkSync(path)
    }

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
     Image:url
     });
     console.log(User);
     User.save();
     res.status(200).json({msg:"Succesfully account created"})
  }).catch((err)=>{
    console.error(err);
    res.status(404).json({msg:"Something Went Wrong"})
});
}


module.exports = AddUser;