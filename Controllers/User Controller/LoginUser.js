const userSchema = require('../../modals/UserSchema');
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

const LoginUser = async (req,res)=>{
    console.log(req.body);
   const loginUser = await userSchema.findOne({Email:req.body.Email},(err,docs)=>{
    if(err){
        res.status(400).json({msg:"Something went wrong"})
    }
    if(docs){
        bcrypt.compare(req.body.Password,docs.Password,(err,result)=>{
           if(result){
              console.log(docs);
              const Token = jwt.sign(req.body.Email,process.env.JWT_SECRET_KEY);
               res.status(200).json({msg:"User Found",Token,docs});
           }else{
             res.status(202).json({msg:"please provide valid password"});
           }
        })
    }else{
        res.status(200).json({msg:"Please create account to login"});
    }
   }).clone();
}

module.exports = LoginUser;