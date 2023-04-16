const BlogSchema = require('../../modals/BlogSchema');
const AllPost = (req,res)=>{
   BlogSchema.find((err,docs)=>{
      if(err){
         console.log(err);
      }else{   
         res.status(200).send(docs);
      }
   }).populate('Author');
}

module.exports = AllPost;