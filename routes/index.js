var express = require('express');
var router = express.Router();
const BlogSchema=require('../modals/BlogSchema');
const multer= require('multer');
const mongoose = require('mongoose');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const user  = require("../modals/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
require("dotenv").config();
const upload = require('../ImageHandlingFolder/MulterUpload.js');

const AddPost = require('../Controllers/Blog Controller/AddPost');
const AllPost = require('../Controllers/Blog Controller/AllPost');
const DeletePost = require('../Controllers/Blog Controller/DeletePost');
const EditPost = require('../Controllers/Blog Controller/EditPost');
const LikedBlogs = require('../Controllers/Blog Controller/LikedBlogs');
const RemoveLikedBlogs = require('../Controllers/Blog Controller/RemoveLikedBlogs');
const FavouriteBlog = require("../Controllers/Blog Controller/FavouriteBlog");

const unlinkAsync = promisify(fs.unlink)


// router.get('/',(req,res)=>{
//    res.render('Home',{message:null});
// })
// router.get('/Blog-Posts',(req,res)=>{
//    res.render('BlogScreen');
// })
// router.get('/Edit/:id',(req,res)=>{
//    BlogSchema.findOne({_id:req.params.id},(err,docs)=>{
//       if(err){
//          console.log(err);
//       }else{   
//          res.status(200).json({data:docs})
//          // res.render('Edit',{data:docs})
//          console.log(docs);
//       }
//    })
// })

router.post('/update/:id',upload.array('newimage'),EditPost);
router.post('/create-blog',upload.array('image'),AddPost);
router.get('/all-post',AllPost);
router.get('/delete/:id',DeletePost);
router.put('/likes/:id',LikedBlogs);
router.put('/RemoveLikes/:id',RemoveLikedBlogs);
router.post('/Favourite',FavouriteBlog);



// router.get('/signup', function(req, res, next) {
//   res.render("SignUp");
// });
// router.post('/signup',async (req,res)=>{
//   const hash = await bcrypt.hash(req.body.Password,10);
//   console.log(hash)

//   const User = new user({
//      Email:req.body.Email,
//      Password:hash 
//      })
//   await User.save();
//   res.render("SignUp");
// });

// router.post("/logout",(req,res)=>{
//    res.clearCookie("Token");
//    res.redirect("/");
// })
// router.post('/login',(req,res) => {
//    const User = user.findOne({Email:req.body.Email},(err,docs)=>{
//         if(err){
//          console.log(err);
//         }else{
//           if(docs){
//             console.log(docs);
//             const Token = jwt.sign({id:docs._id,Email:docs.Email},process.env.JWT_SECRET_KEY);
//             res.cookie('Token',Token,{
//                maxAge:60*60*24*30*1000
//              });
//             console.log(Token);
//             res.redirect("/");
//           }else{
//             console.log("item not present");
//             res.render("SignUp")
//           }
//         }
//    });
// })

// router.get("/",async(req,res)=>{
//    const isToken=req.cookies["Token"];
//    if(isToken==undefined){
//         res.render("SignUp")
//    }else{
//       const verified = await jwt.verify(isToken,process.env.JWT_SECRET_KEY);
//       if(verified){
//             res.render("Home");
//       }else{
//          res.render("SignUp");
//       }
   
//    }
// })

module.exports = router;
