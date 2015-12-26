/**
 * Created by gunjan.kumar on 24/12/15.
 */
'use strict';
var datemodule = angular.module('toilApp');
datemodule.controller('SkillController',['$scope','$rootScope','$filter','GetSkill','SaveSkill',
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
        $scope.saveSkills = function() {
            var data ={
                'profModel': $scope.profModel,
                'profRating': $scope.profSkillRating,
                'projModel':$scope.projModel,
                'projSkillRating':$scope.projSkillRating,
                'personalModel':$scope.personalModel,
                'personalSkillRating': $scope.personalSkillRating,
                'created_by':created_by
            }
            console.log(data);
            var saveSkillResource = SaveSkill.getResource();
            saveSkillResource.save(data, function success(response) {
                    var resData = response.response_data || {};
                    // $('#newForm .spin').hide();

                    if (response.status == 'success') {
/*
                        $scope.$broadcast ('saveSkills');
                        alert("Job Added Successfully");
*/
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

        $scope.$on('saveSkills', function(e) {
            // save the Prof skill,proj, and personal skill in one go
            $scope.$emit("skillSaved", $scope.saveSkills());
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
