/**
 * Created by gunjan.kumar on 12/09/15.
 */
'use strict';
angular.module('toilApp')
  .controller('leftBarController', ['$rootScope','$scope','$state','$location',function ($rootScope,$scope,$state,$location)
  {

    $scope.uiRouterState = $state.current.name;

    if($scope.uiRouterState=='analytics' || $scope.uiRouterState=='analytSection')
    {
      $("#child1").css("display", "none");
      $("#child2").css("display", "none");
    }
    else if($scope.uiRouterState=='user' || $scope.uiRouterState=='budget' || $scope.uiRouterState=='password')
    {
      $("#child1").css("display", "block");
      $("#child2").css("display", "none");

    }
    else if($scope.uiRouterState=='addJob' || $scope.uiRouterState=='manageJob'|| $scope.uiRouterState=='expJob')
    {
      $("#child1").css("display", "none");
      $("#child2").css("display", "block");

    }
    else
    {
      $("#child1").css("display", "block");
      $("#child2").css("display", "block");
    }
    $scope.analyticsClick = function(e)
    {
      $state.go('analytSection');
    };
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    $('#parent1').click(function(e) {
      //$scope.showInfo();
      $('#child1').toggle();
      $('#child2').hide();
      e.preventDefault();
    });
    $('#parent2').click(function(e) {
      $('#child2').toggle();
      $('#child1').hide();
      e.preventDefault();
    });

    $('#parent3').click(function(e) {
      e.preventDefault();
      $('#child1').hide();
      $('#child2').hide();
    });
   $scope.userClick = function(event)
    {
      $state.go('user');
    }
    $scope.manageJobClick = function()
    {
      $state.go('manageJob');
    }
  }])
