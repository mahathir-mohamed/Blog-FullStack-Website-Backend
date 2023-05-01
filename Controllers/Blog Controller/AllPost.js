const BlogSchema = require('../../modals/BlogSchema');
const AllPost = (req,res)=>{
   const page = parseInt(req.query.page);
   const limit = parseInt(req.query.limit);

   const StartIndex = (page-1)*limit;
   const EndIndex = page*limit;

   BlogSchema.find((err,docs)=>{
      if(err){
         console.log(err);
      }else{   
         const result = docs.slice(StartIndex,EndIndex);
         const totaldocument = docs.length;
         res.status(200).json({result,TotalPost:totaldocument});
      }
   }).populate('Author');
}

module.exports = AllPost;