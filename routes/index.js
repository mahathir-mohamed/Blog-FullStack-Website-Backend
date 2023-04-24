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
const MyBlog = require('../Controllers/Blog Controller/myBlog');
const FindMyBlog = require('../Controllers/Blog Controller/FindMyBlog');
const FindPost = require("../Controllers/Blog Controller/FindPost")
const RemoveMyBlog = require('../middlewares/RemoveMyBlog');
const RemovelikedBlog = require("../middlewares/RemovelikedBlog");
const RecommentBlog = require("../Controllers/Blog Controller/RecommentBlog");

const unlinkAsync = promisify(fs.unlink)


// router.post('/update/:id',upload.array('newimage'),EditPost);

router.post('/create-blog/:id',upload.array('Image'),AddPost,MyBlog);
router.get('/all-post',AllPost);
router.post('/delete/:id',RemoveMyBlog,RemovelikedBlog,DeletePost);
router.put('/likes/:id',LikedBlogs);
router.put('/RemoveLikes/:id',RemoveLikedBlogs);
router.post('/Favourite',FavouriteBlog);
router.get("/MyBlogs/:id",FindMyBlog);
router.get("/FindPost/:id",FindPost);
router.get("/RecommentPost/:id",RecommentBlog);
router.post("/image-upload",async(req,res)=>{
   if(req.files){
    console.log(req.files);
    console.log("Successfully uploaded");
    res.status(200).json("sucess")
   }else{
     res.status(202).json({msg:"no file found"})
   } 
})

module.exports = router;
