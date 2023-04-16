const Blog = require('../../modals/BlogSchema');

const AddCommentId = async (req,res)=>{
    console.log(req.Comment_Id)
    const AddCommentId =  Blog.findByIdAndUpdate({_id:req.params.id},{$push:{Comments:{CommentId:req.Comment_Id}}},(err,docs)=>{
        if(err){
             return res.status(400).json({msg:"Something Went Wrong",error:err})
        }
        if(docs){
            return res.status(200).json({msg:"Successfully Comment Added"})
        }else{
            return res.status(202).json({msg:"Blog Not Found"})
        }
    })
}

module.exports = AddCommentId;