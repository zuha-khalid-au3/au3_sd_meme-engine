var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var app = require('../app');


var url = 'mongodb://localhost:27017/test2';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err) {
     
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert', function(req, res, next) {
  var data = {
    uname: req.body.uname,
    email: req.body.email,
    pass: req.body.pass
  };

  mongo.connect(url, function(err, db) {
   
    db.collection('user-data').insertOne(data, function(err, result) {
     
      console.log('User inserted');
      db.close();
    });
  });

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var data = {
    uname: req.body.uname,
    email: req.body.email,
    pass: req.body.pass
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: data}, function(err, result) {
      
      console.log('User updated');
      db.close();
    });
  });
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  
  mongo.connect(url, function(err, db) {
        db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
        console.log('User deleted');
      db.close();
    });
  });
});

module.exports = router;
