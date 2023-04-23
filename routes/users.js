var express = require('express');
var router = express.Router();

const upload = require('../ImageHandlingFolder/MulterUpload');
const AddUser = require('../Controllers/User Controller/Adduser');
const LoginUser = require('../Controllers/User Controller/LoginUser');
const TokenVerify = require('../Controllers/User Controller/TokenVerify');
const AdminBlog = require('../Controllers/User Controller/AdminBlog');
const AppendBlog = require('../Controllers/User Controller/AppendBlog');
const FindUser = require("../Controllers/User Controller/FindUser");
const UpdateUser = require("../Controllers/User Controller/UpdateUser");
const DestroyImage = require("../ImageHandlingFolder/DestroyImage");

/* GET users listing. */
router.post('/create-account',upload.array('Image'),AddUser)
router.post('/auth-account',LoginUser); 
router.post('/Check-user',TokenVerify); 
router.get("/AdminBlog/:id",AdminBlog);
router.post("/AddBlog/:id",AppendBlog);
router.get("/FindUser/:id",FindUser);
router.post("/Update-Profile/:id",upload.array('Image'),DestroyImage,UpdateUser);
// router.post("/Delete-Image/:UserId",DestroyImage);





module.exports = router;
