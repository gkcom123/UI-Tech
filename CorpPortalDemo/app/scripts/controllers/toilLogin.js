'use strict';
angular.module('toilApp')
  .controller('loginController', [
    '$scope',
    '$rootScope',
    '$toilApi',
    function($scope, $rootScope, $toilApi){
        var ajaxLock = false,
           rules = {};
            $scope.login = function(){
              $toilApi.gotoAnalytics();
            }
  }]);
