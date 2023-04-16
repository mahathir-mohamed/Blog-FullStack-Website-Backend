const  mongoose = require("mongoose");
const user = require('../../modals/UserSchema');

const myBlog = async (req,res)=>{
    const MyBlog = user.findByIdAndUpdate({_id:req.params.id},{$push:{"Blogs":{BlogId:req.blog_id}}},(err,docs)=>{
        if(err){
            console.log(err)
        }
        if(docs){   
            res.status(200).json({msg:"Successfully Blog Created!!!"})
        }else{
            res.status(202).json({msg:"Blog is not Created!!!"})
        }
    })
}

module.exports = myBlog;