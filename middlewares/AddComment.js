const CommentSchema = require("../modals/CommentSchema");

const AddComment = async(req,res,next)=>{
    const {User,Image,Comment}=req.body;

    const NewComment = new CommentSchema({
        User:User,
        Comment:Comment
    })
    await NewComment.save();
    console.log(NewComment);
    req.Comment_Id = NewComment._id;
    next();
    // res.status(200).json({msg:"Comment Successfully Added"})
}

module.exports = AddComment;