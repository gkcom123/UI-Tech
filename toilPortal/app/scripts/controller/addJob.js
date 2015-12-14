/**
 * Created by gunjan.kumar on 12/12/15.
 */
'use strict';
angular.module("toilApp")
    .controller('addJobController', [
        '$scope',
        '$rootScope',
        '$location',
        'GetJobType','GetIndustry','GetCurrency','GetDuration','GetLanguage','GetCountry',
        function( $scope, $rootScope, $location, GetJobType,GetIndustry,GetCurrency,
                  GetDuration,GetLanguage,GetCountry){

            var jobTypeList = {};
            var industryList = {};

            $scope.jobTypes 		= {};
            $scope.selectedJobType = "";
            $scope.industries 		= {};
            $scope.currencies 		= {};
            $scope.durations 		= {};
            $scope.language 		= {};
            $scope.country          = {};
            $scope.selectedIndustries = "";
            $scope.selectedCurrency = "";
            $scope.selectedDuration = "";
            $scope.selectedLanguage = "";
            $scope.selectedCountry = "";
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
            function loadDurationList(){
                var durationListResource = GetDuration.getResource();
                durationListResource.get(function(response){
                    if(response.status == 'error' && response.error_code == 400){
                    }
                    if(Object.getOwnPropertyNames(response.response_data).length === 0){
                        console.warn("GetDuration API returned empty Object");
                    }
                    else{
                        $scope.durations.data = response.response_data.results;
                    }
                });
            }
            function loadLanguageList(){
                var languageListResource = GetLanguage.getResource();
                languageListResource.get(function(response){
                    if(response.status == 'error' && response.error_code == 400){
                    }
                    if(Object.getOwnPropertyNames(response.response_data).length === 0){
                        console.warn("GetLanguage API returned empty Object");
                    }
                    else{
                        $scope.language.data = response.response_data.results;
                    }
                });
            }
            function loadCountryList(){
                var countryListResource = GetCountry.getResource();
                countryListResource.get(function(response){
                    if(response.status == 'error' && response.error_code == 400){
                    }
                    if(Object.getOwnPropertyNames(response.response_data).length === 0){
                        console.warn("GetCountry API returned empty Object");
                    }
                    else{
                        $scope.country.data = response.response_data.results;
                    }
                });
            }
            loadJobTypeList();
            loadIndustryList();
            loadCurrencyList();
            loadDurationList();
            loadLanguageList();
            loadCountryList();
        }]);
