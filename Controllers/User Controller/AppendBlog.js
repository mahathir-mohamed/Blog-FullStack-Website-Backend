// const Blog = require("../../modals/BlogSchema");
const User = require("../../modals/UserSchema");

const AppendBlog = async (req,res)=>{
      console.log(req.body.blog_id)
       const AppendBlog = User.findOneAndUpdate({_id:req.params.id},{$push:{"Blogs":req.body.blog_id}},(err,docs)=>{
           if(err){
            res.status(400).json({msg:"Something went wrong!!!"})
           }
           if(docs){
              res.status(200).json({msg:"Successfully updated",result:docs})
           }else{
            res.status(200).json({msg:"Blog is not found"})
           }
       })
}

module.exports = AppendBlog;