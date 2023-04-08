const multer = require('multer');
const express = require('express');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        //  cb(null,'C:/Ecommerce Website/Server/ecommerce-server/public/images')
         cb(null,'public/images');
    },
    filename: function(req,file,cb){
       cb(null,Date.now() + "-" + file.originalname)
    }
})

const upload = multer({storage:storage})


module.exports = upload;
