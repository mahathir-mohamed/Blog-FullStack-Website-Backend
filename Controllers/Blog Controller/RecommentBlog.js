const Blog = require("../../modals/BlogSchema");

const RecommentBlog = async (req,res)=>{
    // console.log(req.body.AuthorId)
    Blog.find({$and:[{_id:{$ne:req.params.id}},{Author:{$ne:req.body.AuthorId}}]},(err,docs)=>{
        if(err){
            res.status(400).json({msg:"Something went wrong"})
        }
        if(docs){
           res.status(200).json({msg:"Succesfully Blogs Fetched",result:docs})
        }else{
           res.status(202).json({msg:"Succesfully Blogs Fetched"}) 
        }
    }).limit(3)
}

module.exports = RecommentBlog