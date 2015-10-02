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
                    'corporate_id': id,
                    'page_number' : pageNo,
                    'pagination_count' : paginationCount
                });
            }
        }
    })
/*    .factory('GetPastBookings', function($resource){
        return {
            getResource: function(id,pageNo,paginationCount){
                var data = {
                    'url':'/api/get_corporate_past_bookings/',
                    'corporate_id': id,
                    'page_number' : pageNo,
                    'pagination_count' : paginationCount,
                    'remote_host':'RTFS_URL'
                }
                return $resource('/api/get_corporate_past_bookings/', data);
            }
        }
    })

    .factory('DownloadReceipt', function($resource){
        return {
            getResource: function(receiptNumber,id){
                return $resource('api/download_file/',{
                    'url':'/settlements/api/settlement/getDownloadRecipts',
                    'corporate_id': id,
                    'receiptNumber': receiptNumber,
                    'remote_host':'SETTLEMENT_URL'
                });

            }
        }
    })*/
;
