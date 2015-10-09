'use strict';
angular.module('toilApp')
  .controller('loginController', [
    '$scope',
    '$rootScope',
    '$toilApi',
        '$resource',
    function($scope, $rootScope, $toilApi,$resource){
        var ajaxLock = false,
           rules = {};
      Helper.requireRule(rules, ['username', 'password']);
      var jForm = $("#signInFormID");
      jForm.validate({
        rules: rules,
        errorLabelContainer: $("#signInFormID div.error"),
        showErrors: function(errorMap, errorList) {
          if (errorList.length > 0) {
            $("#signInFormID div.error").html("Invalid email address or password.");
          }
          else{
            $("#signInFormID div.error").html("");
          }
        }
      });
      $scope.login = function() {
        if( jForm.valid() ){
          Helper.showMask();
          var data =jForm.serializeObject(),
              request = $resource("/toilAPi/login");
          request.save(data, function success(res){
            if( res.status == 'success'){
              var resData = res.response_data;
              $rootScope.userName = resData.username;

              $toilApi.gotoAnalytics();
              //afterLogin();
            }else{
              alert('Please check your login credentials');
            }
        })

          Helper.hideMask();

        }
      }

  }]);
