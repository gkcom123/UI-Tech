/**
 * Created by gunjan.kumar on 10/2/15.
 */
/**
 * Created by gunjan.kumar on 10/2/15.
 */
var dbPool = require('./db').pool;
var request = require('request');

exports.getJobTypeList = function(req,res)
{
    //var userid = req.query["user_id"];
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT * FROM job_type"
            , function (err, result) {
                if (!err && result.length >= 0) {
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
                if (!err && result.length >= 0) {
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
                if (!err && result.length >= 0) {
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
                if (!err && result.length >= 0) {
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
                if (!err && result.length >= 0) {
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
        conn.query("SELECT * FROM skill WHERE isActive=1 "
            , function (err, result) {
                if (!err && result.length >= 0) {
                    var jsonRes = [];
                    var arrayLength = result.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var skillList = {
                            skill_id: result[i]["skill_id"],
                            skill_name: result[i]["skill_name"],
                            type_id: result[i]["type_id"]
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
exports.getSkillByJobId = function(req,res)
{
    var jobID = req.query["job_id"];
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT jobSkill.skill_id,jobSkill.skil_wtg,jobSkill.skill_type_id,jobSkill.created_by," +
            "skill.skill_name" +
            " FROM job_skills as jobSkill INNER JOIN skill " +
            "ON jobSkill.skill_id=skill.skill_id  WHERE job_id='" + jobID +"'"
            , function (err, result) {
                if (!err && result.length >= 0) {
                    var jsonRes = [];
                    var arrayLength = result.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var skillList = {
                            skill_id: result[i]["skill_id"],
                            skill_name: result[i]["skill_name"],
                            skill_wtg: result[i]["skill_wtg"],
                            type_id: result[i]["skill_type_id"],
                            created_by: result[i]["created_by"],

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
                if (!err && result.length >= 0) {
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
exports.addNewJob = function(req,res) {
    var reqObj = req.body;
    var jobTitle = reqObj["jobTitle"];
    var jobType = reqObj["jobType"];
    var description = reqObj["description"];
    var compName = reqObj["compName"];
    var industry_id = reqObj["industry_id"];
    var indWtg = reqObj["indWtg"];
    var rate = reqObj["rate"];
    var rateWtg = reqObj["rateWtg"];
    var currency = reqObj["currency"];
    var duration = reqObj["duration"];
    var country = reqObj["country"];
    var countryWtg = reqObj["countryWtg"];
    var city = reqObj["city"];
    var travel = reqObj["travel"];
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
    var query = "INSERT INTO job_table (job_title,job_type,job_desc,comp_name,industry_id,ind_wtg,salary,sal_wtg,currency_id," +
        "duration_id,country_id,country_wtg,city,istravel,trvl_wtg,lang_id,lang_wtg,start_date,srtdt_wtg,created_by,post_date)" +
        " VALUES" + "('" + jobTitle + "','" + jobType + "','" + description + "','"+compName+"','" + industry_id + "','" + indWtg + "','" +
        rate + "','" + rateWtg + "','" + currency + "','" + duration + "','" + country + "','" + countryWtg + "','" +
        city + "','" + travel + "','" + travelWtg + "','" + prLang + "','" + prlangWtg + "','" + stDate +
        "','" + stDateWtg + "','" + created_by + "',CURDATE())";

    var finalResult = "";
    dbPool.getConnection(function (err, conn) {
        conn.query(query,
            function (err, result) {
                if (!err) {
                    finalResult = {
                        "status": "success",
                        "error_desc": "",
                        "error_code": "",
                        "response_data": {}
                    }
                    //res.send(finalResult);
                    if (finalResult.status == 'success') {
                        conn.query("SELECT LAST_INSERT_ID()",
                            function (err, result) {
                                if (!err) {
                                    var arrayLength = result.length;
                                    for (var i = 0; i < arrayLength; i++) {
                                        var profile = {
                                            jobId: result[i]["LAST_INSERT_ID()"],
                                        };
                                        var callResult = {
                                            "status": "success",
                                            "error_desc": "",
                                            "error_code": "",
                                            "response_data": profile
                                        };
                                        res.send(callResult);
                                    }
                                }
                            });
                    }
                }
            });
        conn.release();
    });
}
exports.updateViewAndInterest = function(req,res)
{
    var reqObj = req.body;
    var val = reqObj["updateReq"];
    var job_id = reqObj["job_id"];
    //var job_title = reqObj["job_title"];

    if(val=="view")
    {
        runViewInterestQuery("UPDATE toil.job_table SET view=view+1 WHERE job_id="+job_id,res);
    }
    else if(val=="interest")
    {
        runViewInterestQuery("UPDATE toil.job_table SET interest=interest+1 WHERE job_id="+job_id,res);
    }
    else{
        res.send("Something Went Wrong.");
    }

}
function runViewInterestQuery(query,res)
{
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

exports.saveJobSkills = function(req,res)
{
    var reqObj = req.body;
    var profModel = reqObj["profModel"];
    var profRating = reqObj["profRating"];
    var projModel = reqObj["projModel"];
    var projRating = reqObj["projSkillRating"];
    var personalModel = reqObj["personalModel"];
    var personalSkillRating = reqObj["personalSkillRating"];
    var job_id = reqObj["jobId"];
    var created_by = reqObj["created_by"];
    var valueQuery = "";
    for(var i=0;i<profModel.length;i++)
    {
        valueQuery = valueQuery +"('"+profModel[i].skill_id+"','"+profRating[i]+"','1','"+job_id+"','"+created_by+"'),";
    }
    for(var j=0;j<projModel.length;j++)
    {
        valueQuery = valueQuery +"('"+projModel[j].skill_id+"','"+projRating[j]+"','2','"+job_id+"','"+created_by+"'),";
    }
    for(var k=0;k<personalModel.length;k++)
    {
        valueQuery = valueQuery +"('"+personalModel[k].skill_id+"','"+personalSkillRating[k]+"','3','"+job_id+"','"+created_by+"'),";
    }
    var query = "INSERT INTO job_skills (skill_id,skil_wtg,skill_type_id,job_id,created_by) VALUES "+valueQuery.slice(0,-1);
    /*
     INSERT INTO job_skills (skill_id,skil_wtg,skill_type_id,job_id,created_by) VALUES(1,2,3,LAST_INSERT_ID(),3),(4,5,6,LAST_INSERT_ID(),4);
     */
    runSkillQuery(query,res);
}
function runSkillQuery(query,res)
{
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
                    syncJob();
                }
            });
        conn.release();
    });
}
exports.updateJobSkills = function(req,res)
{
    var reqObj = req.body;
    var profModel = reqObj["profModel"];
    var profRating = reqObj["profRating"];
    var projModel = reqObj["projModel"];
    var projRating = reqObj["projSkillRating"];
    var personalModel = reqObj["personalModel"];
    var personalSkillRating = reqObj["personalSkillRating"];
    var job_id = reqObj["jobId"];
    var created_by = reqObj["created_by"];
    var valueQuery = "";
    for(var i=0;i<profModel.length;i++)
    {
        if(profModel[i].isEdit)
        {
            valueQuery = valueQuery +"('"+profModel[i].skill_id+"','"+profRating[i]+"','1','"+job_id+"','"+created_by+"'),";
        }
    }
    for(var j=0;j<projModel.length;j++)
    {
        if(projModel[j].isEdit)
        {
            valueQuery = valueQuery +"('"+projModel[j].skill_id+"','"+projRating[j]+"','2','"+job_id+"','"+created_by+"'),";
        }
    }
    for(var k=0;k<personalModel.length;k++)
    {
        if(personalModel[k].isEdit)
        {
            valueQuery = valueQuery +"('"+personalModel[k].skill_id+"','"+personalSkillRating[k]+"','3','"+job_id+"','"+created_by+"'),";
        }
    }

    var query = "INSERT INTO job_skills (skill_id,skil_wtg,skill_type_id,job_id,created_by) VALUES "+valueQuery.slice(0,-1);
    /*
     INSERT INTO job_skills (skill_id,skil_wtg,skill_type_id,job_id,created_by) VALUES(1,2,3,LAST_INSERT_ID(),3),(4,5,6,LAST_INSERT_ID(),4);
     */
    runSkillQuery(query,res);
}
exports.deleteJob = function(req,res)
{
    var reqObj = req.body;
    var id = reqObj["id"];
    var jobTitle = reqObj["jobTitle"];
    var queryq = "UPDATE job_table SET isActive=0 WHERE job_id='"+id+"' AND job_title='"+jobTitle+"'";
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
                    syncJob();
                }
            });
        conn.release();
    });

}
exports.upDateJob = function(req,res)
{
    var reqObj = req.body;
    var id = reqObj["id"];
    var rate = reqObj["rate"];
    var description = reqObj["description"];
    var duration = reqObj["duration"];
    var updateQuery = "UPDATE job_table SET salary='"+rate+"',job_desc='"+description+"',duration_id='"+duration+
        "' WHERE job_id='"+id+"'";
    dbPool.getConnection(function(err, conn) {
        conn.query(updateQuery,
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
    var userid = req.query["user_id"];
    var pageNo= req.query["page_number"];
    var pagination_count = req.query["pagination_count"];
/*
 SELECT Job.job_id, job.job_title,job.start_date,toilUser.f_name
 FROM job_table as job
 INNER JOIN toilUser
 ON job.created_by=toilUser.user_id where toilUser.user_id=5;
 */
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT job.job_id, job.job_title,job.job_type,job.job_desc,job.comp_name,job.industry_id,job.ind_wtg,job.salary,job.sal_wtg,job.currency_id," +
            "job.duration_id,job.country_id,job.country_wtg,job.city,job.isTravel,job.trvl_wtg,job.lang_id,job.lang_wtg," +
            "job.start_date,job.srtdt_wtg,job.post_date,job.view,job.interest,toilUser.f_name FROM job_table as job INNER JOIN toilUser " +
            "ON job.created_by=toilUser.user_id where job.isActive=1 "
        //"ON job.created_by=toilUser.user_id where job.isActive=1 LIMIT "+ pageNo+","+pagination_count
            , function (err, result) {
                if (!err && result.length >= 0) {
                    var jsonRes = [];
                    var arrayLength = result.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var profile = {
                            id: result[i]["job_id"],
                            jobTitle: result[i]["job_title"],
                            job_type: result[i]["job_type"],
                            job_desc: result[i]["job_desc"],
                            comp_name: result[i]["comp_name"],
                            industry_id: result[i]["industry_id"],
                            ind_wtg: result[i]["ind_wtg"],
                            salary: result[i]["salary"],
                            sal_wtg: result[i]["sal_wtg"],
                            currency_id: result[i]["currency_id"],
                            duration_id: result[i]["duration_id"],
                            country_id: result[i]["country_id"],
                            country_wtg: result[i]["country_wtg"],
                            city: result[i]["city"],
                            isTravel: result[i]["isTravel"],
                            trvl_wtg: result[i]["trvl_wtg"],
                            lang_id: result[i]["lang_id"],
                            lang_wtg: result[i]["lang_wtg"],
                            strdt_wtg: result[i]["srtdt_wtg"],
                            startDate: result[i]["start_date"],
                            datePosted: result[i]["post_date"],
                            postedBy: result[i]["f_name"],
                            views: result[i]["view"],
                            "interest": result[i]["interest"],
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

}
function syncJob()
{
    request({
        url: 'http://synchronization.api.toilme.com/schedule', //URL to hit
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer Haingabeith1asaechaiboagaihaeRooyaesh9Ameitubae8iekaht6oong6pae7zahpahm7eibie4shoveix8ohrae4Ophe'
        }
    }, function(error, response, body){
        if(error) {
            //console.log(error);
        } else {
            //console.log(response.statusCode, body);
        }
    });
}
exports.getCurrentJobListForApp = function(req,res)
{
    var userid = req.query["user_id"];
    var pageNo= req.query["page_number"];
    var pagination_count = req.query["pagination_count"];
    /*
     SELECT Job.job_id, job.job_title,job.start_date,toilUser.f_name
     FROM job_table as job
     INNER JOIN toilUser
     ON job.created_by=toilUser.user_id where toilUser.user_id=5;
     */
    dbPool.getConnection(function(err, conn) {
        conn.query("SELECT job.job_id, job.job_title,job.job_type,job_type.type,job.job_desc,job.comp_name,job.industry_id," +
            "job_industry.name as industry_name,job.ind_wtg,job.salary,job.sal_wtg,job.currency_id,job_currency.name," +
            "job.duration_id,job_duration.duration,job.country_id,country.name as countryName,job.country_wtg," +
            "job.city,job.isTravel,job.trvl_wtg,job.lang_id,job.view,job.interest,language.language,job.lang_wtg,job.start_date," +
            "job.srtdt_wtg,job.post_date,job.isActive,toilUser.f_name as createdBy," +
            "GROUP_CONCAT(s.skill_id SEPARATOR ',') skillidList," +
            "GROUP_CONCAT(skill.skill_name SEPARATOR ',') skillLnameist," +
            "GROUP_CONCAT(s.skil_wtg SEPARATOR ',') skillweightageList " +
            "FROM job_table as job " +
            "INNER JOIN toilUser  ON job.created_by=toilUser.user_id " +
            "JOIN job_industry ON job.industry_id=job_industry.industry_id " +
            "JOIN job_type ON job.job_type=job_type.type_id " +
            "JOIN job_currency ON job.currency_id=job_currency.currency_id " +
            "JOIN job_duration ON job.duration_id=job_duration.duration_id " +
            "JOIN country ON job.country_id=country.country_id " +
            "JOIN language ON job.lang_id=language.language_id " +
            "LEFT JOIN job_skills s ON s.job_id = job.job_id " +
            "LEFT JOIN skill ON skill.skill_id=s.skill_id group by job.job_id"
            //"ON job.created_by=toilUser.user_id where job.isActive=1 LIMIT "+ pageNo+","+pagination_count
            , function (err, result) {
                if (!err && result.length >= 0) {
                    var jsonRes = [];
                    var arrayLength = result.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var skillArray=[];
                        //console.log(result[i]);
                        var skillIdList = result[i]["skillidList"];
                        var skillList= result[i]["skillLnameist"];
                        var skillratingList= result[i]["skillweightageList"];
                        if(skillList!=null && skillratingList!=null)
                        {
                            var skillidListArray = skillIdList.split(",");
                            var skillListArray = skillList.split(",");
                            var skilratinglListArray = skillratingList.split(",");
                            for (var sl = 0; sl <skillListArray.length; sl++)
                            {
                                var job_skill =
                                {
                                    skill_id:skillidListArray[sl],
                                    skill_name:skillListArray[sl],
                                    skill_rating:skilratinglListArray[sl]
                                }
                                skillArray.push(job_skill);
                            }
                        }

                        var profile = {
                            id: result[i]["job_id"],
                            jobTitle: result[i]["job_title"],
                            job_type: result[i]["type"],
                            job_desc: result[i]["job_desc"],
                            company_name: result[i]["comp_name"],
                            industry_id: result[i]["industry_id"],
                            industry_name: result[i]["industry_name"],
                            ind_wtg: result[i]["ind_wtg"],
                            salary: result[i]["salary"],
                            sal_wtg: result[i]["sal_wtg"],
                            currency_id: result[i]["currency_id"],
                            currency_name: result[i]["name"].substring(0,3),
                            duration_id: result[i]["duration_id"],
                            duration_name: result[i]["duration"],
                            country_id: result[i]["country_id"],
                            country_name: result[i]["countryName"],
                            country_wtg: result[i]["country_wtg"],
                            city: result[i]["city"],
                            skillList:skillArray,
                            isTravel: result[i]["isTravel"],
                            isActive: result[i]["isActive"],
                            trvl_wtg: result[i]["trvl_wtg"],
                            lang_id: result[i]["lang_id"],
                            lang_name: result[i]["language"],
                            lang_wtg: result[i]["lang_wtg"],
                            strdt_wtg: result[i]["srtdt_wtg"],
                            startDate: result[i]["start_date"],
                            datePosted: result[i]["post_date"],
                            postedBy: result[i]["createdBy"],
                            views: result[i]["view"],
                            "interest": result[i]["interest"],
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

}
