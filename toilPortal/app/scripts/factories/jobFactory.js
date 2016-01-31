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
    .factory('GetIndustry', ['$resource',
        function($resource) {
            return $resource('/toilAPi/get_job_industry/', {});
        }])
    .factory('IndustryLoader', ['GetIndustry', '$q',
        function(GetIndustry, $q) {
            var items = [];
            var last_request_failed = true;
            var jobPromise = undefined;
            var getIndustryList = function() {
                if(!jobPromise || last_request_failed) {
                    var delay = $q.defer();
                    GetIndustry.get(function(response) {
                        last_request_failed = false;
                        delay.resolve(response.response_data.results);
                    }, function() {
                        last_request_failed = true;
                        delay.reject('Unable to fetch Industry List ');
                    });
                    jobPromise = delay.promise;
                }
                return jobPromise;
            }
            return {
                getIndustryList: getIndustryList
            };
        }])
    .factory('GetCurrency', ['$resource',
        function($resource) {
            return $resource('/toilAPi/get_currency/', {});
        }])
    .factory('CurrencyLoader', ['GetCurrency', '$q',
        function(GetCurrency, $q) {
            var items = [];
            var last_request_failed = true;
            var jobPromise = undefined;
            var getCurrencyList = function() {
                if(!jobPromise || last_request_failed) {
                    var delay = $q.defer();
                    GetCurrency.get(function(response) {
                        last_request_failed = false;
                        delay.resolve(response.response_data.results);
                    }, function() {
                        last_request_failed = true;
                        delay.reject('Unable to fetch Currency List ');
                    });
                    jobPromise = delay.promise;
                }
                return jobPromise;
            }
            return {
                getCurrencyList: getCurrencyList
            };
        }])
    .factory('GetDuration', ['$resource',
        function($resource) {
            return $resource('/toilAPi/get_duration/', {});
        }])
    .factory('DurationLoader', ['GetDuration', '$q',
        function(GetDuration, $q) {
            var items = [];
            var last_request_failed = true;
            var jobPromise = undefined;
            var getDurationList = function() {
                if(!jobPromise || last_request_failed) {
                    var delay = $q.defer();
                    GetDuration.get(function(response) {
                        last_request_failed = false;
                        delay.resolve(response.response_data.results);
                    }, function() {
                        last_request_failed = true;
                        delay.reject('Unable to fetch Duration List ');
                    });
                    jobPromise = delay.promise;
                }
                return jobPromise;
            }
            return {
                getDurationList: getDurationList
            };
        }])
    .factory('GetLanguage', ['$resource',
        function($resource) {
            return $resource('/toilAPi/get_language/', {});
        }])
    .factory('LanguageLoader', ['GetLanguage', '$q',
        function(GetLanguage, $q) {
            var items = [];
            var last_request_failed = true;
            var jobPromise = undefined;
            var getLanguageList = function() {
                if(!jobPromise || last_request_failed) {
                    var delay = $q.defer();
                    GetLanguage.get(function(response) {
                        last_request_failed = false;
                        delay.resolve(response.response_data.results);
                    }, function() {
                        last_request_failed = true;
                        delay.reject('Unable to fetch Language List ');
                    });
                    jobPromise = delay.promise;
                }
                return jobPromise;
            }
            return {
                getLanguageList: getLanguageList
            };
        }])
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
    .factory('GetSkillByJobId',function($resource){
        return {
            getResource: function(id){
                return $resource('/toilAPi/get_skill_byJobId/', {
                    'job_id': id
                });
            }
        }
    })
    .factory('SaveSkill', function($resource){
        return {
            getResource: function(){
                return $resource('/toilAPi/save_Skill_list/', {});
            }
        };
    })
    .factory('UpdateSkill', function($resource){
        return {
            getResource: function(){
                return $resource('/toilAPi/update_Skill_list/', {});
            }
        };
    })
    .factory('DeleteJob', function($resource){
        return {
            getResource: function(){
                return $resource('/toilAPi/deleteJob/', {});
            }
        }
    })
    .factory('UpdateJob', function($resource){
        return {
            getResource: function(){
                return $resource('/toilAPi/updateJob/', {});
            }
        }
    })


;


