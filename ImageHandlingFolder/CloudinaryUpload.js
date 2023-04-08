const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CloudName,
    api_key : process.env.ApiKey,
    api_secret : process.env.ApiSecret
})

exports.uploads = async (file,folder)=>{
    return new Promise(resolve => {
        cloudinary.uploader.upload(file,(result)=>{
            console.log(result);
            resolve({
                url:result.url,
                id:result.public_id
            })
        },{
            resource_type:"auto",
            folder:folder
        }
        )
    })
   
}
