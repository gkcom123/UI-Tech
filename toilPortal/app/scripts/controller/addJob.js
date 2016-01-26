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
        'JobTypeLoader','GetIndustry','GetCurrency','GetDuration','GetLanguage','GetCountry','AddJob','JobService',
        function( $scope, $rootScope, $location, $filter,localStorageService,JobTypeLoader,GetIndustry,GetCurrency,
                  GetDuration,GetLanguage,GetCountry,AddJob,JobService){

            var jobTypeList = {};
            var industryList = {};
            var userId = getUserProfile().user_id;
            $scope.jobTypes 		= {};
            $scope.selectedJobType = "";
            $scope.industries 		= {};
            $scope.currencies 		= {};
            $scope.durations 		= {};
            $scope.travels 		= {};
            $scope.language 		= {};
            $scope.country          = {};
            $scope.selectedIndustries = "";
            $scope.selectedCurrency = "";
            $scope.selectedDuration = "";
            $scope.selectedLanguage = "";
            $scope.selectedCountry = "";
            $scope.selectedTravel = "";
            $scope.jobType 	  = {type:"Please Select"};
            $scope.industryLabel 	  = {name:"Please Select"};
            $scope.currLabel 	  = {name:"Please Select"};
            $scope.durLabel 	  = {duration:"Please Select"};
            $scope.cntLabel 	  = {name:"Please Select"};
            $scope.langLabel 	  = {language:"Please Select"};
            $scope.travelLabel 	  = {name:"Please Select"};

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
            $scope.showCntDropList = function(){
                $('.cnt-dropdown-list').toggle();
            }
            $scope.showTravelDropList = function(){
                $('.tr-dropdown-list').toggle();
            }
            $scope.showLangDropList = function(){
                $('.lang-dropdown-list').toggle();
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
            $scope.countryDataSelected = function(d){
                $scope.cntLabel = d;
                $('.cnt-dropdown-list').hide();
                $scope.selectedCountry   = d;
            };
            $scope.travelDataSelected = function(d){
                $scope.travelLabel = d;
                $('.tr-dropdown-list').hide();
                $scope.selectedTravel   = d;
            };
            $scope.languageDataSelected = function(l){
                $scope.langLabel = l;
                $('.lang-dropdown-list').hide();
                $scope.selectedLanguage   = l;
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
                $scope.compName="";
                $scope.description ="";
                $scope.indWtg="3";
                $scope.city="";
                $scope.rateSal="";
/*
                if ($scope.addtoilUserForm)
                    $scope.addtoilUserForm.$setPristine();
*/
            }
            function performSanityCheck(){

                var missingData;
                var sanityChekClear = false;
                if(!$scope.selectedJobType)
                    missingData = 'Please Select Job Type';
                else if(!$scope.selectedIndustries)
                    missingData = 'Please Select Industries';
                else if(!$scope.selectedCurrency)
                    missingData = 'Please Select Currencies';
                else if(!$scope.selectedDuration)
                    missingData = 'Please Select Duration';
                else if(!$scope.selectedCountry)
                    missingData = 'Please Select Country';
                else if(!$scope.selectedTravel)
                    missingData = 'Please Select Travel';
                else if(!$scope.selectedLanguage)
                    missingData = 'Please Select Language';
                else
                    sanityChekClear = true;
                if(!sanityChekClear)
                    alert(missingData);

                return sanityChekClear;
            }
            function saveJobSkills()
            {
                var data ={
                    'jobTitle': $scope.jobTitle,
                    'jobType': $scope.selectedJobType.type_id,
                    'description':$scope.description,
                    'compName':$scope.compName,
                    'industry_id':$scope.selectedIndustries.industry_id,
                    'indWtg':$scope.indWtg || 3,
                    'rate': $scope.rateSal,
                    'rateWtg':$scope.rateWtg || 3,
                    'currency': $scope.selectedCurrency.currency_id,
                    'duration': $scope.selectedDuration.duration_id,
                    'country': $scope.selectedCountry.country_id,
                    'countryWtg':$scope.countryWtg || 3,
                    'city': $scope.city,
                    'travel': $scope.selectedTravel.travel_id,
                    'travelWtg':$scope.travelWtg || 3,
                    'prLang': $scope.selectedLanguage.language_id,
                    'prlangWtg':$scope.prlangWtg || 3,
                    'stDate': $scope.jobStDate,
                    'stDateWtg':$scope.stDateWtg || 3,
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
/*
            $scope.syncJob = function() {
                console.log("working");
                $scope.code = null;
                $scope.response = null;
                $http({
                    method: 'PATCH',
                    url: 'http://synchronization.api.toilme.com/schedule',
                    headers: {
                        "Authorization": "Bearer Haingabeith1asaechaiboagaihaeRooyaesh9Ameitubae8iekaht6oong6pae7zahpahm7eibie4shoveix8ohrae4Ophe",
                        "Access-Control-Allow-Origin": "true"
                    }
                })
                    .then(function(response) {
                        console.log(response);
                        if (response.data == 'ok') {
                            // success

                        }
                        else {
                            // failed
                        }
                    });
            };
*/
            $scope.createNewJob = function()
            {
               var validation = $("#addJobForm").valid();
                if(validation==false)
                {
                    alert('Please provide all information.');
                    return false;
                }
                var sanityCheck = performSanityCheck();
                if(!sanityCheck){
                    return;
                }
                else{
                    $scope.$broadcast ('performSkillsSanityCheck');
                }
            }
            $scope.$on('skillSaved', function(e,data) {
                alert("Job saved Successfully");
                resetValues();
            });
            $scope.$on('sanityCheckDone', function(e,data) {
                saveJobSkills();
            });
            $rootScope.$on('jobDateChanged', function(event,data){
                var pDate = ( $filter('date')(data, 'yyyy-MM-dd'));
                $scope.jobStDate = pDate;
            });

            function loadJobTypeList(){
                JobTypeLoader.getAllJobTypes()
                    .then(function(data) {
                        $scope.jobTypes.data = data;
                        if(JobService.getTypeOfChange()=='edit')
                        {
                            setJobType(JobService.getSelectedJob(),$scope.jobTypes.data);

                        }
                    },
                    function(data) {
                        console.log('Data retrieval failed.')
                    });
            }
            function setJobType(selectedJob,masterData){
                for(var i=0; i < masterData.length; i++){
                    if(masterData[i].type_id == selectedJob.job_type){
                        $scope.jobType = masterData[i];
                        $scope.selectedJobType = selectedJob;
                        break;
                    }
                }
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
                        //console.log(JSON.stringify($scope.durations.data));
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
            function loadTravelList(){
                $scope.travels.data= [{"travel_id":1,"name":"Yes"},{"travel_id":2,"name":"No"}]
            }
            loadJobTypeList();
            loadIndustryList();
            loadCurrencyList();
            loadDurationList();
            loadLanguageList();
            loadCountryList();
            loadTravelList();
        }]);
