//Get modules.
var express = require('express');
var http = require('http');
var app = express();
app.use(express.bodyParser());

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/app'));
var authSrv = require('./srvProvider/login');
var corpInfoSrv = require('./srvProvider/corporateInfo');

app.get('/', function(req, res){
  res.redirect('/index.html');
});
app.post('/api/login', authSrv.login);
app.get('/api/get-corporate-details',corpInfoSrv.getCorporateDetails);

app.post('/call/login',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
