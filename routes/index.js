var express = require('express');
var router = express.Router();
const BlogSchema=require('../modals/BlogSchema');

/* GET home page. */
router.get('/',(req,res)=>{
   res.render('Home',{message:null});
})
router.get('/Blog-Posts',(req,res)=>{
   res.render('BlogScreen');
})
router.get('/Edit/:id',(req,res)=>{
   BlogSchema.findOne({_id:req.params.id},(err,docs)=>{
      if(err){
         console.log(err);
      }else{
         res.render('Edit',{data:docs})
         console.log(docs);
      }
   })
})
router.post('/update/:id',(req,res)=>{
    BlogSchema.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((docs)=>{
        res.redirect('/all-Post');
    }).catch(err => {
       res.status(500).send(err.message);
    })
});
router.post('/create-blog',async(req,res)=>{
   const blog = new BlogSchema(req.body);
   await blog.save();
   res.render('Home',{message:"Successfully Uploaded"});
   console.log(blog);
})

router.get('/all-post',(req,res)=>{
   BlogSchema.find((err,docs)=>{
      if(err){
         console.log(err);
      }else{
         console.log(docs);
         res.render('BlogScreen',{data:docs});
      }
   });
});


router.get('/delete/:id',(req,res)=>{
   BlogSchema.findByIdAndDelete(req.params.id).then(docs=>{
      if(!docs){
         res.status(404);
      }else{
         console.log(docs);
         res.redirect('/all-Post');
      }
   }).catch(error=>{
      console.log(error);
   })
})

module.exports = router;
