//Get modules.
var express = require('express');
var http = require('http');
var app = express();
app.use(express.bodyParser());

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/app'));
var authSrv = require('./srvProvider/login');
var corpInfoSrv = require('./srvProvider/corporateInfo');
var cityInfoSrv = require('./srvProvider/cityInfo');

app.get('/', function(req, res){
  res.redirect('/index.html');
});
app.post('/api/login', authSrv.login);
app.post('/api/signUp', authSrv.signUp);

app.get('/api/getStateListByCountryId', authSrv.getstateList);
app.get('/api/getCityListByStateId', authSrv.getCityByStateId);

app.get('/api/get-corporate-details',corpInfoSrv.getCorporateDetails);
app.get('/api/get-citylist',cityInfoSrv.getCityList);
app.get('/api/cityInfo/getProdByCityId',cityInfoSrv.getProdList);
app.get('/api/cityInfo/getPolygonByCityId',cityInfoSrv.getPolygonByCityId);
app.get('/api/cityInfo/getAirportInfoByCityName',cityInfoSrv.getAirportInfoByCityName);
app.get('/api/cityInfo/getCarList',cityInfoSrv.getCarList);


/*
app.post('/call/login',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});
*/


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
