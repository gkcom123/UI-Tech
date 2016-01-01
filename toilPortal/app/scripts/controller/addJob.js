/**
 * Created by gunjan.kumar on 12/12/15.
 */
'use strict';
angular.module("toilApp")
    .controller('addJobController', [
        '$scope',
        '$rootScope',
        '$location',
        '$filter','localStorageService',
        'GetJobType','GetIndustry','GetCurrency','GetDuration','GetLanguage','GetCountry','AddJob',
        function( $scope, $rootScope, $location, $filter,localStorageService,GetJobType,GetIndustry,GetCurrency,
                  GetDuration,GetLanguage,GetCountry,AddJob){

            var jobTypeList = {};
            var industryList = {};
            var userId = getUserProfile().user_id;
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
            $scope.jobType 	  = {type:"Please Select"};
            $scope.industryLabel 	  = {name:"Please Select"};
            $scope.currLabel 	  = {name:"Please Select"};
            $scope.durLabel 	  = {duration:"Please Select"};

            $scope.showDropList = function(){
                $('.jobt-dropdown-list').toggle();
            }
            $scope.showIndDropList = function(){
                $('.ind-dropdown-list').toggle();
            }
            $scope.showCrcDropList = function(){
                $('.curr-dropdown-list').toggle();
            }
            $scope.showDurDropList = function(){
                $('.dur-dropdown-list').toggle();
            }

            $scope.jobTypeSelected = function(j){
                $scope.jobType = j;
                $('.jobt-dropdown-list').hide();
                $scope.selectedJobType   = j;
            };
            $scope.industryDataSelected = function(x){
                $scope.industryLabel = x;
                $('.ind-dropdown-list').hide();
                $scope.selectedIndustries   = x;
            };
            $scope.currencyDataSelected = function(c){
                $scope.currLabel = c;
                $('.curr-dropdown-list').hide();
                $scope.selectedCurrency   = c;
            };

            $scope.durationDataSelected = function(d){
                $scope.durLabel = d;
                $('.dur-dropdown-list').hide();
                $scope.selectedDuration   = d;
            };
            function getUserProfile()
            {
                var toilId = localStorageService.get('toil-id');
                var encodedProfile = toilId.split('.')[1];
                var profile = JSON.parse(Helper.url_base64_decode(encodedProfile));
                return profile;
            }

            function resetValues()
            {
                $scope.jobTitle ="";
                $scope.description ="";
                $scope.indWtg="3";
                $scope.city="";
                $scope.rateSal="";
/*
                if ($scope.addtoilUserForm)
                    $scope.addtoilUserForm.$setPristine();
*/
            }

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
                    'jobType': $scope.selectedJobType.type_id,
                    'description':$scope.description,
                    'industry_id':$scope.selectedIndustries.industry_id,
                    'indWtg':$scope.indWtg,
                    'rate': $scope.rateSal,
                    'rateWtg':$scope.rateWtg,
                    'currency': $scope.selectedCurrency.currency_id,
                    'duration': $scope.selectedDuration.duration_id,
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
                };
                var addJobRes = AddJob.getResource();
                addJobRes.save(data, function success(response) {
                    var resData = response.response_data || {};
                    // $('#newForm .spin').hide();

                    if (response.status == 'success') {
                        var jobId = response.response_data["jobId"];
                        $scope.$broadcast ('saveSkills',jobId);
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
            $scope.$on('skillSaved', function(e,data) {
                alert("Job saved Successfully");
                resetValues();
            });
            $rootScope.$on('jobDateChanged', function(event,data){
                var pDate = ( $filter('date')(data, 'yyyy-MM-dd'));
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
