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
var cabBookingSrv = require('./srvProvider/cabBooking');
var toilLoginSrv = require('./toilSrvProvider/toilLogin');
var toilUserSrv = require('./toilSrvProvider/toilUsers');

app.get('/', function(req, res){
  res.redirect('/index.html');
});
app.get('/corpPortal', function(req, res){
  res.redirect('/CorpPortal.html');
});
app.get('/jobPortal', function(req, res){
  res.redirect('/toilPortal/toilPortalMain.html');
});


app.post('/api/login', authSrv.login);
app.post('/api/signUp', authSrv.signUp);
app.post('/api/corporate-enquiry',corpInfoSrv.enquiry);
app.post('/api/bookCab',cabBookingSrv.bookLater);

app.get('/api/get_upcoming_bookings_estimated_fare',cabBookingSrv.getUpcomingBookingsEstimatedFare);
app.get('/api/getStateListByCountryId', authSrv.getstateList);
app.get('/api/getCityListByStateId', authSrv.getCityByStateId);

app.get('/api/get-corporate-details',corpInfoSrv.getCorporateDetails);
app.get('/api/getCorpBookingCount',corpInfoSrv.getCorpBookingCount);
app.get('/api/get-citylist',cityInfoSrv.getCityList);
app.get('/api/cityInfo/getProdByCityId',cityInfoSrv.getProdList);
app.get('/api/cityInfo/getPolygonByCityId',cityInfoSrv.getPolygonByCityId);
app.get('/api/cityInfo/getAirportInfoByCityName',cityInfoSrv.getAirportInfoByCityName);
app.get('/api/cityInfo/getCarList',cityInfoSrv.getCarList);
app.get('/api/get-prepaid-amount',corpInfoSrv.getPrepaidBalance);
app.get('/api/get_corporate_upcoming_bookings',corpInfoSrv.get_upcoming_bookings);
app.get('/api/get_corporate_past_bookings',corpInfoSrv.getPastBookings);
app.get('/api/get_estimated_fare',corpInfoSrv.getEstimatedFare);
app.get('/api/getCorporateRecipts',corpInfoSrv.getCorpReceipts);
app.get('/api/getCorporateInvoice',corpInfoSrv.getCorpInvoice);
app.get('/api/getCorporateTransaction',corpInfoSrv.getCorporateTransaction);

/*Toil Api backend*/
app.post('/toilAPi/login', toilLoginSrv.login);
app.get('/toilAPi/get_user_list', toilUserSrv.getUserList);

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
