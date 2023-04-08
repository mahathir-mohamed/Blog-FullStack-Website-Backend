const User = require("../../modals/UserSchema");

const FindUser = async (req,res)=>{
    const FindUser = User.findOne({_id:req.params.id},(err,docs)=>{
        if(err){
            console.log(err)
        }
        if(docs){
            res.status(200).json({msg:"Succsfully user found",result:docs})
        }else{
           res.status(202).json({msg:"Sorry user not found"}) 
        }
    })
}

module.exports = FindUser