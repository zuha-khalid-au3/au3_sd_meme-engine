var express = require('express');
var multer = require('multer');
var session = require("express-session");
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';

var app = express();


app.use(
    session({
        secret: "Express session secret"
    })
);


app.use(express.urlencoded({ extended:false}));
 
app.set('view engine', 'hbs');


app.use(express.static(__dirname + '/public'));
var db;

mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (error, client) {
    if (error)
        throw error;
    db = client.db('Project');
    // console.log(db);
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/login.html")

});


app.get('/getusers', function (req, res) {
    db.collection('Users').find({}).toArray(function (error, result) {
        if (error)
            throw error
        res.json(result);
    });
});
 

app.get("/users", function(req, res){
    if(req.session.loggedIn == true){
    res.sendFile(__dirname+"/users.html");                   
        
    }else{
        res.redirect("/");
    }
});


app.post("/auth", function(req,res){
     
    db.collection("Users").find({}).toArray(function(err, result){
       if (err)
       throw err;
       for(var i=0; i<result.length; i++){
           if(req.body.email ==  result[i].email  &&  req.body.password ==  result[i].password ){
        req.session.loggedIn = true;   
       }
   }
      res.redirect("/users");
    });
});


app.get('/users/add', function (req, res) {
    res.render('addNewUsers',{
        title: 'Add Users',
        script: '/add.js',
        style:'/form.css'
    });
});

app.use('/users/user', bodyParser.urlencoded());
app.post('/users/user', function (req, res) {
    db.collection('Users').insertOne(req.body, function (error, result) {
        if (error)
            throw error;
            res.json(result);
        
    
    })
});

var upload = multer({dest: 'uploads/'});
app.use(express.static('uploads'));
app.get('/images', function(req, res){
   res.sendFile(__dirname + '/image.html')
});

app.post('/memesUpload', upload.single('memes'), function(req, res, next){
//  res.json(req.file);
    console.log(req.file);
  res.send("<img src = '" + req.file.filename  +"' /><span> " + req.file.size + " </span>")
});

app.get("/home", function(req, res){
    res.render("home" , {
        script: '/home.js',
        style: "/style.css"
    });

});

 app.get("/popup", function(req, res){
    res.sendFile(__dirname + "/popup.html")

});




//  app.get("/logout", function(req,res){
//     req.session.destroy();
//     res.redirect("/");
// });

app.listen('7000', function(){
    console.log('You are listening on port 7000!')
});  





