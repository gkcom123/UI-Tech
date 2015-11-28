/**
 * Created by Gunjan on 03/07/15.
 */
var jwt = require('jsonwebtoken');
var secret = 'ToilPortalKey12356';
var dbPool = require('./db').pool;
exports.login = function(req,res)
{
  var reqObj = req.body;
  var emailId = reqObj["emailid"];
  var pw = reqObj["password"];
  var finalresult;
  if(emailId != undefined && pw!=undefined )
  {
    dbPool.getConnection(function(err, conn) {
      conn.query("SELECT * FROM toilUser WHERE email_id='" + emailId + "' AND passwd='" + pw + "'"
          , function (err, result) {
            if (!err && result.length == 1) {
              var profile = {
                first_name: result[0]["f_name"],
                last_name: result[0]["l_name"],
                email: result[0]["email_id"],
                company: result[0]["company"],
                user_id: result[0]["user_id"]
              };
              //var token = jwt.sign(profile, secret, { expiresIn: 600*5 });
              //expiry time has been removed as per Marcin request
              var token = jwt.sign(profile, secret);
              finalresult = {
                status: 'success',
                error_desc: '',
                error_code: '200',
                response_data: token,
                message: 'Verified'
              };
              res.send(finalresult);
            }
            else {
              finalresult = {
                status: 'failed',
                error_desc: '',
                error_code: '201',
                response_data: {},
                message: 'Not verified'
              };
              res.send(finalresult);

            }
          });
      conn.release();
    });
  }

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
