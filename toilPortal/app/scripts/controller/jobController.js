/**
 * Created by gunjan.kumar on 10/2/15.
 */
'use strict';
angular.module("toilApp")
    .controller('manageJobController', [
        '$scope',
        '$rootScope','$state',
        'localStorageService',
        'GetCurrentJobList',
        'UpdateJob','JobService',
        function( $scope, $rootScope,$state, localStorageService, GetCurrentJobList,UpdateJob,JobService){

            var currentJobList 	= {};
            var userId = getUserProfile().user_id;
            var pageNo 				= 1;
            var paginationCount		= 20 ;
            $scope.currentPage = 1;
            $scope.pageSize = 10;
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

            $scope.editJob = function(job)
            {
                JobService.setTitle("EDIT A JOB");
                JobService.setSelectedJob(job);
                JobService.setTypeOfChange("edit");
                //$rootScope.$emit('ModifyToilJob',job);
                $state.go('editJob',{typeOfChange:'edit'});

            }
            $scope.deleteJob = function(job)
            {
                var cancelIt = confirm('Do you want to delete the job:' + job.jobTitle);
                if(!cancelIt)
                {
                    return;
                }

                var data ={
                    'id':job.id,
                    'jobTitle':job.jobTitle,
                    'user_id':userId
                }
                var updateJobRes = UpdateJob.getResource();
                updateJobRes.save(data, function success(response){
                        var resData = response.response_data || {};
                        // $('#newForm .spin').hide();

                        if(response.status == 'success') {
                            alert("Job Removed Successfully");
                            loadCurrentJobs();
                        } else {
                            var reason = 'Job Deletion Failed. Please Try After Some Time.';
                            if(resData.error_code == 201) {
                                reason = resData.error_desc;
                            }
                        }
                    },
                    function error(){}
                );

            }

        }]);
