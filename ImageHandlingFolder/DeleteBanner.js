const BannerSchema = require('../Modals/BannerSchema');
// const cloudinary = require('cloudinary');


const BannerDelete = async(req,res,next)=>{
    if(req.files){
    const removeProduct = BannerSchema.findByIdAndRemove({_id:req.params.id},function(err,docs){
        if(err){
          return res.status(404).json({msg:"Unable to delete Product"})
        }
        if(docs){
            return res.status(200).json({msg:"Succesfully Deleted"});
            next();
        }else{
             return res.status(200).json({msg:"Product Not Found"});
            //  next();
        }

        
    })}else{
        console.log("skipped")
        next();
    }
}
module.exports = BannerDelete;