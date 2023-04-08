const user = require('../../modals/UserSchema');

const FavouriteBlog = async(req,res)=>{
    // console.log(req.params.id);
    const FavouriteBlog = user.findOne({_id:req.body.user_id},(err,docs)=>{
        if(err){
            res.status(400).json({msg:"Something went wrong"})
        }
        if(docs){
            res.status(200).json({result:docs.likes});
        }else{
            res.status(200).json({msg:"sorry you did not have any favourite list"});
        }
    }).populate("likes.BlogId")
}

module.exports = FavouriteBlog;