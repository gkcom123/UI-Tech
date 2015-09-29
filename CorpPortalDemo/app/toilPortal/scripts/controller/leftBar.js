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
    else if($scope.uiRouterState=='addUser' || $scope.uiRouterState=='budget' || $scope.uiRouterState=='password')
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

      $state.go('addUser');
    }
    $scope.addJobClick = function()
    {
      $scope.myVal = true;
      $state.go('addJob');
    }
    $scope.manageJobClick = function()
    {
      $state.go('manageJob');
    }
   // $scope.page = $state.current;
    //$scope.corpID = localStorageService.get('corp-id');

    /*$("#resetPwd").validate({
      rules: {
        oldPwd: {
          required: true
        },
        newPwd: {
          required: true
        },
        cfmPwd: {
          required: true
        }
      }
    });*/

    /*$scope.report = function(){
      $state.go('report');
    };

    $scope.logOut = function(){
      $state.go('home');
      $rootScope.$broadcast('LogoutThisUser',{});
    };

    $scope.$on('LogoutThisUser', function(event, data){

      $rootScope.$emit('StopIntervalsMessage',{});
      var logoutRes = $resource("/api/logout/",{'corporate_id':localStorageService.get('corp-id')});
      logoutRes.get(function(response){
        //console.log('Logout response :',response);
      });

      localStorageService.remove('corp-id');
      localStorageService.clearAll();
      $state.go('home');
    });*/

    /*$scope.goToInvoicePage = function(){
      $state.go('invoice');
    }*/
  }])
 /* .controller('DropdownCtrl', ['$rootScope','$scope','localStorageService',function($rootScope,$scope,localStorageService){
    $scope.corpData = localStorageService.get('corp-details');
    $rootScope.$on('corpDetails',function(event, data){
      $scope.corpData = data;
    });
  }]);*/
