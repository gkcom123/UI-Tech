/**
 * Created by administrator on 03/07/15.
 */
exports.login = function(req,res)
{
  var reqObj = JSON.parse(Object.keys(req.body)[0]);
  var name = reqObj["username"];
  var pw = reqObj["password"];
  if(name != undefined && pw!=undefined && name == pw)
  {
    var result = {status: 'success', error_desc: '', error_code: '200', response_data: {username: "Gunjan.kumar",
      session_id: "c08ba7f4868c15aaba5c1a67012344a0"}, message:'Verified'};
  }
  else
  {
    var result = {status: 'failed', error_desc: '', error_code: '201', response_data: {}, message:'Not verified'};
  }
  res.send(result);
};
exports.signUp = function(req,res)
{
  var m = JSON.parse(Object.keys(req.body)[0]);
  //console.log(m.mobileNumber);
  var result ={"status": "success", "error_desc": "", "error_code": "", "response_data": {
    "error_desc": "", "status": "success"}};
  //just delaying it for real time experience.
  setTimeout(function(){
    res.send(result);
  }, 3000);


};
exports.getstateList = function(req,res) {

  var countryId = req.query["countryID"];
  var result = {
    "status": "success", "error_desc": "", "error_code": "",
    "response_data": [{
      "cityEntity": null,
      "countryId": 99,
      "name": "Andhra Pradesh",
      "stateId": 1,
      "stateName": "Andhra Pradesh",
      "stateShortname": "AP"
    }, {
      "cityEntity": null,
      "countryId": 99,
      "name": "Bihar",
      "stateId": 4,
      "stateName": "Bihar",
      "stateShortname": "BR"
    },{
      "cityEntity": null,
      "countryId": 99,
      "name": "Gujarat",
      "stateId": 7,
      "stateName": "Gujarat",
      "stateShortname": "GJ"
    },{
      "cityEntity": null,
      "countryId": 99,
      "name": "Karnataka",
      "stateId": 12,
      "stateName": "Karnataka",
      "stateShortname": "KA"
    },{
      "cityEntity": null,
      "countryId": 99,
      "name": "Maharashtra",
      "stateId": 15,
      "stateName": "Maharashtra",
      "stateShortname": "MH"
    },{
      "cityEntity": null,
      "countryId": 99,
      "name": "Tamil Nadu",
      "stateId": 24,
      "stateName": "Tamil Nadu",
      "stateShortname": "TN"
    },{
      "cityEntity": null,
      "countryId": 99,
      "name": "Delhi",
      "stateId": 32,
      "stateName": "Delhi",
      "stateShortname": "DL"
    }]
  };
  res.send(result);
  //console.log(countryId);
};
exports.getCityByStateId = function(req,res) {
  var stateID = req.query["stateID"];
  var cityDetails ;

  if(stateID=='1') {
    cityDetails = [
        {
          "countryId": 99,
          "name": "Visakhapatnam",
          "stateId": 1
        }, {
          "countryId": 99, "name": "Hyderabad", "stateId": 1
        },
        {"countryId": 99, "name": "Others", "stateId": 1}];
  }
  else if(stateID=='4') {
    cityDetails = [ {
      "countryId": 99,
      "name": "Begusarai",
      "stateId": 4
    }, {"countryId": 99, "name": "Bhagalpur", "stateId": 4}, {
      "countryId": 99,
      "name": "Bihar Sharif",
      "stateId": 4
    }, {"countryId": 99, "name": "Darbhanga", "stateId": 4}, {
      "countryId": 99,
      "name": "Gaya",
      "stateId": 4
    }, {"countryId": 99, "name": "Katihar", "stateId": 4}, {
      "countryId": 99,
      "name": "Muzaffarpur",
      "stateId": 4
    }, {"countryId": 99, "name": "Patna", "stateId": 4}, {
      "countryId": 99,
      "name": "Purnia",
      "stateId": 4
    }, {"countryId": 99, "name": "Others", "stateId": 4}];
  }
  else if(stateID =='7') {
    cityDetails = [{"countryId": 99, "name": "Ahmedabad", "stateId": 7}, {
      "countryId": 99,
      "name": "Bhavnagar",
      "stateId": 7
    },{"countryId": 99, "name": "Others", "stateId": 7}];
  }
  else if (stateID=='12') {
    cityDetails = [{"countryId": 99, "name": "Bangalore", "stateId": 12}, {
      "countryId": 99,
      "name": "Belgaum",
      "stateId": 12
    }, {"countryId": 99, "name": "Hubballi-Dharwad", "stateId": 12}, {
      "countryId": 99,
      "name": "Mangalore",
      "stateId": 12
    }, {"countryId": 99, "name": "Mysore", "stateId": 12}, {"countryId": 99, "name": "Others", "stateId": 12}];
  }
  else if(stateID=='15') {
    cityDetails =
    [{"countryId": 99, "name": "Mumbai", "stateId": 15}, {
      "countryId": 99,
      "name": "Nagpur",
      "stateId": 15
    }, {"countryId": 99, "name": "Navi Mumbai", "stateId": 15}, {
      "countryId": 99,
      "name": "Pune",
      "stateId": 15
    }];

  }
  else if(stateID== '24') {

    cityDetails=[{"countryId": 99, "name": "Chennai", "stateId": 24}, {
      "countryId": 99,
      "name": "Coimbatore",
      "stateId": 24
    },{"countryId": 99, "name": "Others", "stateId": 24}];
  }
  else {
    cityDetails = [{"countryId": 99, "name": "New Delhi", "stateId": 32}, {
      "countryId": 99,
      "name": "Others",
      "stateId": 32
    }];
  }
  var result = {"status": "success", "error_desc": "", "error_code": "","response_data":""};
  result.response_data = cityDetails;
  res.send(result);
};
