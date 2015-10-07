//Get modules.
var express = require('express');
var http = require('http');
var app = express();
app.use(express.bodyParser());

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/dist'));
var toilLoginSrv = require('./toilSrvProvider/toilLogin');
var toilUserSrv = require('./toilSrvProvider/toilUsers');
var toilJobsSrv = require('./toilSrvProvider/toilJobs');

app.get('/', function(req, res){
  res.redirect('/index.html');
});
/*Toil Api backend*/
app.post('/toilAPi/login', toilLoginSrv.login);
app.get('/toilAPi/get_user_list', toilUserSrv.getUserList);
app.get('/toilAPi/get_current_jobList', toilJobsSrv.getCurrentJobList);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
