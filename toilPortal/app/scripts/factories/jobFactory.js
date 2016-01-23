/**
 * Created by gunjan.kumar on 10/2/15.
 */
'use strict';
angular.module('toilApp')
    .factory('GetCurrentJobList',function($resource){
        return {
            getResource: function(id,pageNo,paginationCount){
                return $resource('/toilAPi/get_current_jobList/', {
                    'url':'/toilAPi/get_current_jobList/',
                    'user_id': id,
                    'page_number' : pageNo,
                    'pagination_count' : paginationCount
                });
            }
        };
    })
    .factory('GetJobType', ['$resource',
        function($resource) {
            return $resource('/toilAPi/get_job_type/', {});
        }])
    .factory('JobTypeLoader', ['GetJobType', '$q',
        function(GetJobType, $q) {
            var items = [];
            var last_request_failed = true;
            var jobPromise = undefined;
            var getAllJobTypes = function() {
                if(!jobPromise || last_request_failed) {
                    var delay = $q.defer();
                    GetJobType.get(function(response) {
                        last_request_failed = false;
                        delay.resolve(response.response_data.results);
                    }, function() {
                        last_request_failed = true;
                        delay.reject('Unable to fetch job type ');
                    });
                    jobPromise = delay.promise;
                }
                return jobPromise;
            }
            return {
                getAllJobTypes: getAllJobTypes
            };
        }])
    .factory('GetCountry', ['$resource',
        function($resource) {
            return $resource('/toilAPi/get_country/', {});
        }])
    .factory('CountryLoader', ['GetCountry', '$q',
        function(GetCountry, $q) {
            var items = [];
            var last_request_failed = true;
            var jobPromise = undefined;
            var getCountryList = function() {
                if(!jobPromise || last_request_failed) {
                    var delay = $q.defer();
                    GetCountry.get(function(response) {
                        last_request_failed = false;
                        delay.resolve(response.response_data.results);
                    }, function() {
                        last_request_failed = true;
                        delay.reject('Unable to fetch Country List ');
                    });
                    jobPromise = delay.promise;
                }
                return jobPromise;
            }
            return {
                getCountryList: getCountryList
            };
        }])

    .factory('GetIndustry', function($resource) {
        return {
            getResource: function () {
                return $resource('/toilAPi/get_job_industry/', {});
            }
        };
    })
    .factory('GetCurrency', function($resource) {
        return {
            getResource: function () {
                return $resource('/toilAPi/get_currency/', {});
            }
        };
    })
    .factory('GetDuration', function($resource) {
        return {
            getResource: function () {
                return $resource('/toilAPi/get_duration/', {});
            }
        };
    })
    .factory('GetLanguage', function($resource) {
        return {
            getResource: function () {
                return $resource('/toilAPi/get_location/', {});
            }
        };
    })
    .factory('AddJob', function($resource){
        return {
            getResource: function(){
                return $resource('/toilAPi/addNewJob/', {});
            }
        };
    })
    .factory('GetSkill', function($resource){
        return {
            getResource: function(){
                return $resource('/toilAPi/get_Skill_list/', {});
            }
        };
    })
    .factory('SaveSkill', function($resource){
        return {
            getResource: function(){
                return $resource('/toilAPi/save_Skill_list/', {});
            }
        };
    })
    .factory('UpdateJob', function($resource){
        return {
            getResource: function(){
                return $resource('/toilAPi/updateJob/', {});
            }
        }
    })


;


