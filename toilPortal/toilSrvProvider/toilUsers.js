/**
 * Created by gunjan.kumar on 10/2/15.
 */
var dbPool = require('./db').pool;
exports.getUserList = function(req,res)
{
    var userid = req.query["user_id"];
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT * FROM toilUser WHERE isActive=1 AND admin_id='" + userid +"'"
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
                            isActive:result[i]["isActive"],
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
exports.updateUser = function(req,res)
{
    var reqObj = req.body;
    var emailId = reqObj["emailId"];
    var userName = reqObj["userName"];
   /* UPDATE toil.toilUser SET isActive=0 WHERE user_id=6 AND email_id='kjahs@hg.com';*/
    var queryq = "UPDATE toilUser SET isActive=0 WHERE user_id='"+userName+"' AND email_id='"+emailId+"'";
    dbPool.getConnection(function(err, conn) {
        conn.query(queryq,
            function (err, result) {
                if (!err) {
                    var finalResult = {
                        "status": "success",
                        "error_desc": "",
                        "error_code": "",
                        "response_data": {

                        }
                    }
                    res.send(finalResult);
                }
            });
        conn.release();
    });

}

exports.addNewUser = function(req,res)
{
    var reqObj = req.body;
    var firstName = reqObj["firstName"];
    var lastName = reqObj["lastName"];
    var emailid = reqObj["emailid"];
    var company = reqObj["company"];
    var phoneNumber = reqObj["phoneNumber"];
    var admin_id = reqObj["user_id"];
/*
    INSERT INTO toilUser (email_id,f_name,l_name,company,phoneNumber,isActive,passwd,isadmin,admin_id)
    VALUES ('shilpa1@yahoo.com','Shilpa1','Goj','adobe','9877876',1,'admin',1,2);
*/

    dbPool.getConnection(function(err, conn) {
        conn.query("INSERT INTO toilUser (email_id,f_name,l_name,company,phoneNumber,isActive,passwd,isadmin,admin_id) VALUES" +
            "('" + emailid +"','"+firstName+"','"+lastName+"','"+company+"','"+phoneNumber+"','"+'1'+"','"+'admin'+"','"+'1'+"','"+admin_id +"')",
            function (err, result) {
                if (!err) {
                    var finalResult = {
                        "status": "success",
                        "error_desc": "",
                        "error_code": "",
                        "response_data": {

                        }
                    }
                    res.send(finalResult);
                }
            });
        conn.release();
    });

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
