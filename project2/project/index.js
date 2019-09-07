var express = require('express');
// var multerCloudinary = require('multer-cloudinary');
// var cloudinary = require('cloudinary').v2;
// var cloudinaryStorage = multerCloudinary({cloudinary: cloudinary});


var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
var mongoClient=require("mongodb").MongoClient;
var db;
var url="mongodb+srv://RishabhVerma:Rishabh123@mmengine-vmo0p.mongodb.net/?retryWrites=true&w=majority";
mongoClient.connect(url,{useNewUrlParser:true},function(error,client){
         if (error)
            throw error;
        db=client.db("blog");


})
//  app.get("/blog",function(req,res){

//    db.collection('users').find({}).toArray(function(err,result){
// //             if(err)
// //              throw err;
            
// //             console.log(result)
                   
   
   
// //                 res.json(JSON.stringify(result)) 
// })
//  });



app.use(express.urlencoded({ extended:false}));

app.set('view engine', 'hbs');
app.get("/", function(req, res){
    res.render("home" , {
        style: "/style.css",
        script:"/data.js"
    });

});
app.post("/Upload", function(req, res){
    res.render("home" , {
        style: "/style.css",
        script:"/data.js"
    });

});


app.listen(process.env.PORT || 3000, function () {
    console.log("Your App is running at port 3000");
});
