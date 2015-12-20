/**
 * Created by gunjan.kumar on 12/12/15.
 */
'use strict';
angular.module("toilApp")
    .controller('addJobController', [
        '$scope',
        '$rootScope',
        '$location',
        '$filter',
        'GetJobType','GetIndustry','GetCurrency','GetDuration','GetLanguage','GetCountry','AddJob',
        function( $scope, $rootScope, $location, $filter,GetJobType,GetIndustry,GetCurrency,
                  GetDuration,GetLanguage,GetCountry,AddJob){

            var jobTypeList = {};
            var industryList = {};
            var userId = $rootScope.userId;
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
            $scope.createNewJob = function()
            {

                var validation = $("#addJobForm").valid();
                if(validation==false)
                {
                    alert('Please provide all information.');
                    return false;
                }
                var data ={
                    'jobTitle': $scope.jobTitle,
                    'jobType': $scope.selectedJobType,
                    'description':$scope.description,
                    'industry_id':$scope.selectedIndustries,
                    'indWtg':$scope.indWtg,
                    'rate': $scope.rateSal,
                    'rateWtg':$scope.rateWtg,
                    'currency': $scope.selectedCurrency,
                    'duration': $scope.selectedDuration,
                    'country': $scope.selectedCountry,
                    'countryWtg':$scope.countryWtg,
                    'city': $scope.city,
                    'travel': $scope.selectedTravel,
                    'travelWtg':$scope.travelWtg,
                    'prLang': $scope.selectedLanguage,
                    'prlangWtg':$scope.prlangWtg,
                    'stDate': $scope.jobStDate,
                    'stDateWtg':$scope.stDateWtg,
                    'created_by':userId
                }
                var addJobRes = AddJob.getResource();
                addJobRes.save(data, function success(response) {
                    var resData = response.response_data || {};
                    // $('#newForm .spin').hide();

                    if (response.status == 'success') {
                        alert("Job Added Successfully");
                  }
                    else{
                        var reason = 'Job Creation Failed. Please Try After Some Time.';
                        if(resData.error_code == 201) {
                            reason = resData.error_desc;
                        }
                    }
                },
                    function error(){}
                );
            }
            $rootScope.$on('jobDateChanged', function(event,data){
                var pDate = ( $filter('date')(data, 'yyyy-MM-dd'));
                //console.log(pDate);
                $scope.jobStDate = pDate;
            });

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
