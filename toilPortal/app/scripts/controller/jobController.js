/**
 * Created by gunjan.kumar on 10/2/15.
 */
'use strict';
angular.module("toilApp")
    .controller('manageJobController', [
        '$scope',
        '$rootScope',
        '$location',
        'GetCurrentJobList',
        function( $scope, $rootScope, $location, GetCurrentJobList){

            var currentJobList 	= {};
            var userId = $rootScope.userId;
            var pageNo 				= 1;
            var paginationCount		= 20 ;

            $scope.currentJobs 		= {};
            function loadCurrentJobs(){
                var jobListResource = GetCurrentJobList.getResource(userId, pageNo, paginationCount);

                jobListResource.get(function(response){
                    if(response.status == 'error' && response.error_code == 400){
                        //$rootScope.$broadcast('LogoutThisUser',{});
                    }

                    if(Object.getOwnPropertyNames(response.response_data).length === 0){
                        console.warn("Get Current Job API returned empty Object");
                    }
                    else{
                        currentJobList = response.response_data.results;
                        $scope.currentJobs.data = response.response_data.results;
                    }
                });
            }
            loadCurrentJobs();
        }]);
