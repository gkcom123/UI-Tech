'use strict';
angular.module('toilApp')
  .controller('loginController', [
    '$scope',
    '$rootScope',
    '$toilApi',
    function($scope, $rootScope, $toilApi){
        var ajaxLock = false,
           rules = {};
          Helper.requireRule(rules, ['username', 'password']);
      var jForm = $("#signInFormID");
      jForm.validate({
        rules: rules
      });

      $scope.login = function() {
        if( jForm.valid() ){
          Helper.showMask();
          $toilApi.gotoAnalytics();
          Helper.hideMask();

        }
      }

  }]);
