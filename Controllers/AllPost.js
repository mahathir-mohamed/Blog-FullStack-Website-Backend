const BlogSchema = require('../modals/BlogSchema');
const AllPost = (req,res)=>{
   BlogSchema.find((err,docs)=>{
      if(err){
         console.log(err);
      }else{
         console.log(docs);
         // res.render('BlogScreen',{data:docs});
         res.status(200).send(docs);
      }
   });
}

module.exports = AllPost;