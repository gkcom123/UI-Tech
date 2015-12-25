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
exports.get_duration = function(req,res)
{
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT * FROM job_duration"
            , function (err, result) {
                if (!err && result.length > 0) {
                    var jsonRes = [];
                    var arrayLength = result.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var durationList = {
                            duration_id: result[i]["duration_id"],
                            duration: result[i]["duration"]
                        };
                        jsonRes.push(durationList);
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
exports.getLanguageList = function(req,res)
{
    //var userid = req.query["user_id"];
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT * FROM language"
            , function (err, result) {
                if (!err && result.length > 0) {
                    var jsonRes = [];
                    var arrayLength = result.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var languageList = {
                            language_id: result[i]["language_id"],
                            language: result[i]["language"]
                        };
                        jsonRes.push(languageList);
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
exports.getSkillList = function(req,res)
{
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT * FROM skill"
            , function (err, result) {
                if (!err && result.length > 0) {
                    var jsonRes = [];
                    var arrayLength = result.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var skillList = {
                            skill_id: result[i]["skill_id"],
                            skill_name: result[i]["skill_name"]
                        };
                        jsonRes.push(skillList);
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
exports.getCountryList = function(req,res)
{
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT * FROM country"
            , function (err, result) {
                if (!err && result.length > 0) {
                    var jsonRes = [];
                    var arrayLength = result.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var countryList = {
                            country_id: result[i]["country_id"],
                            name: result[i]["name"]
                        };
                        jsonRes.push(countryList);
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
exports.addNewJob = function(req,res)
{
    var reqObj = req.body;
    var jobTitle = reqObj["jobTitle"];
    var jobType = reqObj["jobType"];
    var description = reqObj["description"];
    var industry_id = reqObj["industry_id"];
    var indWtg = reqObj["indWtg"];
    var rate = reqObj["rate"];
    var rateWtg = reqObj["rateWtg"];
    var currency = reqObj["currency"];
    var duration = reqObj["duration"];
    var country = reqObj["country"];
    var countryWtg = reqObj["countryWtg"];
    var city = reqObj["city"];
    var travel ;
    if(reqObj["travel"]=='No')
    {
        travel = '2';
    }
    else{
        travel = '1';
    }
    var travelWtg = reqObj["travelWtg"];
    var prLang = reqObj["prLang"];
    var prlangWtg = reqObj["prlangWtg"];
    var stDate = reqObj["stDate"];
    var stDateWtg = reqObj["stDateWtg"];
    var created_by = reqObj["created_by"];
    /*
     INSERT INTO job_table (job_title,job_type,job_desc,industry_id,ind_wtg,salary,sal_wtg,currency_id,duration_id,country_id,country_wtg,city,istravel,trvl_wtg,lang_id,lang_wtg,start_date,srtdt_wtg,created_by)
     VALUES('Big data','1','Big dataBig dataBig dataBig databig data','2','2','456','2','3','3','3','3','London','1','1','2','2','2015-12-24','3','3')
     */
    var query = "INSERT INTO job_table (job_title,job_type,job_desc,industry_id,ind_wtg,salary,sal_wtg,currency_id," +
        "duration_id,country_id,country_wtg,city,istravel,trvl_wtg,lang_id,lang_wtg,start_date,srtdt_wtg,created_by)" +
        " VALUES" + "('" + jobTitle + "','" + jobType + "','" + description + "','" + industry_id + "','" + indWtg + "','" +
        rate + "','" + rateWtg + "','" + currency + "','" + duration + "','" + country + "','" + countryWtg + "','" +
        city + "','" + travel + "','" + travelWtg + "','" + prLang + "','" + prlangWtg + "','" + stDate +
        "','" + stDateWtg + "','" + created_by + "')";

    dbPool.getConnection(function(err, conn) {
        conn.query(query,
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
