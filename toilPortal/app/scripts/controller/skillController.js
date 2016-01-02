/**
 * Created by gunjan.kumar on 24/12/15.
 */
'use strict';
angular.module('toilApp')
    .controller('SkillController',['$scope','$rootScope','$filter','GetSkill','SaveSkill',
    function ($scope,$rootScope,$filter,GetSkill,SaveSkill) {
        $scope.profSkill 	  = {name:"Professional"};
        $scope.projSkill 	  = {name:"Project Related"};
        $scope.personalSkill 	  = {name:"Personal"};
        $scope.selected_items = [];
        $scope.skillList 		= {};
        $scope.profModel = [];
        $scope.projModel = [];
        $scope.personalModel = [];
        $scope.profSkillRating 		= {};
        $scope.projSkillRating 		= {};
        $scope.personalSkillRating 		= {};
        var created_by = $rootScope.userId;
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
                    // skillList = response.response_data.results;
                    $scope.skillList.data = response.response_data.results;
                }
            });
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

        $scope.$on('saveSkills', function(e,data) {
            // save the Prof skill,proj, and personal skill in one go
            $scope.$emit("skillSaved", $scope.saveSkills(data));
        });
        $scope.$on('performSkillsSanityCheck', function(e,data) {
            // save the Prof skill,proj, and personal skill in one go
            var signal = performSkillsSanityCheck();
            if(signal)
            {
                $scope.$emit("sanityCheckDone");
            }

        });
        $scope.setProfSelectedItem = function (skill,skillStatus) {
            var filteredArray = [];
            if (skillStatus == true) {
                $scope.profModel.push(skill);
               // $scope.profSkillRating.push('3');
            } else {
                filteredArray = $scope.profModel.filter(function (value) {
                    return value != skill;
                });
                $scope.profModel = filteredArray;
                // $scope.checkAll = false;
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
                $scope.projModel.push(skill);
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
                $scope.personalModel.push(skill);
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
    }
    ]);
