/**
 * Created by gunjan.kumar on 12/09/15.
 */
'use strict';
angular.module('toilApp')
  .controller('leftBarController', ['$rootScope','$scope','$state',function ($rootScope,$scope,$state) {
    $scope.sideClick = function()
    {
      $state.go('budget');
      //event.preventDefault();
    }
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    $('#parent1').click(function(e) {
      e.preventDefault();
      $('#child1').toggle();
      $('#child2').hide();
    })
    $('#parent2').click(function(e) {
      e.preventDefault();
      $('#child2').toggle();
      $('#child1').hide();
    })
    $('#parent3').click(function(e) {
      e.preventDefault();
    })
    $scope.userClick = function()
    {
      $state.go('addUser');

      //event.preventDefault();
    }
    $scope.addJobClick = function()
    {
      $state.go('addJob');

      //event.preventDefault();
    }
    $scope.manageJobClick = function()
    {
      $state.go('manageJob');

      //event.preventDefault();
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
