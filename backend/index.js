const port=4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const multer=require("multer")
const path=require("path")
const cors=require("cors")

app.use(express.json()) //for reading res
app.use(cors()) //to connect react to express 
mongoose.connect("mongodb+srv://himanshijain2501:lkYFEarmoI4MDqLF@cluster0.v4zigqz.mongodb.net/e-commerce")

//IMage storage engine

const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload=multer({storage:storage})
app.use('/images',express.static('upload/images'))
app.post('/upload',upload.single('product'),(req,res)=>{
         res.json({
            sucess:1,
            image_url:`http://localhost:${port}/images/${req.file.filename}`
         })
})

//schema for creating products
const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
         default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})

app.post('/addproduct',async(req,res)=>{
    const product=new Product({
        id:req.body.id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,  
    })
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        sucess:true,
        name:req.body.name,
    })
})
//Api creation
app.get('/',(req,res)=>{
    res.send("Express app is running")
})
app.listen(port,()=>{
    console.log("server started")
})


