const User = require('../modals/UserSchema');

const RemovelikedBlog = async (req,res,next)=>{
    User.updateMany({$pull:{"likes":{BlogId:req.params.id}}},(err,docs)=>{
        if(err){
            res.status(400).json({msg:"Something Went Wrong liked blog"})
        }
        if(docs){
            next()
        }else{
            next()
        }
    })
}

module.exports = RemovelikedBlog