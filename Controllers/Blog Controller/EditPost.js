const BlogSchema = require('../../modals/BlogSchema');
const EditPost = (req,res)=>{
    try {
    fs.unlinkSync("public/images"+req.body.image);
    console.log("File is deleted.");
} catch (error) {
    console.log(error);
}
    BlogSchema.findByIdAndUpdate(req.params.id,{
      Title:req.body.newTitle,
      Description:req.body.newDescription,
      image:req.file.originalname+"_"+path.extname(req.file.originalname)
    }).then((docs)=>{
        //res.render('/all-Post');
        res.send("succesfully updated");
    }).catch(err => {
       res.status(500).send(err.message);
    })
}

module.exports = EditPost;