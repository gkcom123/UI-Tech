/**
 * Created by gunjan.kumar on 12/12/15.
 */
'use strict';
angular.module("toilApp")
    .controller('addJobController', [
        '$scope','$rootScope','$state','$stateParams','$filter','$timeout','localStorageService',
        'JobTypeLoader','IndustryLoader','CurrencyLoader','DurationLoader','LanguageLoader','CountryLoader',
        'AddJob','UpdateJob','JobService',
        function( $scope, $rootScope,$state, $stateParams, $filter,$timeout,localStorageService,JobTypeLoader,IndustryLoader,
                  CurrencyLoader,DurationLoader,LanguageLoader,CountryLoader,AddJob,UpdateJob,JobService){

            var industryList = {};
            var userId = getUserProfile().user_id;
            $scope.jobTypes 		= {};
            $scope.selectedJobType = "";

            $scope.country          = {};
            $scope.selectedCountry = "";

            $scope.industries 		= {};
            $scope.selectedIndustries = "";

            $scope.currencies 		= {};
            $scope.selectedCurrency = "";

            $scope.durations 		= {};
            $scope.selectedDuration = "";

            $scope.language 		= {};
            $scope.selectedLanguage = "";

            $scope.travels 		= {};
            $scope.selectedTravel = "";

            $scope.fieldEditable = true;

            $scope.showDropList = function(){
                if($scope.fieldEditable)
                {
                    $('.jobt-dropdown-list').toggle();
                }
            }
            $scope.showIndDropList = function(){
                if($scope.fieldEditable)
                {
                    $('.ind-dropdown-list').toggle();
                }

            }
            $scope.showCrcDropList = function(){
                if($scope.fieldEditable)
                {
                    $('.curr-dropdown-list').toggle();
                }

            }
            $scope.showDurDropList = function(){
                $('.dur-dropdown-list').toggle();
            }
            $scope.showCntDropList = function(){
                if($scope.fieldEditable)
                {
                    $('.cnt-dropdown-list').toggle();
                }

            }
            $scope.showTravelDropList = function(){
                if($scope.fieldEditable)
                {
                    $('.tr-dropdown-list').toggle();
                }

            }
            $scope.showLangDropList = function(){
                if($scope.fieldEditable)
                {
                    $('.lang-dropdown-list').toggle();
                }
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
                $timeout(function(){
                    $scope.jobType 	  = {type:"Please Select"};
                    $scope.cntLabel   = {name:"Please Select"};
                    $scope.industryLabel  = {name:"Please Select"};
                    $scope.currLabel 	  = {name:"Please Select"};
                    $scope.durLabel 	  = {duration:"Please Select"};
                    $scope.langLabel 	  = {language:"Please Select"};
                    $scope.travelLabel 	  = {name:"Please Select"};
                });

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
                if($stateParams.typeOfChange=='edit')
                {
                    updateJob();
                    return;
                }
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
            function updateJob()
            {
                var cancelIt = confirm('Do you want to update the job:' + $scope.jobTitle);
                if(!cancelIt)
                {
                    return;
                }
                var data ={
                    'id':JobService.getSelectedJob().id,
                    'description':$scope.description,
                    'rate': $scope.rateSal,
                    'duration': $scope.selectedDuration.duration_id,
                    'user_id':userId
                }
                var updateJobRes = UpdateJob.getResource();
                updateJobRes.save(data, function success(response){
                        var resData = response.response_data || {};
                        // $('#newForm .spin').hide();

                        if(response.status == 'success') {
                            $scope.$broadcast ('updateSkills',JobService.getSelectedJob().id);
                        }
                        else
                        {
                            var reason = 'Job Updation Failed. Please Try After Some Time.';
                            if(resData.error_code == 201) {
                                reason = resData.error_desc;
                            }
                        }
                    },
                    function error(){}
                );

            }

            $scope.$on('skillSaved', function(e,data) {
                if($stateParams.typeOfChange=='edit')
                {
                    alert("Job Updated Successfully");
                    $state.go('manageJob');
                }
                if($stateParams.typeOfChange=='add')
                {
                    alert("Job saved Successfully");
                    resetValues();
                }
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
                        console.log('Data retrieval failed.');
                    });
            }
            function setJobType(selectedJob,masterData){
                for(var i=0; i < masterData.length; i++){
                    if(masterData[i].type_id == selectedJob.job_type){
                        $scope.jobType = masterData[i];
                        $scope.selectedJobType = masterData[i];
                        break;
                    }
                }
            }
            function loadIndustryList(){
                IndustryLoader.getIndustryList()
                    .then(function(data) {
                        $scope.industries.data = data;
                        if(JobService.getTypeOfChange()=='edit')
                        {
                            setIndustry(JobService.getSelectedJob(),$scope.industries.data);

                        }
                    },
                    function(data) {
                        console.log('Industry Data retrieval failed.');
                    });
            }
            function setIndustry(selectedJob,masterData){
                for(var i=0; i < masterData.length; i++){
                    if(masterData[i].industry_id == selectedJob.industry_id){
                        $scope.industryLabel = masterData[i];
                        $scope.selectedIndustries = masterData[i];
                        break;
                    }
                }
            }
            function loadCurrencyList(){
                CurrencyLoader.getCurrencyList()
                    .then(function(data) {
                        $scope.currencies.data = data;
                        if(JobService.getTypeOfChange()=='edit')
                        {
                            setCurrency(JobService.getSelectedJob(),$scope.currencies.data);

                        }
                    },
                    function(data) {
                        console.log('Currencies Data retrieval failed.');
                    });
            }
            function setCurrency(selectedJob,masterData){
                for(var i=0; i < masterData.length; i++){
                    if(masterData[i].currency_id == selectedJob.currency_id){
                        $scope.currLabel = masterData[i];
                        $scope.selectedCurrency = masterData[i];
                        break;
                    }
                }
            }
            function loadDurationList(){
                DurationLoader.getDurationList()
                    .then(function(data) {
                        $scope.durations.data = data;
                        if(JobService.getTypeOfChange()=='edit')
                        {
                            setDuration(JobService.getSelectedJob(),$scope.durations.data);

                        }
                    },
                    function(data) {
                        console.log('Durations Data retrieval failed.');
                    });
            }
            function setDuration(selectedJob,masterData){
                for(var i=0; i < masterData.length; i++){
                    if(masterData[i].duration_id == selectedJob.duration_id){
                        $scope.durLabel = masterData[i];
                        $scope.selectedDuration = masterData[i];
                        break;
                    }
                }
            }
            function loadLanguageList(){
                LanguageLoader.getLanguageList()
                    .then(function(data) {
                        $scope.language.data = data;
                        if(JobService.getTypeOfChange()=='edit')
                        {
                            setLanguage(JobService.getSelectedJob(),$scope.language.data);

                        }
                    },
                    function(data) {
                        console.log('Language Data retrieval failed.');
                    });
            }
            function setLanguage(selectedJob,masterData){
                for(var i=0; i < masterData.length; i++){
                    if(masterData[i].language_id == selectedJob.lang_id){
                        $scope.langLabel = masterData[i];
                        $scope.selectedLanguage = masterData[i];
                        break;
                    }
                }
            }

            function loadCountryList(){
                CountryLoader.getCountryList()
                    .then(function(data) {
                        $scope.country.data = data;
                        if(JobService.getTypeOfChange()=='edit')
                        {
                            setCountry(JobService.getSelectedJob(),$scope.country.data);

                        }
                    },
                    function(data) {
                        console.log('Country Data retrieval failed.');
                    });
            }
            function setCountry(selectedJob,masterData){
                for(var i=0; i < masterData.length; i++){
                    if(masterData[i].country_id == selectedJob.country_id){
                        $scope.cntLabel = masterData[i];
                        $scope.selectedCountry = masterData[i];
                        break;
                    }
                }
            }

            function loadTravelList(){
                $scope.travels.data= [{"travel_id":1,"name":"Yes"},{"travel_id":2,"name":"No"}];
                if(JobService.getTypeOfChange()=='edit')
                {
                    setTravelType(JobService.getSelectedJob(),$scope.travels.data);

                }

            }
            function setTravelType(selectedJob,masterData){
                for(var i=0; i < masterData.length; i++){
                    if(masterData[i].travel_id == selectedJob.isTravel){
                        $scope.travelLabel = masterData[i];
                        $scope.selectedTravel = masterData[i];
                        break;
                    }
                }
            }

            function populateAllTextForEdit()
            {
                if($stateParams.typeOfChange=='edit')
                {
                    $scope.jobTitle = JobService.getSelectedJob().jobTitle;
                    $scope.description = JobService.getSelectedJob().job_desc;
                    $scope.compName = JobService.getSelectedJob().comp_name;
                    $scope.rateSal = JobService.getSelectedJob().salary;
                    $scope.city = JobService.getSelectedJob().city;
                    $scope.fieldEditable = false;
                    var stDate = ( $filter('date')(JobService.getSelectedJob().startDate, 'dd-MMMM-yyyy'));
                    var dt = new Date( stDate ),
                        year = dt.getUTCFullYear(),
                        month = dt.getUTCMonth(),
                        day = dt.getUTCDate();
                    $scope.dt= new Date(year, month, day);
                    $rootScope.$emit('jobDateChanged', $scope.dt);
                }
                else if($stateParams.typeOfChange=='add')
                {
                    resetValues();
                    $scope.fieldEditable = true;
                }
            }
            loadJobTypeList();
            loadIndustryList();
            loadCurrencyList();
            loadDurationList();
            loadLanguageList();
            loadCountryList();
            loadTravelList();
            populateAllTextForEdit();
        }]);
