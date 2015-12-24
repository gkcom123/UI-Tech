/**
 * Created by gunjan.kumar on 24/12/15.
 */
'use strict';
var datemodule = angular.module('toilApp');
datemodule.controller('SkillController',['$scope','$rootScope',
    function ($scope,$rootScope) {
        $scope.profSkill 	  = {name:"Professional"};
        $scope.projSkill 	  = {name:"Project Related"};
        $scope.personalSkill 	  = {name:"Personal"};
        $scope.selected_items = [];
        $scope.skillsList = [
            {
                "name": "Alabama",
                "id": "AL"
            },
            {
                "name": "Alaska",
                "id": "AK"
            },
            {
                "name": "American Samoa",
                "id": "AS"
            },
            {
                "name": "New Hampshire",
                "id": "NH"
            },
            {
                "name": "New Jersey",
                "id": "NJ"
            },
            {
                "name": "Wyoming",
                "id": "WY"
            }
        ];
        $scope.profModel = [];
        $scope.projModel = [];
        $scope.personalModel = [];
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
            $scope.selectedSkill   = skill.name;
            $scope.selectedSkillID = skill.id;
        };
        $scope.projSkillSelected = function(skill){
            //$scope.projSkill = skill;
            $scope.selectedSkill   = skill.name;
            $scope.selectedSkillID = skill.id;
        };
        $scope.personalSkillSelected = function(skill){
            //$scope.personalSkill = skill;
            $scope.selectedSkill   = skill.name;
            $scope.selectedSkillID = skill.id;
        };

    }
    ]);
