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

const unlinkAsync = promisify(fs.unlink)


const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'C:/Node Projects/CRUD/public/images');
  },
  filename: (req, file, cb)=> {
    cb(null,file.originalname+"_"+path.extname(file.originalname));
  }
})

var upload = multer({ storage })

// router.get('/',(req,res)=>{
//    res.render('Home',{message:null});
// })
router.get('/Blog-Posts',(req,res)=>{
   res.render('BlogScreen');
})
router.get('/Edit/:id',(req,res)=>{
   BlogSchema.findOne({_id:req.params.id},(err,docs)=>{
      if(err){
         console.log(err);
      }else{
         res.render('Edit',{data:docs})
         console.log(docs);
      }
   })
})
router.post('/update/:id',upload.single('newimage'),(req,res)=>{
    try {
    fs.unlinkSync("C:/Node Projects/CRUD/public/images/"+req.body.image);
    console.log("File is deleted.");
} catch (error) {
    console.log(error);
}
    BlogSchema.findByIdAndUpdate(req.params.id,{
      Title:req.body.newTitle,
      Description:req.body.newDescription,
      image:req.file.originalname+"_"+path.extname(req.file.originalname)
    }).then((docs)=>{
        //res.render('/all-Post');
        res.send("succesfully updated");
    }).catch(err => {
       res.status(500).send(err.message);
    })
});
router.post('/create-blog',upload.single('image'),async(req,res)=>{
   const blog = new BlogSchema({
      Title:req.body.Title,
      Description:req.body.Description,
      image:req.file.originalname+"_"+path.extname(req.file.originalname)
   });
   console.log(req.file);
   await blog.save();
   res.render('Home',{message:"Successfully Uploaded"});
   // res.send(blog);
   //console.log(blog);
})

router.get('/all-post',(req,res)=>{
   BlogSchema.find((err,docs)=>{
      if(err){
         console.log(err);
      }else{
         console.log(docs);
         res.render('BlogScreen',{data:docs});
      }
   });
});


router.get('/delete/:id', (req,res)=>{
   BlogSchema.findByIdAndDelete(req.params.id).then(async docs=>{
      if(!docs){
         res.status(404);
      }else{
         console.log(docs);
         try{
         await fs.unlinkSync("C:/Node Projects/CRUD/public/images/"+docs.image);
         }catch(err){
            console.log(err);
         }
         res.redirect('/all-post');
      }
   }).catch(error=>{
      console.log(error);
   })
})
router.get('/signup', function(req, res, next) {
  res.render("SignUp");
});
router.post('/signup',async (req,res)=>{
  const hash = await bcrypt.hash(req.body.Password,10);
  console.log(hash)

  const User = new user({
     Email:req.body.Email,
     Password:hash 
     })
  await User.save();
  res.render("SignUp");
});

router.post("/logout",(req,res)=>{
   res.clearCookie("Token");
   res.redirect("/");
})
router.post('/login',(req,res) => {
   const User = user.findOne({Email:req.body.Email},(err,docs)=>{
        if(err){
         console.log(err);
        }else{
          if(docs){
            console.log(docs);
            const Token = jwt.sign({id:docs._id,Email:docs.Email},process.env.JWT_SECRET_KEY);
            res.cookie('Token',Token,{
               maxAge:60*60*24*30*1000
             });
            console.log(Token);
            res.redirect("/");
          }else{
            console.log("item not present");
            res.render("SignUp")
          }
        }
   });
})

router.get("/",async(req,res)=>{
   const isToken=req.cookies["Token"];
   if(isToken==undefined){
        res.render("SignUp")
   }else{
      const verified = await jwt.verify(isToken,process.env.JWT_SECRET_KEY);
      if(verified){
            res.render("Home");
      }else{
         res.render("SignUp");
      }
   
   }
})

module.exports = router;
