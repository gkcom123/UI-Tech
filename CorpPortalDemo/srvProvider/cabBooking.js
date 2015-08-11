/**
 * Created by administrator on 11/08/15.
 */
exports.bookLater = function(req,res)
{
  var reqObj = JSON.parse(Object.keys(req.body)[0]);
  var name = reqObj["url"];
  //var pw = reqObj["password"];
  var result = {"status": "success", "error_desc": "", "error_code": "",
    "response_data": {"status": "success", "error_desc": "", "error_code": "",
      "response_data": {"booking_id": "GKCOM-C123456",
        "trip_count": 0, "status_message": "", "booking_confirmed": true, "wait": false}}};

  res.send(result);
};
exports.getUpcomingBookingsEstimatedFare = function(req,res)
{
  var name = req.query["corporate_id"];

  var result = {"status": "success", "error_desc": "", "error_code": "",
    "response_data": {"count": 1, "total_estimated_fare": 100}};
  res.send(result);
};
