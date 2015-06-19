'use strict';
angular.module('corporateApp')
  .controller('loginController', [
    '$scope',
    '$rootScope',
    '$tfsApi',
    '$resource',
    'localStorageService',
    function($scope, $rootScope, $tfsApi, $resource, localStorageService){
        var ajaxLock = false,
           rules = {};

          $scope.corpID  = '';

          Helper.requireRule(rules, ['username', 'password'])

        var jForm = $("#signInFormID"),
            afterLogin = function(){
      	      localStorageService.set('corp-id', $scope.corpID);  
      	      localStorageService.set('username', $scope.username);             

      	      $tfsApi.updateCorporateDetails( $scope.corpID, function(corpDetails){
                
                console.log("Corp Details :", corpDetails);
                if(corpDetails.clientStatus == '0'){
                  alert("Your account is no longer active.");
                  return;
                }                
    		        $tfsApi.gotoBooking();
    	      });
          };

            jForm.validate({
                rules: rules
            });

            $scope.login = function(){
              if( !ajaxLock && jForm.valid() ){
                ajaxLock = true;
                Helper.showMask();
                var data = jForm.serializeObject(),
                  request = $resource("/api/login/");

                  request.save(data, function success( res ){
                    if( res.status == 'success'){
                          var resData = res.response_data;
                          $scope.corpID = resData.session_id;
                          $scope.username = resData.username;
                          afterLogin();
        		        }else{
                      alert('Please check your login credentials');
                    }
                      Helper.hideMask();
                      ajaxLock = false;
                    }, function error(){                
                          alert('Login Unsuccessfull, Please check your internet connection.');
                          Helper.hideMask();
                          ajaxLock = false;
                    });
              }
            }
  }]);