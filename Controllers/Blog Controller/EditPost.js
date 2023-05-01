const Blog = require("../../modals/BlogSchema");

const EditPost =  (req,res)=>{
    console.log("from edit post");
    console.log(req.Image);
    Blog.findByIdAndUpdate({_id:req.params.id},{
        Title:req.body.Title,
        Description:req.body.Description,
        Image:req.Image
    },(err,docs)=>{
        if(err){
            res.status(404).json({msg:"something went wrog"})
        }
        if(docs){
            res.status(200).json({msg:"Successfully Post Updated"})
        }else{
           res.status(202).json({msg:"post not updated"})
        }
    })
}

module.exports = EditPost;