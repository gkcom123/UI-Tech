/**
 * Created by gunjan.kumar on 24/12/15.
 */
'use strict';
angular.module('toilApp')
    .controller('SkillController',['$scope','$rootScope','$stateParams','localStorageService','GetSkill','SaveSkill',
        'GetSkillByJobId','JobService','UpdateSkill',
    function ($scope,$rootScope,$stateParams,localStorageService,GetSkill,SaveSkill,
              GetSkillByJobId,JobService,UpdateSkill) {
        $scope.profSkill 	  = {name:"Professional"};
        $scope.projSkill 	  = {name:"Project Related"};
        $scope.personalSkill 	  = {name:"Personal"};
        $scope.selected_items = [];
        $scope.profskillList 		= {};
        $scope.projskillList 		= {};
        $scope.personalskillList		= {};
        $scope.profModel = [];
        $scope.projModel = [];
        $scope.personalModel = [];
        $scope.profSkillRating 		= {};
        $scope.projSkillRating 		= {};
        $scope.personalSkillRating 		= {};
        var created_by = getUserProfile().user_id;
        function loadSkillList(){
            var skillListResource = GetSkill.getResource();
            skillListResource.get(function(response){
                if(response.status == 'error' && response.error_code == 400){
                    //$rootScope.$broadcast('LogoutThisUser',{});
                }
                if(Object.getOwnPropertyNames(response.response_data).length === 0){
                    console.warn("Get Skill API returned empty Object");
                }
                else{
                    var profSkillsList=[];
                    var projSkillsList=[];
                    var personalSkillsList=[];
                    for( var s=0;s< response.response_data.results.length;s++)
                    {
                        var skill = response.response_data.results[s];
                        if(skill.type_id==1)
                        {
                            profSkillsList.push(skill);

                        }
                        else if(skill.type_id==3)
                        {
                            personalSkillsList.push(skill);

                        }
                        else{
                            projSkillsList.push(skill);

                        }
                    }
                    $scope.profskillList.data = profSkillsList;
                    $scope.projskillList.data = projSkillsList;
                    $scope.personalskillList.data = personalSkillsList;

                }
            });
        }
        function getUserProfile()
        {
            var toilId = localStorageService.get('toil-id');
            var encodedProfile = toilId.split('.')[1];
            var profile = JSON.parse(Helper.url_base64_decode(encodedProfile));
            return profile;
        }
        loadSkillList();
        function performSkillsSanityCheck(){

            var missingData;
            var sanityChekClear = false;
            if($scope.profModel.length==0)
                missingData = 'Please Select Professional Skill';
            else if($scope.projModel.length==0)
                missingData = 'Please Select Project Skill';
            else if($scope.personalModel.length==0)
                missingData = 'Please Select Personal Skill';
            else
                sanityChekClear = true;
            if(!sanityChekClear)
                alert(missingData);

            return sanityChekClear;
        }

        $scope.saveSkills = function(jobId) {
            var data ={
                'profModel': $scope.profModel,
                'profRating': $scope.profSkillRating,
                'projModel':$scope.projModel,
                'projSkillRating':$scope.projSkillRating,
                'personalModel':$scope.personalModel,
                'personalSkillRating': $scope.personalSkillRating,
                'jobId':jobId,
                'created_by':created_by
            }
            var saveSkillResource = SaveSkill.getResource();
            saveSkillResource.save(data, function success(response) {
                    var resData = response.response_data || {};
                    // $('#newForm .spin').hide();

                    if (response.status == 'success') {
                    }
                    else{
                        var reason = 'Skill Creation Failed. Please Try After Some Time.';
                        if(resData.error_code == 201) {
                            reason = resData.error_desc;
                        }
                    }
                },
                function error(){}
            );
        }
        $scope.updateSkills = function(jobId) {
            var data ={
                'profModel': $scope.profModel,
                'profRating': $scope.profSkillRating,
                'projModel':$scope.projModel,
                'projSkillRating':$scope.projSkillRating,
                'personalModel':$scope.personalModel,
                'personalSkillRating': $scope.personalSkillRating,
                'jobId':jobId,
                'created_by':created_by
            }
            var updateSkillResource = UpdateSkill.getResource();
            updateSkillResource.save(data, function success(response) {
                    var resData = response.response_data || {};
                    // $('#newForm .spin').hide();

                    if (response.status == 'success') {
                    }
                    else{
                        var reason = 'Skill Creation Failed. Please Try After Some Time.';
                        if(resData.error_code == 201) {
                            reason = resData.error_desc;
                        }
                    }
                },
                function error(){}
            );
        }

        $scope.$on('saveSkills', function(e,data) {
            // save the Prof skill,proj, and personal skill in one go
            $scope.$emit("skillSaved", $scope.saveSkills(data));
        });
        $scope.$on('updateSkills', function(e,data) {
            // save the Prof skill,proj, and personal skill in one go
            $scope.$emit("skillSaved", $scope.updateSkills(data));
        });

        $scope.$on('performSkillsSanityCheck', function(e,data) {

            // save the Prof skill,proj, and personal skill in one go
            var signal = performSkillsSanityCheck();
            if(signal)
            {
                $scope.$emit("sanityCheckDone");
            }

        });
        function getSelectedSkillsByJobId(data){
            var getSkillRes = GetSkillByJobId.getResource(data);
            getSkillRes.get(function(response){
                if(response.status == 'error' && response.error_code == 400){
                    //$rootScope.$broadcast('LogoutThisUser',{});
                }

                if(Object.getOwnPropertyNames(response.response_data).length === 0){
                    console.warn("Get Skill API returned empty Object");
                }
                else{
                    for( var s=0;s< response.response_data.results.length;s++)
                    {
                        var skill = response.response_data.results[s];
                        if(skill.type_id==1)
                        {
                            $scope.profModel.push(skill);

                        }
                        else if(skill.type_id==3)
                        {
                            $scope.personalModel.push(skill);

                        }
                        else{
                            $scope.projModel.push(skill);

                        }
                    }
                }
            });
        }

        $scope.setProfSelectedItem = function (skill,skillStatus) {
            var filteredArray = [];
            if (skillStatus == true) {
                if($stateParams.typeOfChange=='edit')
                {
                    for( var es=0;es< $scope.profModel.length;es++)
                    {
                        var existingSkill = $scope.profModel[es];
                        if(existingSkill.skill_id == skill.skill_id)
                        {
                            return true;
                            //break;
                        }
                    }
                    skill.isEdit = true;
                    $scope.profModel.push(skill);
                }
                else
                {
                    skill.isEdit = false;
                    $scope.profModel.push(skill);
                }
            }
            else {
                filteredArray = $scope.profModel.filter(function (value) {
                    return value != skill;
                });
                $scope.profModel = filteredArray;
            }
            if($scope.profSkillRating.length!=0)
            {
                for(var i = 0; i < $scope.profModel.length; i++)
                {
                    $scope.profSkillRating[i]='3';
                }
            }
            return false;
        };


        $scope.setProjSelectedItem = function (skill,skillStatus) {
            var filteredArray = [];
            if (skillStatus == true) {
                if($stateParams.typeOfChange=='edit')
                {
                    for( var es=0;es< $scope.projModel.length;es++)
                    {
                        var existingSkill = $scope.projModel[es];
                        if(existingSkill.skill_id == skill.skill_id)
                        {
                            return true;
                            //break;
                        }
                    }
                    skill.isEdit = true;
                    $scope.projModel.push(skill);
                }
                else{
                    skill.isEdit = false;
                    $scope.projModel.push(skill);
                }
            } else {
                filteredArray = $scope.projModel.filter(function (value) {
                    return value != skill;
                });
                $scope.projModel = filteredArray;
            }
            if($scope.projSkillRating.length!=0)
            {
                for(var i = 0; i < $scope.projModel.length; i++)
                {
                    $scope.projSkillRating[i]='3';
                }

            }
            return false;
        };

        $scope.setPersonalSelectedItem = function (skill,skillStatus) {
            var filteredArray = [];
            if (skillStatus == true) {
                if($stateParams.typeOfChange=='edit')
                {
                    for( var es=0;es< $scope.personalModel.length;es++)
                    {
                        var existingSkill = $scope.personalModel[es];
                        if(existingSkill.skill_id == skill.skill_id)
                        {
                            return true;
                            //break;
                        }
                    }
                    skill.isEdit = true;
                    $scope.personalModel.push(skill);
                }
                else{
                    skill.isEdit = false;
                    $scope.personalModel.push(skill);
                }
            } else {
                filteredArray = $scope.personalModel.filter(function (value) {
                    return value != skill;
                });
                $scope.personalModel = filteredArray;
            }
            if($scope.personalSkillRating.length!=0)
            {
                for(var i = 0; i < $scope.personalModel.length; i++)
                {
                    $scope.personalSkillRating[i]='3';
                }

            }
            return false;
        };
        function populateSkillList()
        {
            if($stateParams.typeOfChange=='edit')
            {
                getSelectedSkillsByJobId(JobService.getSelectedJob().id);

            }
        }

        $scope.showProfList = function(){
            $('.prof-dropdown-list').toggle();
            $('.pres-dropdown-list').hide();
            $('.proj-dropdown-list').hide();

           // e.stopPropagation();
        };
        $scope.showProjList = function(){
            $('.proj-dropdown-list').toggle();
            $('.pres-dropdown-list').hide();
            $('.prof-dropdown-list').hide();

        };
        $scope.showPersonalList = function(){
            //console.log($scope.profSkillRating);
            $('.pres-dropdown-list').toggle();
            $('.prof-dropdown-list').hide();
            $('.proj-dropdown-list').hide();
        };
        $scope.profSkillSelected = function(skill){
            //$scope.profSkill = skill;
            $scope.selectedSkill   = skill.skill_name;
            $scope.selectedSkillID = skill.skill_id;
        };
        $scope.projSkillSelected = function(skill){
            //$scope.projSkill = skill;
            $scope.selectedSkill   = skill.skill_name;
            $scope.selectedSkillID = skill.skill_id;
        };
        $scope.personalSkillSelected = function(skill){
            //$scope.personalSkill = skill;
            $scope.selectedSkill   = skill.skill_name;
            $scope.selectedSkillID = skill.skill_id;
        };
        populateSkillList();
    }
    ]);
