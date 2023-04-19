const user = require('../modals/UserSchema');

const RemoveMyBlog = async (req,res,next)=>{
     user.findByIdAndUpdate({_id:req.body.id},{$pull:{"Blogs":{BlogId:req.params.id}}},(err,docs)=>{
        if(err){
            res.status(404).json({msg:"Something went wrong my blog"})
        }
        if(docs){
            next();
        }else{
            next();
        }
     })
}

module.exports = RemoveMyBlog;