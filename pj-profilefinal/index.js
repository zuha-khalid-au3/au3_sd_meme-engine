var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var session=require('express-session');
var mongoClient=require("mongodb").MongoClient;
 var multer=require("multer");
 var upload=multer({dest:"public/images"});
 var cloudinary=require('cloudinary').v2;

var dotenv=require('dotenv'); //npm i dotenv --s
dotenv.config();


//console.log("Connected with",CLOUD_NAME); //npm i cloudinary --s

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_KEY
});

var db;
mongoClient.connect("mongodb://localhost:27017",function(err,client){
if (err) throw err;
db=client.db("myDBS");
});

app.use(
    session({
        secret: "Express session secret"
    })
);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended:false}));
 
app.set('view engine', 'hbs');


//app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));


//Home-Page Routes

app.get("/",function(req,res){
    res.render("home", {
        style:"style.css",
        title:"Home"
      });
});
app.get('/about-us',function(req,res){
    res.render("about-us", {
      style:"style.css",
      title:"About-Us"
    });
});
app.get('/contact-us',function(req,res){
    res.render("contact-us", {
      style:"style.css",
      title:"Contact-Us"
    });
});



app.get('/sign-in',function(req,res){
    res.render("sign-in", {
        style:"login.css",
        title:"SignIn Page"
      });
});


//For Inserting new User in DB
app.get('/addS',function(req,res){
    res.render("sign-up", {
        style:"form.css",
        title:"Signup Page"
      });
});


app.post("/add",function(req,res){
    db.collection("users").insert(req.body);
    console.log("Insert successfully");
   res.render("myprofile", {
        style:"myprofile.css",
        title:"Profile Page"
      });
});

//Route for editing user Profile
app.get("/edit",function(req,res){
    db.collection("users")
    .findOne({email:user_email},function(err,result){
        if(err) throw err;
      
        res.render("editProfile",{
            data:result,
            title:"edit"
        });
    });
   
});


//for updating DB
  app.post('/editDB', function(req, res, next) {
            //     var data = {
            //     username: req.body.username,
            //     email: req.body.email,
            //     password: req.body.password,
            //     phone:req.body.phone
            //   };
            //   var id = req.body.id;             
     db.collection('users').updateOne({email:user_email},{$set: req.body}, function(err, result) {
     
                  console.log('User updated');
                 // db.close();
                });
             
              res.redirect("back");
            });
        
app.get("/dmyprofile",function(req,res){
    res.render(307,"/myprofile");
});

app.post("/verify",function(req,res){
    db.collection("users").find().toArray(function(err,result){
        if (err) throw err;
        for(var i=0;i<result.length;i++){
            if(req.body.email==result[i].email &&
                 req.body.password==result[i].password)
                 {//store id here and then use it in /edit
                    user_email = req.body.email;
            req.session.loggedIn=true;
                 }
        }
        res.redirect("/user");
    });
     });
app.get("/user",function(req,res){
    if(req.session.loggedIn==true){
        db.collection("users")
        .findOne({email:user_email},function(err,result){
            if(err) throw err;
          
            res.render("myprofile",{
                data:result,
                title:"edit"
            });
        //res.render("myprofile");
        });
    }
    else{
        res.redirect("/");
    }
});




app.get("/logout",function(req,res){
    req.session.destroy();
    res.redirect("/");
});


app.get("/upload_meme",function(req,res){
    res.render("upload_meme");
});
app.get("/dusrapage",function(req,res){
    res.render("dusrapage",{files:files});
});


var files=[];
app.post("/upload",upload.single('file_uploaded'),function(req,res,next){
    console.log("file:",req.file);
    // cloudinary.uploader.upload(req.file.path,function(error,result){
        // console.log("Result of cloudinary:",result);
    //     files.push(result.secure_url);
    //    res.render("myprofile",{files:files});
    // });
     files.push(req.file.path.substr(6));
     res.render("dusrapage",{files:files});
});




app.listen(process.env.PORT||3335);