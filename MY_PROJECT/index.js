var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');

var app =  express();
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
    extended: false
  })) ;
app.use(bodyParser.json());


app.get('/',function(req,res){
    res.render("home", {
      style:"style.css"
    })
}) ;

app.get('/about-us',function(req,res){
    res.render("about-us", {
      style:"style.css"
    })
});

app.get('/contact-us',function(req,res){
    res.render("contact-us", {
      style:"style.css",
      pop: "contact-page.css"
    })
});





app.listen(4000); 



  


