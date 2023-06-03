const User = require('../../modals/UserSchema');


const AuthorBlogRecomment = (req,res)=>{
    User.findById({_id:req.params.id},(err,docs)=>{
        if(err){
            res.status(404).json({msg:"Something went Wrong"})
        }
        if(docs){
            try{
            const filterBlogs = docs.Blogs.filter((blog)=>{
                return req.query.BlogId!=blog.BlogId._id
            })
            res.status(200).json({result:filterBlogs})
        }catch(err){
            console.log(err);
        }
        }else{
         res.status(200).json({msg:"Blogs not found"});
        }
    }).populate("Blogs.BlogId");
}
module.exports = AuthorBlogRecomment;