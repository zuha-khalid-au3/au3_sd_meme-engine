
var app = require('./app');








app.set('port', process.env.PORT || 5500);
var server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});