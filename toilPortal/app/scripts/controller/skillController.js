/**
 * Created by gunjan.kumar on 24/12/15.
 */
'use strict';
var datemodule = angular.module('toilApp');
datemodule.controller('SkillController',['$scope','$rootScope','GetSkill',
    function ($scope,$rootScope,GetSkill) {
        $scope.profSkill 	  = {name:"Professional"};
        $scope.projSkill 	  = {name:"Project Related"};
        $scope.personalSkill 	  = {name:"Personal"};
        $scope.selected_items = [];
        $scope.skillList 		= {};
        $scope.profModel = [];
        $scope.projModel = [];
        $scope.personalModel = [];
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
        $scope.setProfSelectedItem = function (skill,skillStatus) {
            var filteredArray = [];
            if (skillStatus == true) {
                $scope.profModel.push(skill);
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
        }
        $scope.showProjList = function(){
            $('.proj-dropdown-list').toggle();
        }
        $scope.showPersonalList = function(){
            $('.pres-dropdown-list').toggle();
        }
        $scope.setChangeSelected = function(selectedProfSkill){

        }
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
