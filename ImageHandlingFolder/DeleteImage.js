const cloudinary = require('cloudinary');
const ProductModel = require('../Modals/Product');


const DeleteImage = (req,res,next)=>{
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
            next();
            }else{
                next();
            }
        }
    })
}

module.exports = DeleteImage;