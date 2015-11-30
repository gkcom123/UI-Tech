'use strict';
angular.module('toilApp')
  .controller('loginController', [
    '$scope',
    '$rootScope',
    '$toilApi',
        '$resource','localStorageService',
    function($scope, $rootScope, $toilApi,$resource,localStorageService){
        var ajaxLock = false,
           rules = {};
      $scope.isAuthenticated = false;
      Helper.requireRule(rules, ['emailid', 'password']);
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
              request = $resource("/toil/login");
          request.save(data, function success(res){
            if( res.status == 'success'){
              //$window.sessionStorage.token = res.response_data.token;
              localStorageService.set('toil-id', res.response_data);
              //console.log(res.response_data);
              var encodedProfile = res.response_data.split('.')[1];
              var profile = JSON.parse(url_base64_decode(encodedProfile));
             // var resData = res.response_data;
              $rootScope.userName = profile.email;
              $rootScope.userId = profile.user_id;

              $toilApi.gotoAnalytics();
              //afterLogin();
            }else{
              localStorageService.remove('toil-id');
              localStorageService.clearAll();
              $("#signInFormID div.error").html('Please check your login credentials');
            }
        })

          Helper.hideMask();

        }
      }
      function url_base64_decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
          case 0:
            break;
          case 2:
            output += '==';
            break;
          case 3:
            output += '=';
            break;
          default:
            throw 'Illegal base64url string!';
        }
        return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
      }
    }]);
