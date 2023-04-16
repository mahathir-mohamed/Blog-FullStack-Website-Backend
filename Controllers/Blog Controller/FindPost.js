const Blog = require("../../modals/BlogSchema");

const FindBlog = async (req,res)=>{
    const FindBlog = await Blog.findOne({_id:req.params.id},(err,docs)=>{
        if(err){
            res.status(400).json({msg:"Something Went Wrong"})
        }
        if(docs){
            res.status(200).json({msg:"Post Successfully Fetched!!",result:docs});
        }else{
            res.status(200).json({msg:"Sorry Post Not Found!"});
        }
    }).clone().populate("Author");
}

module.exports = FindBlog;