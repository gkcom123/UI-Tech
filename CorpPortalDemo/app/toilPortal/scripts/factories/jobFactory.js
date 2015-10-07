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
        }
    });

