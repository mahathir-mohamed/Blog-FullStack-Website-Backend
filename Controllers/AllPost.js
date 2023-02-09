const BlogSchema = require('../modals/BlogSchema');
const AllPost = (req,res)=>{
   BlogSchema.find((err,docs)=>{
      if(err){
         console.log(err);
      }else{
         console.log(docs);
         res.render('BlogScreen',{data:docs});
      }
   });
}

module.exports = AllPost;