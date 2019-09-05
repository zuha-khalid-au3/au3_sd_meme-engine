var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;

var db;
var url = 'mongodb://127.0.0.1:27017';
mongoClient.connect(url, function (err, client) {
  if (err)
    throw err;
  db = client.db('meme');
})


var app =  express();
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json())

var memehome = require('./post.js');

app.use('/', memehome);


app.get('/',function(req,res){
    res.render("home",{
      style:"style.css"
    })
})


app.listen(4000);   