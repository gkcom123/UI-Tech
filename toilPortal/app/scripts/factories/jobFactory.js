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
    .factory('GetJobType', function($resource){
        return {
            getResource: function(){
                return $resource('/toilAPi/get_job_type/', {});
            }
        };
    })
    .factory('GetCountry', function($resource) {
        return {
            getResource: function () {
                return $resource('/toilAPi/get_country/', {});
            }
        };
    })
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

;


