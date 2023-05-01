const fileUpload = async (req,res,next)=>{
  console.log(req.files)
  if(req.files){
  if (!req.files.Image || Object.keys(req.files).length === 0) {
    next();
    // return res.status(400).send('No files were uploaded.');
  }
  const imageFile = req.files.Image;
  const uploadPath = "public/images/"+imageFile.name;
  // console.log(uploadPath);
  // uploadPath = "public/uploads" + imageFile.name
  imageFile.mv(uploadPath,function(err) {
    if(err){
      console.warn("err");
      return res.status(500).send(err);
    }else{
      next();
    }
  });}else{
    next();
  }
}

module.exports = fileUpload;
