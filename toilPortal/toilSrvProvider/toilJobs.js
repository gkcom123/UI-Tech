/**
 * Created by gunjan.kumar on 10/2/15.
 */
/**
 * Created by gunjan.kumar on 10/2/15.
 */
var dbPool = require('./db').pool;
exports.getJobTypeList = function(req,res)
{
    //var userid = req.query["user_id"];
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT * FROM job_type"
            , function (err, result) {
                if (!err && result.length > 0) {
                    var jsonRes = [];
                    var arrayLength = result.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var types = {
                            type_id: result[i]["type_id"],
                            type: result[i]["type"],
                            type_desc: result[i]["type_desc"],
                        };
                        jsonRes.push(types);
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
}

exports.get_currency = function(req,res)
{
    //var userid = req.query["user_id"];
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT * FROM job_currency"
            , function (err, result) {
                if (!err && result.length > 0) {
                    var jsonRes = [];
                    var arrayLength = result.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var currencyList = {
                            currency_id: result[i]["currency_id"],
                            name: result[i]["name"]
                        };
                        jsonRes.push(currencyList);
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
}

exports.getIndustryList = function(req,res)
{
    //var userid = req.query["user_id"];
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT * FROM job_industry"
            , function (err, result) {
                if (!err && result.length > 0) {
                    var jsonRes = [];
                    var arrayLength = result.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var industryList = {
                            industry_id: result[i]["industry_id"],
                            name: result[i]["name"]
                        };
                        jsonRes.push(industryList);
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
}

exports.getCurrentJobList = function(req,res)
{
    var result = {
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
            "results": [{
                "id": 43,
                "jobTitle": "Global Director of IT - SAP",
                "datePosted": "13/07/2015",
                "postedBy":"jsjsm.15",
                "views":14,
                "applicants": 12,
                "isRemovable":true
            },{
                "id": "44",
                "jobTitle": "SAP Analyst - MM,PP",
                "datePosted": "11/07/2015",
                "postedBy":"p.johnson@company.com",
                "views":0,
                "applicants": 12,
                "isRemovable":true
            },{
                "id": "45",
                "jobTitle": "Data Analyst - Excel(SAP or JDE)",
                "datePosted": "11/04/2015",
                "postedBy":"tshwa.15",
                "views":0,
                "applicants": 12,
                "isRemovable":true
            },{
                "id": "46",
                "jobTitle": "Java Dev",
                "datePosted": "11/04/2014",
                "postedBy":"p.johnson",
                "views":2,
                "applicants": 34,
                "isRemovable":true
            },{
                "id": "47",
                "jobTitle": "UI Consultant",
                "datePosted": "13/04/2015",
                "postedBy":"p.johnsonm",
                "views":12,
                "applicants": 344,
                "isRemovable":true
            }
            ]
        }
    }
    res.send(result);

}
