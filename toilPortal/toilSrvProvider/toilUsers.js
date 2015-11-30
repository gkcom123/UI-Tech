/**
 * Created by gunjan.kumar on 10/2/15.
 */
var dbPool = require('./db').pool;
exports.getUserList = function(req,res)
{
    var userid = req.query["user_id"];
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT * FROM toilUser WHERE admin_id='" + userid +"'"
            , function (err, result) {
                if (!err && result.length > 0) {
                    var jsonRes = [];
                    var arrayLength = result.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var profile = {
                            firstName: result[i]["f_name"],
                            lastName: result[i]["l_name"],
                            emailId: result[i]["email_id"],
                            company: result[i]["company"],
                            userName: result[i]["user_id"],
                            "isEditable": true,
                            "isRemovable":true
                        };
                        jsonRes.push(profile);
                    }
                    var finalResult = {
                        "status": "success",
                        "error_desc": "",
                        "error_code": "",
                        "response_data": {
                            "pagination": {
                                "has_next": false,
                                "next_page": 2,
                                "previous_page": 0,
                                "current_page": 1,
                                "total_pages": 1,
                                "has_previous": false
                            },
                            "results": jsonRes
                        }
                    }
                    res.send(finalResult);
                }
            });
        conn.release();
    });
    var tomo =  getDate();
}
function getDate()
{
    var m_names = new Array("January", "February", "March",
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December");

    var d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    return curr_date + "-" + m_names[curr_month]
        + "-" + curr_year;
}