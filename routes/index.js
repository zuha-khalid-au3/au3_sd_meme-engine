var express = require('express');
var router = express.Router();

// Beginning
router.get('/', function(req, res) {
  //res.send("Let's begin our project");
//   res.render('hello',{
//       //name:req.query.name
//   });
res.render("hello");
});

//signup or register
router.get('/register',function(req,res,next){
   // return res.send("Registered!");
   res.render("register");
});

module.exports = router;