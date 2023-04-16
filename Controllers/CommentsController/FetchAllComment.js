const Blog = require('../../modals/BlogSchema');

const FetchAllComment = async (req,res)=>{
    const FetchAllComment = Blog.findOne({_id:req.params.id},(err,docs)=>{
        if(err){
            res.status(404).json({msg:"Something Went Wrong"})
        }
        if(docs){
            res.status(200).json({msg:"Successfully Comments fetched",result:docs.Comments})
        }else{
            res.status(202).json({msg:"Comments Not Found"})
        }
    }).populate('Comments.CommentId')
}
module.exports = FetchAllComment;