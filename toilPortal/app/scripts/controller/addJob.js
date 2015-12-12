/**
 * Created by gunjan.kumar on 12/12/15.
 */
/**
 * Created by gunjan.kumar on 10/2/15.
 */
'use strict';
angular.module("toilApp")
    .controller('addJobController', [
        '$scope',
        '$rootScope',
        '$location',
        'GetJobType','GetIndustry','GetCurrency',
        function( $scope, $rootScope, $location, GetJobType,GetIndustry,GetCurrency){

            var currentJobList 	= {};
            var jobTypeList = {};
            var industryList = {};
            var userId = "";
            var pageNo 				= 1;
            var paginationCount		= 4 ;

            $scope.jobTypes 		= {};
            $scope.selectedJobType = "";
            $scope.industries 		= {};
            $scope.currencies 		= {};
            $scope.selectedIndustries = "";
            $scope.selectedCurrency = "";
            function loadJobTypeList(){
                var jobTypeListResource = GetJobType.getResource();
                jobTypeListResource.get(function(response){
                    if(response.status == 'error' && response.error_code == 400){
                        //$rootScope.$broadcast('LogoutThisUser',{});
                    }
                    if(Object.getOwnPropertyNames(response.response_data).length === 0){
                        console.warn("Get Job Type API returned empty Object");
                    }
                    else{
                        jobTypeList = response.response_data.results;
                        $scope.jobTypes.data = response.response_data.results;
                    }
                });
            }
            function loadIndustryList(){
                var industryListResource = GetIndustry.getResource();
                industryListResource.get(function(response){
                    if(response.status == 'error' && response.error_code == 400){
                        //$rootScope.$broadcast('LogoutThisUser',{});
                    }
                    if(Object.getOwnPropertyNames(response.response_data).length === 0){
                        console.warn("Get Industry API returned empty Object");
                    }
                    else{
                        industryList = response.response_data.results;
                        $scope.industries.data = response.response_data.results;
                    }
                });
            }
            function loadCurrencyList(){
                var currencyListResource = GetCurrency.getResource();
                currencyListResource.get(function(response){
                    if(response.status == 'error' && response.error_code == 400){
                        //$rootScope.$broadcast('LogoutThisUser',{});
                    }
                    if(Object.getOwnPropertyNames(response.response_data).length === 0){
                        console.warn("GetCurrency API returned empty Object");
                    }
                    else{
                        //industryList = response.response_data.results;
                        $scope.currencies.data = response.response_data.results;
                    }
                });
            }
            loadJobTypeList();
            loadIndustryList();
            loadCurrencyList();
        }]);
