const express=require("express")
const fs=require("fs")
const path =require("path")
const multer=require("multer")
const bodyparser=require("body-parser")
const { error } = require("console")
const {v2:cloudinary}=require("cloudinary")
cloudinary.config({
    cloud_name: 'dblvzkhn2',
    api_key: '398626258546878',
    api_secret: 'k_VTLqV9kZcWh8Z5qHwFk4dS-6Y'
})
const app=express()

app.use(bodyparser.json())

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,`${file.originalname}`)
    }
})
let uploaded=multer({storage:storage})
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})
app.post("/upload",uploaded.single("file"),(req,res)=>{
    let filePath=req.file.path
    cloudinary.uploader.upload(filePath,(error,result)=>{
        if(error){
            res.status(404).json({
                message:"error"
            })
        }
        res.status(200).json({
            message:"successfuly uploded",
            imageUrl:result.secure_url
        })
    })
})
app.listen(8000,()=>{
    console.log("server is hosted")
})