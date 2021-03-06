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
app.use(express.static(__dirname + '/app'));
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
app.post('/toilAPi/addNewUser', toilUserSrv.addNewUser);
app.post('/toilAPi/updateUser', toilUserSrv.updateUser);
app.get('/toilAPi/get_current_jobList', toilJobsSrv.getCurrentJobList);
app.get('/toilAPi/get_job_type', toilJobsSrv.getJobTypeList);
app.get('/toilAPi/get_job_industry', toilJobsSrv.getIndustryList);
app.get('/toilAPi/get_currency', toilJobsSrv.get_currency);
app.get('/toilAPi/get_duration', toilJobsSrv.get_duration);
app.get('/toilAPi/get_language', toilJobsSrv.getLanguageList);
app.get('/toilAPi/get_country', toilJobsSrv.getCountryList);
app.post('/toilAPi/addNewJob', toilJobsSrv.addNewJob);
app.post('/toilAPi/deleteJob', toilJobsSrv.deleteJob);
app.post('/toilAPi/updateJob', toilJobsSrv.upDateJob);
app.get('/toilAPi/get_Skill_list', toilJobsSrv.getSkillList);
app.post('/toilAPi/save_Skill_list', toilJobsSrv.saveJobSkills);
app.post('/toilAPi/update_Skill_list', toilJobsSrv.updateJobSkills);
app.get('/toilAPi/get_skill_byJobId', toilJobsSrv.getSkillByJobId);

//APP API List: View and interest API
app.patch('/toilAPi/recordViewOrInterest', toilJobsSrv.updateViewAndInterest);
app.get('/toilAPi/getCurrentJobListForApp', toilJobsSrv.getCurrentJobListForApp);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
