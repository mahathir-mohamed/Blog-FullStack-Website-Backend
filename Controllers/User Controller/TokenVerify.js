const jwt = require("jsonwebtoken");


const TokenVerify = (req,res)=>{
    jwt.verify(req.body.Token,process.env.JWT_SECRET_KEY, function(err, decoded) {
      try{
      if(err){
        res.status(400).json({msg:"Invalid Token"})
      }
      if(decoded){
         res.status(200).json({msg:"Succesfully Verified",Token:req.body.Token})
      }else{
         res.status(200).json({msg:"Token Expired"})
      }}
      catch(e){
        res.status(400).json({msg:"Something Went Wrong"})
      }
});
}

module.exports = TokenVerify;