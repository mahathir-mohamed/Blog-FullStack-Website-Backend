const BlogSchema = require('../../modals/BlogSchema');
cloudinary = require("cloudinary");

const DeletePost =  (req,res)=>{
   BlogSchema.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
     if(err){
      res.status(400).json({msg:"Something Went Wrong"})
     }
     if(docs){
      for(let i=0;i<docs.Image.length;i++){
         cloudinary.uploader.destroy(docs.Image[i].id)
      }
      res.status(200).json({msg:"Blog Successfully Deleted",result:docs})
     }else{
      res.status(202).json({msg:"Blog is not found"})
     }
   })
}

module.exports = DeletePost;