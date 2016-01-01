/**
 * Created by gunjan.kumar on 10/2/15.
 */
'use strict';
angular.module("toilApp")
    .controller('manageJobController', [
        '$scope',
        '$rootScope',
        'localStorageService',
        'GetCurrentJobList',
        function( $scope, $rootScope, localStorageService, GetCurrentJobList){

            var currentJobList 	= {};
            var userId = getUserProfile().user_id;
            var pageNo 				= 1;
            var paginationCount		= 20 ;
            function getUserProfile()
            {
                var toilId = localStorageService.get('toil-id');
                var encodedProfile = toilId.split('.')[1];
                var profile = JSON.parse(Helper.url_base64_decode(encodedProfile));
                return profile;
            }

            $scope.currentJobs 		= {};
            $scope.archivedJobs 		= {};
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
