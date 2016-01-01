/**
 * Created by gunjan.kumar on 10/1/15.
 */
'use strict';
angular.module("toilApp")
    .controller('addUserController', [
        '$scope',
        '$state',
        '$rootScope',
        'localStorageService',
        'GetUserList',
        'AddUser','UpdateUser',
        function( $scope, $state,$rootScope, localStorageService, GetUserList,AddUser,UpdateUser){

            var userList 	= {};
            var userId = getUserProfile().user_id;
            var pageNo 				= 1;
            var paginationCount		= 4 ;

            $scope.Users 		= {};
            function resetValues()
            {
                $scope.firstName ="";
                $scope.lastName ="";
                $scope.emailid="";
                $scope.company="";
                $scope.phoneNumber="";
                if ($scope.addtoilUserForm)
                    $scope.addtoilUserForm.$setPristine();
            }
            function getUserProfile()
            {
                var toilId = localStorageService.get('toil-id');
                var encodedProfile = toilId.split('.')[1];
                var profile = JSON.parse(Helper.url_base64_decode(encodedProfile));
                return profile;
            }

            function loadUsers(){
                if(!userId)
                {
                    return;
                }
                var userListResource = GetUserList.getResource(userId, pageNo, paginationCount);

                userListResource.get(function(response){
                    if(response.status == 'error' && response.error_code == 400){
                        //$rootScope.$broadcast('LogoutThisUser',{});
                    }

                    if(Object.getOwnPropertyNames(response.response_data).length === 0){
                        console.warn("Get User API returned empty Object");
                    }
                    else{
                        userList = response.response_data.results;
                        $scope.Users.data = response.response_data.results;
                    }
                });
            }
            $scope.addUserClick = function()
            {
                $scope.addUserFlag = true;
            }
            $scope.deleteUser = function(user)
            {
                var cancelIt = confirm('Do you want to delete the user with Email: ' + user.emailId);
                if(!cancelIt)
                {
                    return;
                }

                var data ={
                    'userName':user.userName,
                    'emailId':user.emailId,
                    'user_id':userId
                }
                var updateUserRes = UpdateUser.getResource();
                updateUserRes.save(data, function success(response){
                        var resData = response.response_data || {};
                        // $('#newForm .spin').hide();

                        if(response.status == 'success') {
                            alert("User Removed Successfully");
                            loadUsers();
                        } else {
                            var reason = 'User Deletion Failed. Please Try After Some Time.';
                            if(resData.error_code == 201) {
                                reason = resData.error_desc;
                            }
                        }
                    },
                    function error(){}
                );

            }

            $scope.createNewUser = function()
            {
                var validation = $("#addUserForm").valid();
                if(validation==false)
                {
                    alert('Please provide all information.');
                    return false;
                }
                var data ={
                    'firstName': $scope.firstName,
                    'lastName': $scope.lastName,
                    'emailid':$scope.emailid,
                    'company':$scope.company,
                    'phoneNumber':$scope.phoneNumber,
                    'user_id':userId
                }
                var addUserRes = AddUser.getResource();
                addUserRes.save(data, function success(response){
                        var resData = response.response_data || {};
                       // $('#newForm .spin').hide();

                        if(response.status == 'success') {
                            alert("User Added Successfully");
                            $scope.addUserFlag = false;
                            resetValues();
                            loadUsers();
                        } else {
                            var reason = 'User Creation Failed. Please Try After Some Time.';
                            if(resData.error_code == 201) {
                                reason = resData.error_desc;
                            }
                        }
                    },
                    function error(){}
                );
            }
            loadUsers();
        }]);
