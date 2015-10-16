//Get modules.
var express = require('express');
var http = require('http');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var secret = 'ToilPortalKey12356';
var app = express();
//exports.secretkey = secret;

app.use(express.bodyParser());
app.use('/toilAPi', expressJwt({secret: secret}));

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/dist'));
app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});

var toilLoginSrv = require('./toilSrvProvider/toilLogin');
var toilUserSrv = require('./toilSrvProvider/toilUsers');
var toilJobsSrv = require('./toilSrvProvider/toilJobs');

app.get('/', function(req, res){
  res.redirect('/toilPortalMain.html');
});
/*Toil Api backend*/
app.post('/toil/login', toilLoginSrv.login);
app.post('/toilAPi/forgotPw', toilLoginSrv.forgotPw);
app.get('/toilAPi/get_user_list', toilUserSrv.getUserList);
app.get('/toilAPi/get_current_jobList', toilJobsSrv.getCurrentJobList);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
