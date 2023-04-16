const User = require('../../modals/UserSchema');



const UpdateUser = async (req,res)=>{
//    console.log(req.files);
  const Updateuser =  User.findByIdAndUpdate({_id:req.params.id},{
        Username:req.body.Username,
        Email:req.body.Email,
        Image:req.Image
    },(err,docs)=>{
        if(err){
            res.status(404).json({msg:"Something went wrong"})
        }
        if(docs){   
            res.status(200).json({msg:"User successfully updated",result:docs})
        }else{
            res.status(202).json({msg:"User not found"})
        }
    })
}

module.exports = UpdateUser;