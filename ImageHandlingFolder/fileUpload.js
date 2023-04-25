const {dirname} = require("path")

const fileUpload = async (req,res,next)=>{
  console.log(req.files)
  if(req.files){
  let imageFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  imageFile = req.files.Image;
  uploadPath = `public/images/${imageFile.name}`;
  imageFile.mv(uploadPath, function(err) {
    if(err)
      console.log(err);
      return res.status(500).send(err);
    next();
  });
}else{
  next();
}

}

module.exports = fileUpload;
