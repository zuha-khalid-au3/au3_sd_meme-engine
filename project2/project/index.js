  
var express = require('express');
var bodyParser=require("body-parser");
var multer=require("multer");
var upload=multer({dest:'Uploads/Images'});
const dotenv=require("dotenv");
dotenv.config();
var cloudinary=require("cloudinary").v2;
cloudinary.config({
    cloud_name:''+process.env.CLOUD_NAME,
    api_key:''+process.env.API_KEY,
    api_secret:''+process.env.API_SECRET

})
// var multerCloudinary = require('multer-cloudinary');
// var cloudinary = require('cloudinary').v2;
// var cloudinaryStorage = multerCloudinary({cloudinary: cloudinary});


var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
var mongoClient=require("mongodb").MongoClient;
var db;
var url;
if(process.env.DB_URL)
   {url=process.env.DB_URL;
    console.log(url)}
else
   {url="mongodb://127.0.0.1:27017";}
mongoClient.connect(url,{ useUnifiedTopology: true },function(error,client){
         if (error)
            throw error;
        db=client.db("blog");

        console.log("connecting.")
})

 app.get("/blog",function(req,res){

   db.collection('users').find({}).toArray(function(err,result){
            if(err)
             throw err;
            
          //  console.log(result)
                   
   
   
              res.json(result) 
})
 });



app.use(express.urlencoded({ extended:true}));

app.set('view engine', 'hbs');
app.get("/", function(req, res){
    res.render("home" , {
        style: "/style.css",
        script:"/data.js"
    });

});
app.post("/Upload",upload.single("memes"), function(req, res){
   // console.log(req.file);
           cloudinary.uploader.upload(req.file.path,function(error,result){
           // console.log(error);
            if (error)
               throw error;

               //    console.log("result of cloudinary",result);

                   res.render("home.hbs" , {
                    style: "/style.css",
                    script:"/data.js"
                });


           })



    

});


app.listen(process.env.PORT || 3000, function () {
    console.log("Your App is running at port 3000");
});