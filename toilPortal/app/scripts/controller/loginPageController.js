/**
 * Created by gunjan.kumar on 10/8/15.
 */
'use strict';
angular.module('toilApp')
    .controller('loginPageController', [
        '$scope',
        '$rootScope',
        '$toilApi',
        '$resource',
        function($scope, $rootScope, $toilApi,$resource){
            $scope.fpwFlag = false;
            $scope.forgotPwClick = function()
            {
                $scope.fpwFlag = true;
            }
            $scope.gotoLogin = function()
            {
                $scope.fpwFlag = false;
            }
            var rules = {};
            Helper.requireRule(rules, ['emailid']);
            var resetpwForm = $("#resetPwFormid");
            resetpwForm.validate({
                rules: rules,
                errorLabelContainer: $("#resetPwFormid div.error"),
                showErrors: function(errorMap, errorList) {
                    if (errorList.length > 0) {
                        $("#resetPwFormid div.error").html("Please enter a valid email address.");
                    }
                    else{
                        $("#resetPwFormid div.error").html("");
                    }
                }
            });
            $scope.resetPassword = function() {
                if( resetpwForm.valid() ){
                    Helper.showMask();
                    var data =resetpwForm.serializeObject(),
                        request = $resource("/toilAPi/forgotPw");
                    request.save(data, function success(res){
                        if( res.status == 'success'){
                            var resData = res.response_data;
                            $("#resetPwFormid div.error").html("Email has been sent.");
                        }else{
                            alert('Internal server error');
                        }
                    })
                    Helper.hideMask();
                }
            }

        }
    ]);
