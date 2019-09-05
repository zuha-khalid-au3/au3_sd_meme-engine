var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);



app.listen('4500', function(){
  console.log('You are listening on port 4500!')
});

module.exports = app;
