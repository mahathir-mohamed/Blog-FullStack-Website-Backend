const BlogSchema = require('../modals/BlogSchema');
const AddPost = async(req,res)=>{
   const blog = new BlogSchema({
      Title:req.body.Title,
      Description:req.body.Description,
      image:req.file.originalname+"_"+path.extname(req.file.originalname)
   });
   console.log(req.file);
   await blog.save();
   
   res.render('Home',{message:"Successfully Uploaded"});
   
}

module.exports = AddPost