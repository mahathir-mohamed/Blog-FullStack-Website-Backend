const cloudinary = require('cloudinary');
const ProductModel = require('../Modals/Product');


const DeleteImage = (req,res)=>{
        ProductModel.findOne({_id:req.params.id},(err,docs)=>{
        if(err){
            console.log(err);
            res.status(400).json({msg:"Something Went Wrong"})
        }
        if(docs){
            if(docs.Image.length>0){
               for(let i=0;i<docs.Image.length;i++){
               const ImageId = docs.Image[i].id;
               cloudinary.uploader.destroy(ImageId)
            }
            console.log(docs.Image[0].id);
            res.send("successfully deleted")
            }else{
                res.send("not deleted yet")
            }
        }
    })
}

module.exports = DeleteImage;