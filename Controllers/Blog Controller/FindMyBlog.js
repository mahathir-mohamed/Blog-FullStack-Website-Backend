const user = require('../../modals/UserSchema');

const FindMyBlog = async (req,res)=>{
    const FindMyBlog = await user.findOne({_id:req.params.id},(err,docs)=>{
        if(err){
            res.status(400).json({msg:"Something Went Wrong!!"})
        }
        if(docs){
            res.status(200).json({msg:"Successfully Blogs fetched",result:docs.Blogs})
        }else{
            res.status(200).json({msg:"Successfully Blogs fetched"})
        }
    }).populate({path:'Blogs.BlogId',populate:{path:"Author"}}).clone()
}

module.exports = FindMyBlog;