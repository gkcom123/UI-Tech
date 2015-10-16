/**
 * Created by Gunjan on 03/07/15.
 */
var jwt = require('jsonwebtoken');
var secret = 'ToilPortalKey12356';

exports.login = function(req,res)
{
  var reqObj = req.body;
  var name = reqObj["emailid"];
  var pw = reqObj["password"];

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: name,
    id: 1234
  };
  var token = jwt.sign(profile, secret, { expiresIn: 600*5 });

  if(name != undefined && pw!=undefined )//&& name == pw)
  {
    /*var result = {status: 'success', error_desc: '', error_code: '200', response_data: {username: name,
      session_id: "c08ba7f4868c15aaba5c1a67012344a0"}, message:'Verified'};*/
    var result = {status: 'success', error_desc: '', error_code: '200', response_data: token, message:'Verified'};
  }
  else
  {
    var result = {status: 'failed', error_desc: '', error_code: '201', response_data: {}, message:'Not verified'};
  }
  res.send(result);
};
exports.forgotPw = function(req,res)
{
  var reqObj = req.body;
  var emailId = reqObj["emailid"];
  if(emailId != undefined )
  {
    var result = {status: 'success', error_desc: '', error_code: '200', response_data: {}, message:'Verified'};
  }
  else
  {
    var result = {status: 'failed', error_desc: '', error_code: '201', response_data: {}, message:'Not verified'};
  }
  res.send(result);
};
