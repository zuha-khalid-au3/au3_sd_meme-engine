var express = require('express');


var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


app.use(express.urlencoded({ extended:false}));

app.set('view engine', 'hbs');
app.get("/", function(req, res){
    res.render("home" , {
        style: "/style.css",
        script:"/data.js"
    });

});


app.listen(3000, function () {
    console.log("Your App is running at port 3000");
});
