/**
 * Created by Gunjan on 03/07/15.
 */
exports.login = function(req,res)
{
  var reqObj = req.body;
  var name = reqObj["username"];
  var pw = reqObj["password"];
  if(name != undefined && pw!=undefined && name == pw)
  {
    var result = {status: 'success', error_desc: '', error_code: '200', response_data: {username: name,
      session_id: "c08ba7f4868c15aaba5c1a67012344a0"}, message:'Verified'};
  }
  else
  {
    var result = {status: 'failed', error_desc: '', error_code: '201', response_data: {}, message:'Not verified'};
  }
  res.send(result);
};
