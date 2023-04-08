const BlogSchema = require('../../modals/BlogSchema');

const DeletePost =  (req,res)=>{
   BlogSchema.findByIdAndDelete(req.params.id).then(async docs=>{
      if(!docs){
         res.status(404);
      }else{
         console.log(docs);
         try{
         await fs.unlinkSync("C:/Node Projects/CRUD/public/images/"+docs.image);
         }catch(err){
            console.log(err);
         }
         res.redirect('/all-post');
      }
   }).catch(error=>{
      console.log(error);
   })
}

module.exports = DeletePost;