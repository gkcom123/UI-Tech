/**
 * Created by gunjan.kumar on 10/1/15.
 */
'use strict';
angular.module('toilApp')
    .factory('GetUserList',function($resource){
        return {
            getResource: function(id,pageNo,paginationCount){
                return $resource('/toilAPi/get_user_list/', {
                    'url':'/toilAPi/get_user_list/',
                    'user_id': id,
                    'page_number' : pageNo,
                    'pagination_count' : paginationCount
                });
            }
        }
    })
    .factory('AddUser', function($resource){
        return {
            getResource: function(){
                return $resource('/toilAPi/addNewUser/', {});
            }
        }
    })
;
